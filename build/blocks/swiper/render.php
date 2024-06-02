<?php
// This comment needed to avoid PHP undefined variable
/** @var array $attributes */


// Query Attributes
$queryAttrs = $attributes['query'] ?? [];
$postType = $queryAttrs['postType'] ?? 'post';
$postsPerPage = $queryAttrs['postsPerPage'] ?? 5;

// Slider Attributes
$sliderAttrs = $attributes['sliderSettings'] ?? [];
$slidesPerViewDesktop = $sliderAttrs['slidesPerViewDesktop'] ?? 3;
$slidesPerViewTablet = $sliderAttrs['slidesPerViewTablet'] ?? 2;
$slidesPerViewMobile = $sliderAttrs['slidesPerViewMobile'] ?? 1;
$spaceBetween = $sliderAttrs['spaceBetween'] ?? 10;

// Query Posts - Get the attributes from the block editor
$query = new WP_Query([
	'post_type' => $postType,
	'posts_per_page' => $postsPerPage
]);

$block_wrapper_attributes = get_block_wrapper_attributes(
	[
		"data-swiper" => json_encode([
			"slidesPerViewDesktop" => esc_attr($slidesPerViewDesktop),
			"slidesPerViewTablet" => esc_attr($slidesPerViewTablet),
			"slidesPerViewMobile" => esc_attr($slidesPerViewMobile),
			"spaceBetween" => esc_attr($spaceBetween)
		])
	]
);
?>

<div <?php echo $block_wrapper_attributes;  ?>>
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<?php foreach($query->posts as $post):
				$getTerms = get_the_terms($post->ID, 'category');
				?>
				<div class="swiper-slide">
					<article class="card-post">
						<div class="card-post__header">
							<?php echo Antonin\AntoninBlocks::getThePostThumbnail($post->ID); ?>

							<?php echo Antonin\AntoninBlocks::getThePostCategory($post->ID); ?>
						</div>
						<div class="card-post__footer">
							<h2 class="card-post__title"><?php echo $post->post_title; ?></h2>
							<div class="card-post__excerpt"><?php echo $post->post_excerpt; ?></div>
							<a class="card-post__link" href="<?php echo get_permalink($post->ID); ?>"><?php echo __('Read more', 'antonin-blocks') ?></a>
						</div>
					</article>
				</div>
			<?php endforeach; ?>
		</div>
		<div class="swiper-button-prev"></div>
		<div class="swiper-button-next"></div>
		<div class="swiper-pagination"></div>
	</div>
</div>
