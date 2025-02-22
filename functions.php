<?php
// Include necessary files
require_once(get_template_directory() . '/inc/class-auth.php');
require_once(get_template_directory() . '/inc/class-security.php');
require_once(get_template_directory() . '/inc/components.php');
require_once(get_template_directory() . '/inc/class-notification.php');
require_once(get_template_directory() . '/inc/security/data-protection.php');
require_once(get_template_directory() . '/inc/offline/sync-manager.php');

// ... (previous code remains unchanged)

// Add security headers
function add_security_headers() {
    header("Strict-Transport-Security: max-age=31536000; includeSubDomains");
    header("X-Content-Type-Options: nosniff");
    header("X-Frame-Options: SAMEORIGIN");
    header("X-XSS-Protection: 1; mode=block");
    header("Referrer-Policy: strict-origin-when-cross-origin");
    header("Permissions-Policy: geolocation=(), microphone=(), camera=()");
    header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; img-src 'self' data:; font-src 'self'; connect-src 'self';");
}
add_action('send_headers', 'add_security_headers');

// Enqueue styles and scripts
function hospital_enqueue_scripts() {
    wp_enqueue_style('hospital-theme', get_template_directory_uri() . '/assets/css/theme.css', array(), '1.0.0');
    wp_enqueue_style('hospital-style', get_template_directory_uri() . '/style.css', array(), '1.0.0');
    wp_enqueue_script('hospital-script', get_template_directory_uri() . '/assets/js/main.js', array('jquery'), '1.0.0', true);
    
    // Enqueue offline sync scripts
    if (is_user_logged_in()) {
        enqueue_offline_scripts();
    }
}
add_action('wp_enqueue_scripts', 'hospital_enqueue_scripts');

// ... (rest of the previous code remains unchanged)

// Add AJAX actions for offline sync
add_action('wp_ajax_save_offline_data', 'save_offline_data');
add_action('wp_ajax_process_offline_sync', 'process_offline_sync');

// Implement data retention policy
add_action('hospital_data_retention_cron', 'implement_data_retention_policy');

// Schedule data retention cron job
if (!wp_next_scheduled('hospital_data_retention_cron')) {
    wp_schedule_event(time(), 'daily', 'hospital_data_retention_cron');
}

// Add user data export functionality
add_action('wp_ajax_export_my_data', 'ajax_export_my_data');

// Add user data deletion request functionality
add_action('wp_ajax_request_data_deletion', 'ajax_request_data_deletion');

// Add GDPR compliance notice to registration form
add_action('register_form', 'add_gdpr_consent_to_registration');

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

// Add custom user roles
function hospital_add_custom_roles() {
    add_role('doctor', 'Doctor', array(
        'read' => true,
        'edit_posts' => false,
        'delete_posts' => false,
    ));
    add_role('nurse', 'Nurse', array(
        'read' => true,
        'edit_posts' => false,
        'delete_posts' => false,
    ));
    add_role('patient', 'Patient', array(
        'read' => true,
        'edit_posts' => false,
        'delete_posts' => false,
    ));
}
add_action('init', 'hospital_add_custom_roles');

// Customize admin menu based on user role
function hospital_customize_admin_menu() {
    $user = wp_get_current_user();
    if (in_array('doctor', $user->roles)) {
        remove_menu_page('edit.php');
        remove_menu_page('edit-comments.php');
        // Add custom menu items for doctors
        add_menu_page('My Patients', 'My Patients', 'read', 'my-patients', 'display_my_patients_page', 'dashicons-groups', 5);
        add_menu_page('Appointments', 'Appointments', 'read', 'doctor-appointments', 'display_doctor_appointments_page', 'dashicons-calendar-alt', 10);
    } elseif (in_array('nurse', $user->roles)) {
        remove_menu_page('edit.php');
        remove_menu_page('edit-comments.php');
        // Add custom menu items for nurses
        add_menu_page('Patient Records', 'Patient Records', 'read', 'patient-records', 'display_patient_records_page', 'dashicons-clipboard', 5);
        add_menu_page('Tasks', 'Tasks', 'read', 'nurse-tasks', 'display_nurse_tasks_page', 'dashicons-list-view', 10);
    } elseif (in_array('patient', $user->roles)) {
        // Redirect patients to the frontend dashboard
        wp_redirect(home_url('/patient-dashboard/'));
        exit;
    }
}
add_action('admin_menu', 'hospital_customize_admin_menu');

