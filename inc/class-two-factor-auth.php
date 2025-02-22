<?php
require_once 'vendor/autoload.php';

use PragmaRX\Google2FA\Google2FA;

class TwoFactorAuth {
    private $google2fa;

    public function __construct() {
        $this->google2fa = new Google2FA();
    }

    public function generate_secret_key() {
        return $this->google2fa->generateSecretKey();
    }

    public function get_qr_code_url($name, $email, $secret_key) {
        return $this->google2fa->getQRCodeUrl(
            $name,
            $email,
            $secret_key
        );
    }

    public function verify_key($secret_key, $one_time_password) {
        return $this->google2fa->verifyKey($secret_key, $one_time_password);
    }

    public function enable_2fa_for_user($user_id, $secret_key) {
        update_user_meta($user_id, 'two_factor_secret', $secret_key);
        update_user_meta($user_id, 'two_factor_enabled', true);
    }

    public function disable_2fa_for_user($user_id) {
        delete_user_meta($user_id, 'two_factor_secret');
        update_user_meta($user_id, 'two_factor_enabled', false);
    }

    public function is_2fa_enabled_for_user($user_id) {
        return (bool) get_user_meta($user_id, 'two_factor_enabled', true);
    }

    public function get_user_secret_key($user_id) {
        return get_user_meta($user_id, 'two_factor_secret', true);
    }
}

