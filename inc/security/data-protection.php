<?php
// Data Protection and Security Functions

function encrypt_sensitive_data($data, $key) {
    $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('AES-256-CBC'));
    $encrypted = openssl_encrypt($data, 'AES-256-CBC', $key, 0, $iv);
    return base64_encode($encrypted . '::' . $iv);
}

function decrypt_sensitive_data($encrypted_data, $key) {
    list($encrypted_data, $iv) = explode('::', base64_decode($encrypted_data), 2);
    return openssl_decrypt($encrypted_data, 'AES-256-CBC', $key, 0, $iv);
}

function hash_password($password) {
    return password_hash($password, PASSWORD_ARGON2ID);
}

function verify_password($password, $hash) {
    return password_verify($password, $hash);
}

function sanitize_input($input) {
    if (is_array($input)) {
        foreach ($input as $key => $value) {
            $input[$key] = sanitize_input($value);
        }
    } else {
        $input = strip_tags(trim($input));
    }
    return $input;
}

function log_data_access($user_id, $table, $record_id, $access_type) {
    global $wpdb;
    $wpdb->insert(
        $wpdb->prefix . 'data_access_logs',
        array(
            'user_id' => $user_id,
            'accessed_table' => $table,
            'accessed_record_id' => $record_id,
            'access_type' => $access_type,
            'ip_address' => $_SERVER['REMOTE_ADDR'],
            'user_agent' => $_SERVER['HTTP_USER_AGENT']
        )
    );
}

function log_user_consent($user_id, $consent_type, $consent_given) {
    global $wpdb;
    $wpdb->insert(
        $wpdb->prefix . 'consent_logs',
        array(
            'user_id' => $user_id,
            'consent_type' => $consent_type,
            'consent_given' => $consent_given,
            'ip_address' => $_SERVER['REMOTE_ADDR'],
            'user_agent' => $_SERVER['HTTP_USER_AGENT']
        )
    );
}

function anonymize_data($data) {
    // Implement data anonymization logic here
    // For example, replace names with initials, mask part of the email, etc.
    return $anonymized_data;
}

function implement_data_retention_policy() {
    global $wpdb;
    $retention_period = apply_filters('hospital_data_retention_period', 5 * YEAR_IN_SECONDS);
    $cutoff_date = date('Y-m-d H:i:s', time() - $retention_period);

    // Delete old data from various tables
    $wpdb->query($wpdb->prepare("DELETE FROM {$wpdb->prefix}medical_records WHERE created_at < %s", $cutoff_date));
    $wpdb->query($wpdb->prepare("DELETE FROM {$wpdb->prefix}lab_results WHERE created_at < %s", $cutoff_date));
    $wpdb->query($wpdb->prepare("DELETE FROM {$wpdb->prefix}billing WHERE created_at < %s", $cutoff_date));

    // Anonymize old user data
    $old_users = $wpdb->get_results($wpdb->prepare("SELECT id FROM {$wpdb->prefix}users WHERE created_at < %s", $cutoff_date));
    foreach ($old_users as $user) {
        anonymize_user_data($user->id);
    }
}

function anonymize_user_data($user_id) {
    global $wpdb;
    $anonymized_data = array(
        'username' => 'anonymous_' . $user_id,
        'email' => 'anonymous_' . $user_id . '@example.com',
        'first_name' => 'Anonymous',
        'last_name' => 'User'
    );
    $wpdb->update($wpdb->prefix . 'users', $anonymized_data, array('id' => $user_id));
    $wpdb->update($wpdb->prefix . 'patients', array('first_name' => 'Anonymous', 'last_name' => 'Patient'), array('user_id' => $user_id));
}