// Display custom pages for different roles
function display_my_patients_page() {
    // Implementation for doctor's patients page
}

function display_doctor_appointments_page() {
    // Implementation for doctor's appointments page
}

function display_patient_records_page() {
    // Implementation for nurse's patient records page
}

function display_nurse_tasks_page() {
    // Implementation for nurse's tasks page
}

// Add custom fields to user profile
function hospital_add_custom_user_fields($user) {
    ?>
    <h3><?php _e('Additional Information', 'hospital'); ?></h3>
    <table class="form-table">
        <tr>
            <th><label for="date_of_birth"><?php _e('Date of Birth', 'hospital'); ?></label></th>
            <td>
                <input type="date" name="date_of_birth" id="date_of_birth" value="<?php echo esc_attr(get_user_meta($user->ID, 'date_of_birth', true)); ?>" class="regular-text" />
            </td>
        </tr>
        <tr>
            <th><label for="phone_number"><?php _e('Phone Number', 'hospital'); ?></label></th>
            <td>
                <input type="tel" name="phone_number" id="phone_number" value="<?php echo esc_attr(get_user_meta($user->ID, 'phone_number', true)); ?>" class="regular-text" />
            </td>
        </tr>
    </table>
    <?php
}
add_action('show_user_profile', 'hospital_add_custom_user_fields');
add_action('edit_user_profile', 'hospital_add_custom_user_fields');

// Save custom user fields
function hospital_save_custom_user_fields($user_id) {
    if (current_user_can('edit_user', $user_id)) {
        update_user_meta($user_id, 'date_of_birth', sanitize_text_field($_POST['date_of_birth']));
        update_user_meta($user_id, 'phone_number', sanitize_text_field($_POST['phone_number']));
    }
}
add_action('personal_options_update', 'hospital_save_custom_user_fields');
add_action('edit_user_profile_update', 'hospital_save_custom_user_fields');

// Add custom query vars
function hospital_add_query_vars($vars) {
    $vars[] = 'patient_id';
    $vars[] = 'appointment_id';
    return $vars;
}
add_filter('query_vars', 'hospital_add_query_vars');

// Add rewrite rules for custom pages
function hospital_add_rewrite_rules() {
    add_rewrite_rule('^patient/([0-9]+)/?', 'index.php?pagename=patient-profile&patient_id=$matches[1]', 'top');
    add_rewrite_rule('^appointment/([0-9]+)/?', 'index.php?pagename=appointment-details&appointment_id=$matches[1]', 'top');
}
add_action('init', 'hospital_add_rewrite_rules');

// Flush rewrite rules on theme activation
function hospital_flush_rewrite_rules() {
    hospital_add_rewrite_rules();
    flush_rewrite_rules();
}
add_action('after_switch_theme', 'hospital_flush_rewrite_rules');

// Add custom image sizes
add_image_size('doctor-profile', 300, 300, true);
add_image_size('patient-avatar', 150, 150, true);

// Register custom post types
function hospital_register_post_types() {
    register_post_type('doctor', array(
        'labels' => array(
            'name' => __('Doctors', 'hospital'),
            'singular_name' => __('Doctor', 'hospital'),
        ),
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-businessman',
        'supports' => array('title', 'editor', 'thumbnail'),
        'rewrite' => array('slug' => 'doctors'),
    ));

    register_post_type('appointment', array(
        'labels' => array(
            'name' => __('Appointments', 'hospital'),
            'singular_name' => __('Appointment', 'hospital'),
        ),
        'public' => true,
        'has_archive' => false,
        'menu_icon' => 'dashicons-calendar-alt',
        'supports' => array('title', 'editor'),
        'rewrite' => array('slug' => 'appointments'),
    ));
}
add_action('init', 'hospital_register_post_types');

