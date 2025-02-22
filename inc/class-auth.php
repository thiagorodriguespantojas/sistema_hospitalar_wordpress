<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Auth {
    private $secret_key;
    private $token_expiration;

    public function __construct() {
        $this->secret_key = defined('JWT_SECRET_KEY') ? JWT_SECRET_KEY : 'your-secret-key';
        $this->token_expiration = 3600; // 1 hour
    }

    public function generate_token($user_id) {
        $issuedAt = time();
        $expire = $issuedAt + $this->token_expiration;

        $token = array(
            "iss" => get_site_url(),
            "aud" => get_site_url(),
            "iat" => $issuedAt,
            "nbf" => $issuedAt,
            "exp" => $expire,
            "data" => array(
                "user_id" => $user_id,
            )
        );

        return JWT::encode($token, $this->secret_key, 'HS256');
    }

    public function validate_token($token) {
        try {
            $decoded = JWT::decode($token, new Key($this->secret_key, 'HS256'));
            return $decoded->data->user_id;
        } catch (Exception $e) {
            return false;
        }
    }

    public function login($username, $password) {
        $user = wp_authenticate($username, $password);

        if (is_wp_error($user)) {
            return false;
        }

        return $this->generate_token($user->ID);
    }

    public function check_permissions($user_id, $required_capability) {
        $user = get_user_by('id', $user_id);
        return user_can($user, $required_capability);
    }
}

// Usage in API endpoints
add_action('rest_api_init', function () {
    register_rest_route('hospital/v1', '/login', array(
        'methods' => 'POST',
        'callback' => 'api_login',
        'permission_callback' => '__return_true'
    ));

    register_rest_route('hospital/v1', '/protected-endpoint', array(
        'methods' => 'GET',
        'callback' => 'protected_endpoint',
        'permission_callback' => 'check_jwt_token'
    ));
});

function api_login($request) {
    $auth = new Auth();
    $username = $request->get_param('username');
    $password = $request->get_param('password');

    $token = $auth->login($username, $password);

    if ($token) {
        return new WP_REST_Response(array('token' => $token), 200);
    } else {
        return new WP_Error('invalid_credentials', 'Invalid credentials', array('status' => 401));
    }
}

function check_jwt_token($request) {
    $auth = new Auth();
    $token = $request->get_header('Authorization');

    if (!$token) {
        return false;
    }

    $token = str_replace('Bearer ', '', $token);
    $user_id = $auth->validate_token($token);

    if (!$user_id) {
        return false;
    }

    return $auth->check_permissions($user_id, 'read');
}

function protected_endpoint($request) {
    return new WP_REST_Response(array('message' => 'This is a protected endpoint'), 200);
}

