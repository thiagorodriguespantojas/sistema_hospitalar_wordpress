<?php

class WP_Hospitalar_DB {

    public static function create_tables() {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE {$wpdb->prefix}wp_hospitalar_patients (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            user_id bigint(20) UNSIGNED NOT NULL,
            first_name varchar(50) NOT NULL,
            last_name varchar(50) NOT NULL,
            date_of_birth date NOT NULL,
            gender enum('male','female','other') NOT NULL,
            address text,
            phone varchar(20),
            emergency_contact varchar(100),
            PRIMARY KEY  (id),
            FOREIGN KEY (user_id) REFERENCES {$wpdb->users}(ID)
        ) $charset_collate;";

        require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
        dbDelta( $sql );

        // Adicione aqui as outras tabelas (doctors, appointments, etc.)
    }
}