// Register custom taxonomies
function hospital_register_taxonomies() {
    register_taxonomy('specialization', 'doctor', array(
        'labels' => array(
            'name' => __('Specializations', 'hospital'),
            'singular_name' => __('Specialization', 'hospital'),
        ),
        'hierarchical' => true,
        'rewrite' => array('slug' => 'specialization'),
    ));
}
add_action('init', 'hospital_register_taxonomies');

// Add shortcode for displaying doctor list
function hospital_doctor_list_shortcode($atts) {
    $atts = shortcode_atts(array(
        'limit' => -1,
        'specialization' => '',
    ), $atts);

    $args = array(
        'post_type' => 'doctor',
        'posts_per_page' => $atts['limit'],
    );

    if (!empty($atts['specialization'])) {
        $args['tax_query'] = array(
            array(
                'taxonomy' => 'specialization',
                'field' => 'slug',
                'terms' => $atts['specialization'],
            ),
        );
    }

    $doctors = new WP_Query($args);

    ob_start();
    if ($doctors->have_posts()) {
        echo '<ul class="doctor-list">';
        while ($doctors->have_posts()) {
            $doctors->the_post();
            echo '<li>';
            echo '<a href="' . get_permalink() . '">' . get_the_title() . '</a>';
            echo '</li>';
        }
        echo '</ul>';
    } else {
        echo '<p>No doctors found.</p>';
    }
    wp_reset_postdata();

    return ob_get_clean();
}
add_shortcode('doctor_list', 'hospital_doctor_list_shortcode');

// Add widgets
function hospital_register_widgets() {
    register_widget('Hospital_Upcoming_Appointments_Widget');
}
add_action('widgets_init', 'hospital_register_widgets');

class Hospital_Upcoming_Appointments_Widget extends WP_Widget {
    public function __construct() {
        parent::__construct(
            'hospital_upcoming_appointments',
            __('Upcoming Appointments', 'hospital'),
            array('description' => __('Displays upcoming appointments for the logged-in user', 'hospital'))
        );
    }

    public function widget($args, $instance) {
        if (!is_user_logged_in()) {
            return;
        }

        $user_id = get_current_user_id();
        $appointments = get_user_upcoming_appointments($user_id, 5);

        echo $args['before_widget'];
        echo $args['before_title'] . __('Upcoming Appointments', 'hospital') . $args['after_title'];

        if (!empty($appointments)) {
            echo '<ul>';
            foreach ($appointments as $appointment) {
                echo '<li>' . date_i18n('F j, Y g:i a', strtotime($appointment->appointment_date)) . ' - Dr. ' . get_the_title($appointment->doctor_id) . '</li>';
            }
            echo '</ul>';
        } else {
            echo '<p>' . __('No upcoming appointments.', 'hospital') . '</p>';
        }

        echo $args['after_widget'];
    }
}

// Add theme options page
function hospital_add_theme_options_page() {
    add_menu_page(
        __('Hospital Theme Options', 'hospital'),
        __('Hospital Options', 'hospital'),
        'manage_options',
        'hospital-theme-options',
        'hospital_theme_options_page',
        'dashicons-admin-generic',
        60
    );
}
add_action('admin_menu', 'hospital_add_theme_options_page');

function hospital_theme_options_page() {
    // Implementation of the theme options page
}

// Register theme options
function hospital_register_theme_options() {
    register_setting('hospital_theme_options', 'hospital_theme_options');
}
add_action('admin_init', 'hospital_register_theme_options');

// Add custom login page styling
function hospital_custom_login_style() {
    wp_enqueue_style('hospital-login-style', get_template_directory_uri() . '/assets/css/login-style.css');
}
add_action('login_enqueue_scripts', 'hospital_custom_login_style');

// Customize login logo URL
function hospital_login_logo_url() {
    return home_url();
}
add_filter('login_headerurl', 'hospital_login_logo_url');

