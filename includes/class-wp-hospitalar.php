<?php

class WP_Hospitalar {

    protected $loader;
    protected $plugin_name;
    protected $version;

    public function __construct() {
        $this->version = WP_HOSPITALAR_VERSION;
        $this->plugin_name = 'wp-hospitalar';
        
        $this->load_dependencies();
        $this->set_locale();
        $this->define_admin_hooks();
        $this->define_public_hooks();
    }

    private function load_dependencies() {
        require_once WP_HOSPITALAR_PLUGIN_DIR . 'includes/class-wp-hospitalar-db.php';
        require_once WP_HOSPITALAR_PLUGIN_DIR . 'includes/class-wp-hospitalar-patient.php';
        require_once WP_HOSPITALAR_PLUGIN_DIR . 'includes/class-wp-hospitalar-doctor.php';
        require_once WP_HOSPITALAR_PLUGIN_DIR . 'includes/class-wp-hospitalar-appointment.php';
        require_once WP_HOSPITALAR_PLUGIN_DIR . 'admin/class-wp-hospitalar-admin.php';
        require_once WP_HOSPITALAR_PLUGIN_DIR . 'public/class-wp-hospitalar-public.php';
    }

    private function set_locale() {
        add_action( 'plugins_loaded', array( $this, 'load_plugin_textdomain' ) );
    }

    public function load_plugin_textdomain() {
        load_plugin_textdomain(
            'wp-hospitalar',
            false,
            dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
        );
    }

    private function define_admin_hooks() {
        $plugin_admin = new WP_Hospitalar_Admin( $this->get_plugin_name(), $this->get_version() );
        add_action( 'admin_enqueue_scripts', array( $plugin_admin, 'enqueue_styles' ) );
        add_action( 'admin_enqueue_scripts', array( $plugin_admin, 'enqueue_scripts' ) );
        add_action( 'admin_menu', array( $plugin_admin, 'add_plugin_admin_menu' ) );
    }

    private function define_public_hooks() {
        $plugin_public = new WP_Hospitalar_Public( $this->get_plugin_name(), $this->get_version() );
        add_action( 'wp_enqueue_scripts', array( $plugin_public, 'enqueue_styles' ) );
        add_action( 'wp_enqueue_scripts', array( $plugin_public, 'enqueue_scripts' ) );
    }

    public function run() {
        $this->define_admin_hooks();
        $this->define_public_hooks();
    }

    public function get_plugin_name() {
        return $this->plugin_name;
    }

    public function get_version() {
        return $this->version;
    }
}

