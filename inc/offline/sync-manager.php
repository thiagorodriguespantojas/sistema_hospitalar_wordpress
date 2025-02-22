<?php
// Offline Sync Manager

function enqueue_offline_scripts() {
    wp_enqueue_script('offline-js', 'https://cdnjs.cloudflare.com/ajax/libs/offline-js/0.7.19/offline.min.js', array(), '0.7.19', true);
    wp_enqueue_style('offline-css', 'https://cdnjs.cloudflare.com/ajax/libs/offline-js/0.7.19/themes/offline-theme-default.min.css', array(), '0.7.19');
    wp_enqueue_script('hospital-offline', get_template_directory_uri() . '/assets/js/offline-sync.js', array('jquery', 'offline-js'), '1.0', true);
    wp_localize_script('hospital-offline', 'hospital_offline', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('hospital-offline-sync')
    ));
}
add_action('wp_enqueue_scripts', 'enqueue_offline_scripts');

function save_offline_data() {
    check_ajax_referer('hospital-offline-sync', 'nonce');
    $user_id = get_current_user_id();
    if (!$user_id) {
        wp_send_json_error('User not logged in');
    }

    $action = sanitize_text_field($_POST['sync_action']);
    $table = sanitize_text_field($_POST['table']);
    $record_id = intval($_POST['record_id']);
    $data = json_decode(stripslashes($_POST['data']), true);

    global $wpdb;
    $result = $wpdb->insert(
        $wpdb->prefix . 'offline_sync_queue',
        array(
            'user_id' => $user_id,
            'action' => $action,
            'table_name' => $table,
            'record_id' => $record_id,
            'data' => json_encode($data)
        )
    );

    if ($result) {
        wp_send_json_success('Data saved for offline sync');
    } else {
        wp_send_json_error('Failed to save data for offline sync');
    }
}
add_action('wp_ajax_save_offline_data', 'save_offline_data');

function process_offline_sync() {
    check_ajax_referer('hospital-offline-sync', 'nonce');
    $user_id = get_current_user_id();
    if (!$user_id) {
        wp_send_json_error('User not logged in');
    }

    global $wpdb;
    $sync_items = $wpdb->get_results($wpdb->prepare(
        "SELECT * FROM {$wpdb->prefix}offline_sync_queue WHERE user_id = %d AND synced_at IS NULL ORDER BY created_at ASC",
        $user_id
    ));

    $processed = 0;
    $failed = 0;

    foreach ($sync_items as $item) {
        $result = process_sync_item($item);
        if ($result) {
            $processed++;
            $wpdb->update(
                $wpdb->prefix . 'offline_sync_queue',
                array('synced_at' => current_time('mysql')),
                array('id' => $item->id)
            );
        } else {
            $failed++;
        }
    }

    wp_send_json_success(array(
        'processed' => $processed,
        'failed' => $failed
    ));
}
add_action('wp_ajax_process_offline_sync', 'process_offline_sync');

function process_sync_item($item) {
    global $wpdb;
    $data = json_decode($item->data, true);

    switch ($item->action) {
        case 'create':
            return $wpdb->insert($wpdb->prefix . $item->table_name, $data);
        case 'update':
            return $wpdb->update($wpdb->prefix . $item->table_name, $data, array('id' => $item->record_id));
        case 'delete':
            return $wpdb->delete($wpdb->prefix . $item->table_name, array('id' => $item->record_id));
        default:
            return false;
    }
}