// Customize login logo title
function hospital_login_logo_url_title() {
    return get_bloginfo('name');
}
add_filter('login_headertext', 'hospital_login_logo_url_title');

// Add custom dashboard widgets
function hospital_add_dashboard_widgets() {
    wp_add_dashboard_widget(
        'hospital_stats_widget',
        __('Hospital Statistics', 'hospital'),
        'hospital_stats_widget_content'
    );
}
add_action('wp_dashboard_setup', 'hospital_add_dashboard_widgets');

function hospital_stats_widget_content() {
    // Implementation of the hospital statistics widget
}

// Add custom footer text
function hospital_custom_admin_footer() {
    echo '<span id="footer-thankyou">' . __('Thank you for using the Hospital Management System', 'hospital') . '</span>';
}
add_filter('admin_footer_text', 'hospital_custom_admin_footer');

// Disable XML-RPC
add_filter('xmlrpc_enabled', '__return_false');

// Remove WordPress version from head and feeds
remove_action('wp_head', 'wp_generator');
add_filter('the_generator', '__return_empty_string');

// Disable pingbacks
function hospital_disable_pingbacks(&$links) {
    foreach ($links as $l => $link) {
        if (0 === strpos($link, get_option('home'))) {
            unset($links[$l]);
        }
    }
}
add_action('pre_ping', 'hospital_disable_pingbacks');

// Implement custom error logging
function hospital_custom_error_log($message) {
    $log_file = WP_CONTENT_DIR . '/hospital-error.log';
    error_log(date('[Y-m-d H:i:s] ') . $message . "\n", 3, $log_file);
}

// Example usage of custom error logging
// hospital_custom_error_log('This is a custom error message');

// Add support for translation
function hospital_load_theme_textdomain() {
    load_theme_textdomain('hospital', get_template_directory() . '/languages');
}
add_action('after_setup_theme', 'hospital_load_theme_textdomain');

// Add theme support for various features
function hospital_add_theme_support() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    add_theme_support('customize-selective-refresh-widgets');
    add_theme_support('responsive-embeds');
}
add_action('after_setup_theme', 'hospital_add_theme_support');

// Register navigation menus
function hospital_register_menus() {
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'hospital'),
        'footer' => __('Footer Menu', 'hospital'),
    ));
}
add_action('init', 'hospital_register_menus');

// Add custom body classes
function hospital_body_classes($classes) {
    if (is_singular()) {
        $classes[] = 'singular';
    }
    if (is_active_sidebar('sidebar-1')) {
        $classes[] = 'has-sidebar';
    }
    return $classes;
}
add_filter('body_class', 'hospital_body_classes');

// Implement custom pagination
function hospital_pagination() {
    global $wp_query;
    $big = 999999999;
    echo paginate_links(array(
        'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
        'format' => '?paged=%#%',
        'current' => max(1, get_query_var('paged')),
        'total' => $wp_query->max_num_pages,
        'prev_text' => __('&laquo; Previous', 'hospital'),
        'next_text' => __('Next &raquo;', 'hospital'),
    ));
}

// Add custom excerpt length
function hospital_custom_excerpt_length($length) {
    return 20;
}
add_filter('excerpt_length', 'hospital_custom_excerpt_length', 999);

// Add custom excerpt more
function hospital_custom_excerpt_more($more) {
    return '... <a href="' . get_permalink() . '">' . __('Read More', 'hospital') . '</a>';
}
add_filter('excerpt_more', 'hospital_custom_excerpt_more');

// Implement custom breadcrumbs
function hospital_breadcrumbs() {
    if (is_front_page()) {
        return;
    }
    
    echo '<div class="breadcrumbs">';
    echo '<a href="' . home_url() . '">' . __('Home', 'hospital') . '</a>';
    
    if (is_category() || is_single()) {
        echo ' &raquo; ';
        the_category(' &raquo; ');
        if (is_single()) {
            echo ' &raquo; ';
            the_title();
        }
    } elseif (is_page()) {
        echo ' &raquo; ';
        echo the_title();
    } elseif (is_search()) {
        echo ' &raquo; ' . __('Search Results for "', 'hospital') . get_search_query() . '"';
    }
    
    echo '</div>';
}

