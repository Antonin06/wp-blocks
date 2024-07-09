<?php
// This comment needed to avoid PHP undefined variable
/** @var array $attributes */

$block_wrapper_attributes = get_block_wrapper_attributes();

echo "<pre>";
var_dump($attributes);
echo "</pre>";

$selectedFaqIds = $attributes['selectedFaqIds'] ?? [];
$query = new WP_Query([
	'post_type' => 'faq',
	'post__in' => $selectedFaqIds,
]);

echo "<pre>";
var_dump($query);
echo "</pre>";
?>

<div <?php echo $block_wrapper_attributes;  ?>>


</div>
