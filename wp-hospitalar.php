<?php
/**
 * Plugin Name: WP Hospitalar
 * Plugin URI: https://seusiteaqui.com/wp-hospitalar
 * Description: Um sistema de gerenciamento hospitalar para WordPress
 * Version: 1.0.0
 * Author: Seu Nome
 * Author URI: https://seusiteaqui.com
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: wp-hospitalar
 * Domain Path: /languages
 */

// Se este arquivo for chamado diretamente, aborte.
if ( ! defined( 'WPINC' ) ) {
    die;
}

// Definir constantes do plugin
define( 'WP_HOSPITALAR_VERSION', '1.0.0' );
define( 'WP_HOSPITALAR_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'WP_HOSPITALAR_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

// Incluir a classe principal do plugin
require_once WP_HOSPITALAR_PLUGIN_DIR . 'includes/class-wp-hospitalar.php';

// Iniciar o plugin
function run_wp_hospitalar() {
    $plugin = new WP_Hospitalar();
    $plugin->run();
}
run_wp_hospitalar();

