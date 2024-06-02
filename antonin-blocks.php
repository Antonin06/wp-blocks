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
 * @package CreateBlock
 */


namespace Antonin;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class AntoninBlocks
{

	public const TextDomain = 'antonin-blocks';
	static function init(): void
	{

		add_action( 'init', function () {
			add_filter('block_categories_all', function($categories) {
				array_unshift($categories, [
					'slug' => 'antonin',
					'title' => 'Antonin'
				]);
				return $categories;
			}, 10, 2);

			register_block_type( __DIR__ . '/build/blocks/swiper' );
		});
	}

	public static function getThePostThumbnail($postID): string
	{
		$thumbnail = get_the_post_thumbnail($postID, 'medium', ['class' => 'card-post__thumbnail']);
		if(!$thumbnail) {
			$thumbnail = '<img class="card-post__thumbnail" src="https://via.placeholder.com/150" alt="Placeholder image" />';
		}
		return $thumbnail;
	}

	public static function getThePostCategory($postID): string
	{
		$categories = get_the_terms($postID, 'category');
		if(!$categories) {
			return '';
		}
		$category = $categories[0];

		return "<a class='card-post__category' href='" . get_term_link($category) . "'>" . $category->name . "</a>";
	}
}

AntoninBlocks::init();
