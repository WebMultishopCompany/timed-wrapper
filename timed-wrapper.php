<?php
/*
Plugin Name: Timed Gutenberg Wrapper
Description: A Timed Gutenberg wrapper block with start and end date-time visibility.
Version: 1.0
Author: WMC Kārlis
*/

defined('ABSPATH') || exit;

function timed_gutenberg_wrapper_register_block() {
    // Automatically load dependencies and version
    $asset_file = include(plugin_dir_path(__FILE__) . 'build/index.asset.php');

    wp_register_script(
        'timed-gutenberg-wrapper-block-editor',
        plugins_url('build/index.js', __FILE__),
        $asset_file['dependencies'],
        $asset_file['version']
    );

    if (file_exists(plugin_dir_path(__FILE__) . 'editor.css')) {
        wp_register_style(
            'timed-gutenberg-wrapper-block-editor',
            plugins_url('editor.css', __FILE__),
            array('wp-edit-blocks'),
            filemtime(plugin_dir_path(__FILE__) . 'editor.css')
        );
    }

    if (file_exists(plugin_dir_path(__FILE__) . 'style.css')) {
        wp_register_style(
            'timed-gutenberg-wrapper-block',
            plugins_url('style.css', __FILE__),
            array(),
            filemtime(plugin_dir_path(__FILE__) . 'style.css')
        );
    }

    wp_register_script(
        'timed-gutenberg-wrapper-block-frontend',
        plugins_url('frontend.js', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'frontend.js'),
        true
    );

    register_block_type('timed-gutenberg-wrapper/block', array(
        'editor_script' => 'timed-gutenberg-wrapper-block-editor',
        'editor_style' => 'timed-gutenberg-wrapper-block-editor',
        'style' => 'timed-gutenberg-wrapper-block',
        'script' => 'timed-gutenberg-wrapper-block-frontend',
        'attributes' => array(
            'startDateTime' => array(
                'type' => 'string',
                'default' => ''
            ),
            'endDateTime' => array(
                'type' => 'string',
                'default' => ''
            )
        )
    ));
}
add_action('init', 'timed_gutenberg_wrapper_register_block');