// Add schema markup
function hospital_add_schema_markup($content) {
    if (is_single()) {
        $schema = array(
            '@context' => 'http://schema.org',
            '@type' => 'Article',
            'headline' => get_the_title(),
            'datePublished' => get_the_date('c'),
            'dateModified' => get_the_modified_date('c'),
            'author' => array(
                '@type' => 'Person',
                'name' => get_the_author()
            ),
            'publisher' => array(
                '@type' => 'Organization',
                'name' => get_bloginfo('name'),
                'logo' => array(
                    '@type' => 'ImageObject',
                    'url' => get_template_directory_uri() . '/assets/images/logo.png'
                )
            ),
            'description' => get_the_excerpt()
        );
        
        $content = '<script type="application/ld+json">' . json_encode($schema) . '</script>' . $content;
    }
    
    return $content;
}
add_filter('the_content', 'hospital_add_schema_markup');

// Implement custom search form
function hospital_custom_search_form($form) {
    $form = '<form role="search" method="get" id="searchform" class="searchform" action="' . home_url('/') . '">
        <div>
            <label class="screen-reader-text" for="s">' . __('Search for:', 'hospital') . '</label>
            <input type="text" value="' . get_search_query() . '" name="s" id="s" placeholder="' . esc_attr__('Search...', 'hospital') . '" />
            <input type="submit" id="searchsubmit" value="'. esc_attr__('Search', 'hospital') .'" />
        </div>
    </form>';

    return $form;
}
add_filter('get_search_form', 'hospital_custom_search_form');

// Add custom favicon
function hospital_add_favicon() {
    echo '<link rel="shortcut icon" href="' . get_template_directory_uri() . '/favicon.ico" />';
}
add_action('wp_head', 'hospital_add_favicon');

// Implement custom comment template
function hospital_custom_comments($comment, $args, $depth) {
    $GLOBALS['comment'] = $comment; ?>
    <li <?php comment_class(); ?> id="comment-<?php comment_ID(); ?>">
        <div class="comment-body">
            <div class="comment-author vcard">
                <?php echo get_avatar($comment, 60); ?>
                <?php printf(__('<cite class="fn">%s</cite> <span class="says">says:</span>', 'hospital'), get_comment_author_link()); ?>
            </div>
            <div class="comment-meta commentmetadata">
                <a href="<?php echo htmlspecialchars(get_comment_link($comment->comment_ID)); ?>">
                    <?php printf(__('%1$s at %2$s', 'hospital'), get_comment_date(), get_comment_time()); ?>
                </a>
                <?php edit_comment_link(__('(Edit)', 'hospital'), '  ', ''); ?>
            </div>
            <?php if ($comment->comment_approved == '0') : ?>
                <em class="comment-awaiting-moderation"><?php _e('Your comment is awaiting moderation.', 'hospital'); ?></em>
                <br />
            <?php endif; ?>
            <?php comment_text(); ?>
            <div class="reply">
                <?php comment_reply_link(array_merge($args, array('depth' => $depth, 'max_depth' => $args['max_depth']))); ?>
            </div>
        </div>
    <?php
}

// Add custom post types to RSS feed
function hospital_custom_post_types_rss($query) {
    if ($query->is_feed) {
        $query->set('post_type', array('post', 'doctor', 'appointment'));
    }
    return $query;
}
add_filter('pre_get_posts', 'hospital_custom_post_types_rss');

// Implement custom 404 page
function hospital_custom_404_page() {
    global $wp_query;
    $wp_query->set_404();
    status_header(404);
    get_template_part(404);
    exit();
}

