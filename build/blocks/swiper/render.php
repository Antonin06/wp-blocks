<?php
// This comment needed to avoid PHP undefined variable
/** @var array $attributes */


// Query Attributes
$queryAttrs = $attributes['query'] ?? [];
$postType = $queryAttrs['postType'] ?? 'post';
$postsPerPage = $queryAttrs['postsPerPage'] ?? 5;

// Slider Attributes
$sliderAttrs = $attributes['sliderSettings'] ?? [];
$slidesPerView = $sliderAttrs['slidesPerView'] ?? 1;
$spaceBetween = $sliderAttrs['spaceBetween'] ?? 10;

// Query Posts - Get the attributes from the block editor
$query = new WP_Query([
	'post_type' => $postType,
	'posts_per_page' => $postsPerPage
]);

$block_wrapper_attributes = get_block_wrapper_attributes(
	[
		"data-swiper" => json_encode([
			"slidesPerView" => esc_attr($slidesPerView),
			"spaceBetween" => esc_attr($spaceBetween),
		])
	]
);


echo "<pre>";
var_dump($block_wrapper_attributes);
echo "</pre>";
?>

<div <?php echo $block_wrapper_attributes;  ?>>
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<?php foreach($query->posts as $post): ?>
				<div class="swiper-slide">
					<a href="<?php echo get_permalink($post->ID); ?>">
						<?php echo get_the_post_thumbnail($post->ID, 'medium'); ?>
						<h3><?php echo $post->post_title; ?></h3>
					</a>
				</div>
			<?php endforeach; ?>
		</div>
		<div class="swiper-pagination"></div>
	</div>
</div>
