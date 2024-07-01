<?php
/**
 * Plugin Name:       Antonin blocks
 * Description:       Code is Poetry.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.0.1
 * Author:            Anto
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       antonin
 *
 * @package AntoninBlocks
 */

namespace Antonin;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class AntoninBlocks {
	public const TextDomain = 'antonin-blocks';

	public function __construct() {
		add_action('init', [$this, 'register_blocks_and_post_types']);
		add_action('rest_api_init', [$this, 'myplugin_register_faq_endpoint']);
	}

	public function register_blocks_and_post_types(): void {
		add_filter('block_categories_all', function($categories) {
			array_unshift($categories, [
				'slug' => 'antonin',
				'title' => 'Antonin'
			]);
			return $categories;
		}, 10, 2);

		register_block_type(__DIR__ . '/build/blocks/swiper');
		register_block_type(__DIR__ . '/build/blocks/questions-answers');
		register_block_type(__DIR__ . '/build/blocks/questions-answers-card');


		$this->register_custom_post_type();
	}

	public function register_custom_post_type(): void {
		$labels = [
			'name'               => _x('FAQs', 'post type general name', self::TextDomain),
			'singular_name'      => _x('FAQ', 'post type singular name', self::TextDomain),
			'menu_name'          => _x('FAQs', 'admin menu', self::TextDomain),
			'name_admin_bar'     => _x('FAQ', 'add new on admin bar', self::TextDomain),
			'add_new'            => _x('Add New', 'FAQ', self::TextDomain),
			'add_new_item'       => __('Add New FAQ', self::TextDomain),
			'new_item'           => __('New FAQ', self::TextDomain),
			'edit_item'          => __('Edit FAQ', self::TextDomain),
			'view_item'          => __('View FAQ', self::TextDomain),
			'all_items'          => __('All FAQs', self::TextDomain),
			'search_items'       => __('Search FAQs', self::TextDomain),
			'parent_item_colon'  => __('Parent FAQs:', self::TextDomain),
			'not_found'          => __('No FAQs found.', self::TextDomain),
			'not_found_in_trash' => __('No FAQs found in Trash.', self::TextDomain),
		];

		$args = [
			'labels'             => $labels,
			'public' => true,
			'show_in_rest' => true,
			'menu_icon' => 'dashicons-admin-post',
			'supports' => array(
				0 => 'title',
				1 => 'editor',
				2 => 'thumbnail',
				3 => 'custom-fields',
			),
			'delete_with_user' => false,
		];

		register_post_type('faq', $args);
	}

	public static function getThePostThumbnail($postID): string {
		$thumbnail = get_the_post_thumbnail($postID, 'medium', ['class' => 'card-post__thumbnail']);
		if (!$thumbnail) {
			$thumbnail = '<img class="card-post__thumbnail" src="https://via.placeholder.com/150" alt="Placeholder image" />';
		}
		return $thumbnail;
	}

	public function getThePostCategory($postID): string {
		$categories = get_the_terms($postID, 'category');
		if (!$categories) {
			return '';
		}
		$category = $categories[0];

		return "<a class='card-post__category' href='" . get_term_link($category) . "'>" . $category->name . "</a>";
	}

	public function myplugin_register_faq_endpoint(): void
	{
		register_rest_route('myplugin/v1', '/faqs', array(
			'methods' => 'GET',
			'callback' => [$this, 'myplugin_get_faqs'],
			'permission_callback' => '__return_true',
		));
	}

	public static function myplugin_get_faqs(): array
	{
		$faqs = get_posts(array(
			'post_type' => 'faq',
			'numberposts' => -1,
		));

		$data = array();

		foreach ($faqs as $faq) {
			$data[] = array(
				'id' => $faq->ID,
				'title' => get_the_title($faq),
				'content' => apply_filters('the_content', $faq->post_content),
			);
		}

		return $data;
	}

}

new AntoninBlocks();