// Add custom image sizes to media library
function hospital_custom_image_sizes($sizes) {
    return array_merge($sizes, array(
        'doctor-profile' => __('Doctor Profile', 'hospital'),
        'patient-avatar' => __('Patient Avatar', 'hospital')
    ));
}
add_filter('image_size_names_choose', 'hospital_custom_image_sizes');

// Implement custom login error messages
function hospital_custom_login_errors() {
    return __('Invalid username or password.', 'hospital');
}
add_filter('login_errors', 'hospital_custom_login_errors');

// Add custom dashboard welcome panel
function hospital_custom_dashboard_welcome_panel() {
    ?>
    <div class="welcome-panel-content">
        <h2><?php _e('Welcome to the Hospital Management System!', 'hospital'); ?></h2>
        <p class="about-description"><?php _e('Here are some links to help you get started:', 'hospital'); ?></p>
        <div class="welcome-panel-column-container">
            <div class="welcome-panel-column">
                <h3><?php _e('Get Started', 'hospital'); ?></h3>
                <a class="button button-primary button-hero" href="<?php echo admin_url('admin.php?page=hospital-getting-started'); ?>"><?php _e('Get Started Guide', 'hospital'); ?></a>
            </div>
            <div class="welcome-panel-column">
                <h3><?php _e('Next Steps', 'hospital'); ?></h3>
                <ul>
                    <li><?php printf('<a href="%s" class="welcome-icon welcome-add-page">' . __('Add a new doctor', 'hospital') . '</a>', admin_url('post-new.php?post_type=doctor')); ?></li>
                    <li><?php printf('<a href="%s" class="welcome-icon welcome-add-page">' . __('Manage appointments', 'hospital') . '</a>', admin_url('edit.php?post_type=appointment')); ?></li>
                    <li><?php printf('<a href="%s" class="welcome-icon welcome-add-page">' . __('Update hospital settings', 'hospital') . '</a>', admin_url('admin.php?page=hospital-theme-options')); ?></li>
                </ul>
            </div>
            <div class="welcome-panel-column welcome-panel-last">
                <h3><?php _e('More Actions', 'hospital'); ?></h3>
                <ul>
                    <li><?php printf('<a href="%s" class="welcome-icon welcome-learn-more">' . __('Learn more about the system', 'hospital') . '</a>', esc_url('https://example.com/hospital-docs')); ?></li>
                    <li><?php printf('<a href="%s" class="welcome-icon welcome-comments">' . __('View system status', 'hospital') . '</a>', admin_url('admin.php?page=hospital-system-status')); ?></li>
                </ul>
            </div>
        </div>
    </div>
    <?php
}
remove_action('welcome_panel', 'wp_welcome_panel');
add_action('welcome_panel', 'hospital_custom_dashboard_welcome_panel');

// Implement custom admin bar menu
function hospital_custom_admin_bar_menu($wp_admin_bar) {
    if (!current_user_can('manage_options')) {
        return;
    }

    $wp_admin_bar->add_node(array(
        'id'    => 'hospital-menu',
        'title' => __('Hospital', 'hospital'),
        'href'  => admin_url('admin.php?page=hospital-theme-options')
    ));

    $wp_admin_bar->add_node(array(
        'parent' => 'hospital-menu',
        'id'     => 'hospital-appointments',
        'title'  => __('Appointments', 'hospital'),
        'href'   => admin_url('edit.php?post_type=appointment')
    ));

    $wp_admin_bar->add_node(array(
        'parent' => 'hospital-menu',
        'id'     => 'hospital-doctors',
        'title'  => __('Doctors', 'hospital'),
        'href'   => admin_url('edit.php?post_type=doctor')
    ));

    $wp_admin_bar->add_node(array(
        'parent' => 'hospital-menu',
        'id'     => 'hospital-patients',
        'title'  => __('Patients', 'hospital'),
        'href'   => admin_url('users.php?role=patient')
    ));
}
add_action('admin_bar_menu', 'hospital_custom_admin_bar_menu', 100);

