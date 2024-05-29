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
		});
	}
}

AntoninBlocks::init();