function export_user_data($user_id) {
    global $wpdb;
    $user_data = array();

    // Fetch user data
    $user_data['user'] = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$wpdb->prefix}users WHERE id = %d", $user_id), ARRAY_A);
    $user_data['patient'] = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$wpdb->prefix}patients WHERE user_id = %d", $user_id), ARRAY_A);
    $user_data['appointments'] = $wpdb->get_results($wpdb->prepare("SELECT * FROM {$wpdb->prefix}appointments WHERE patient_id = %d", $user_data['patient']['id']), ARRAY_A);
    $user_data['medical_records'] = $wpdb->get_results($wpdb->prepare("SELECT * FROM {$wpdb->prefix}medical_records WHERE patient_id = %d", $user_data['patient']['id']), ARRAY_A);
    $user_data['lab_results'] = $wpdb->get_results($wpdb->prepare("SELECT * FROM {$wpdb->prefix}lab_results WHERE patient_id = %d", $user_data['patient']['id']), ARRAY_A);
    $user_data['billing'] = $wpdb->get_results($wpdb->prepare("SELECT * FROM {$wpdb->prefix}billing WHERE patient_id = %d", $user_data['patient']['id']), ARRAY_A);

    return json_encode($user_data);
}

function delete_user_data($user_id) {
    global $wpdb;
    $patient_id = $wpdb->get_var($wpdb->prepare("SELECT id FROM {$wpdb->prefix}patients WHERE user_id = %d", $user_id));

    // Delete user-related data from all tables
    $wpdb->delete($wpdb->prefix . 'appointments', array('patient_id' => $patient_id));
    $wpdb->delete($wpdb->prefix . 'medical_records', array('patient_id' => $patient_id));
    $wpdb->delete($wpdb->prefix . 'lab_results', array('patient_id' => $patient_id));
    $wpdb->delete($wpdb->prefix . 'billing', array('patient_id' => $patient_id));
    $wpdb->delete($wpdb->prefix . 'patients', array('id' => $patient_id));
    $wpdb->delete($wpdb->prefix . 'users', array('id' => $user_id));

    // Delete any remaining data in other tables
    $wpdb->delete($wpdb->prefix . 'audit_logs', array('user_id' => $user_id));
    $wpdb->delete($wpdb->prefix . 'data_access_logs', array('user_id' => $user_id));
    $wpdb->delete($wpdb->prefix . 'consent_logs', array('user_id' => $user_id));
    $wpdb->delete($wpdb->prefix . 'offline_sync_queue', array('user_id' => $user_id));
}

// Schedule data retention policy execution
if (!wp_next_scheduled('hospital_data_retention_cron')) {
    wp_schedule_event(time(), 'daily', 'hospital_data_retention_cron');
}
add_action('hospital_data_retention_cron', 'implement_data_retention_policy');

// Implement user data export
add_action('wp_ajax_export_my_data', 'ajax_export_my_data');
function ajax_export_my_data() {
    $user_id = get_current_user_id();
    if (!$user_id) {
        wp_send_json_error('User not logged in');
    }
    $data = export_user_data($user_id);
    wp_send_json_success($data);
}

// Implement user data deletion request
add_action('wp_ajax_request_data_deletion', 'ajax_request_data_deletion');
function ajax_request_data_deletion() {
    $user_id = get_current_user_id();
    if (!$user_id) {
        wp_send_json_error('User not logged in');
    }
    // Schedule data deletion after a grace period (e.g., 30 days)
    wp_schedule_single_event(time() + (30 * DAY_IN_SECONDS), 'delete_user_data', array($user_id));
    wp_send_json_success('Data deletion scheduled');
}

// Add GDPR compliance notice to registration form
add_action('register_form', 'add_gdpr_consent_to_registration');
function add_gdpr_consent_to_registration() {
    ?>
    <p>
        <label for="gdpr_consent">
            <input type="checkbox" name="gdpr_consent" id="gdpr_consent" required>
            I consent to the collection and processing of my personal data as described in the <a href="<?php echo get_privacy_policy_url(); ?>" target="_blank">Privacy Policy</a>.
        </label>
    </p>
    <?php
}

// Validate GDPR consent on registration
add_filter('registration_errors', 'validate_gdpr_consent', 10, 3);
function validate_gdpr_consent($errors, $sanitized_user_login, $user_email) {
    if (!isset($_POST['gdpr_consent'])) {
        $errors->add('gdpr_consent_error', __('You must consent to our Privacy Policy to register.'));
    }
    return $errors;
}

// Log GDPR consent on successful registration
add_action('user_register', 'log_gdpr_consent');
function log_gdpr_consent($user_id) {
    if (isset($_POST['gdpr_consent'])) {
        log_user_consent($user_id, 'registration', true);
    }
}