// Implement custom admin footer text
function hospital_custom_admin_footer_text($text) {
    $text = sprintf(__('Thank you for using the %1$s | Version %2$s', 'hospital'), 'Hospital Management System', HOSPITAL_VERSION);
    return $text;
}
add_filter('admin_footer_text', 'hospital_custom_admin_footer_text');

// Add custom meta boxes
function hospital_add_custom_meta_boxes() {
    add_meta_box(
        'doctor_details',
        __('Doctor Details', 'hospital'),
        'hospital_doctor_details_meta_box',
        'doctor',
        'normal',
        'high'
    );

    add_meta_box(
        'appointment_details',
        __('Appointment Details', 'hospital'),
        'hospital_appointment_details_meta_box',
        'appointment',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'hospital_add_custom_meta_boxes');

function hospital_doctor_details_meta_box($post) {
    wp_nonce_field('hospital_doctor_details', 'hospital_doctor_details_nonce');
    $specialization = get_post_meta($post->ID, '_doctor_specialization', true);
    $license = get_post_meta($post->ID, '_doctor_license', true);
    ?>
    <p>
        <label for="doctor_specialization"><?php _e('Specialization:', 'hospital'); ?></label>
        <input type="text" id="doctor_specialization" name="doctor_specialization" value="<?php echo esc_attr($specialization); ?>" size="25" />
    </p>
    <p>
        <label for="doctor_license"><?php _e('License Number:', 'hospital'); ?></label>
        <input type="text" id="doctor_license" name="doctor_license" value="<?php echo esc_attr($license); ?>" size="25" />
    </p>
    <?php
}

function hospital_appointment_details_meta_box($post) {
    wp_nonce_field('hospital_appointment_details', 'hospital_appointment_details_nonce');
    $patient = get_post_meta($post->ID, '_appointment_patient', true);
    $doctor = get_post_meta($post->ID, '_appointment_doctor', true);
    $date = get_post_meta($post->ID, '_appointment_date', true);
    ?>
    <p>
        <label for="appointment_patient"><?php _e('Patient:', 'hospital'); ?></label>
        <?php wp_dropdown_users(array('name' => 'appointment_patient', 'selected' => $patient, 'role' => 'patient')); ?>
    </p>
    <p>
        <label for="appointment_doctor"><?php _e('Doctor:', 'hospital'); ?></label>
        <?php wp_dropdown_users(array('name' => 'appointment_doctor', 'selected' => $doctor, 'role' => 'doctor')); ?>
    </p>
    <p>
        <label for="appointment_date"><?php _e('Date and Time:', 'hospital'); ?></label>
        <input type="datetime-local" id="appointment_date" name="appointment_date" value="<?php echo esc_attr($date); ?>" />
    </p>
    <?php
}

// Save custom meta box data
function hospital_save_custom_meta_box_data($post_id) {
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if ($parent_id = wp_is_post_revision($post_id)) {
        $post_id = $parent_id;
    }

    if (isset($_POST['hospital_doctor_details_nonce']) && wp_verify_nonce($_POST['hospital_doctor_details_nonce'], 'hospital_doctor_details')) {
        if (isset($_POST['doctor_specialization'])) {
            update_post_meta($post_id, '_doctor_specialization', sanitize_text_field($_POST['doctor_specialization']));
        }
        if (isset($_POST['doctor_license'])) {
            update_post_meta($post_id, '_doctor_license', sanitize_text_field($_POST['doctor_license']));
        }
    }

    if (isset($_POST['hospital_appointment_details_nonce']) && wp_verify_nonce($_POST['hospital_appointment_details_nonce'], 'hospital_appointment_details')) {
        if (isset($_POST['appointment_patient'])) {
            update_post_meta($post_id, '_appointment_patient', intval($_POST['appointment_patient']));
        }
        if (isset($_POST['appointment_doctor'])) {
            update_post_meta($post_id, '_appointment_doctor', intval($_POST['appointment_doctor']));
        }
        if (isset($_POST['appointment_date'])) {
            update_post_meta($post_id, '_appointment_date', sanitize_text_field($_POST['appointment_date']));
        }
    }
}
add_action('save

