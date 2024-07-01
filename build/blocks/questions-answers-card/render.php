<?php
// This comment needed to avoid PHP undefined variable
/** @var array $attributes */

$block_wrapper_attributes = get_block_wrapper_attributes();

$query = new WP_Query([
	'post_type' => 'faq',
	'posts_per_page' => -1
]);

echo "<pre>";
var_dump($query);
echo "</pre>";
?>

<div <?php echo $block_wrapper_attributes;  ?>>

</div>
