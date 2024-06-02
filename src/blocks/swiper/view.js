import Swiper from 'swiper';
import {Navigation, Pagination} from "swiper/modules";

console.log( 'Hello World! (from create-block-antonin-blocks block)' );

Swiper.use([Navigation, Pagination]);

const swiperBlocks = document.querySelectorAll('.wp-block-antonin-blocks-swiper');

if(swiperBlocks.length) {

	swiperBlocks.forEach((swiperBlock) => {
		const swiperContainer = swiperBlock.querySelector('.swiper-container');

		if(!swiperContainer) {
			return;
		}

		const sliderSettings = JSON.parse(swiperBlock.dataset.swiper);
		const swiper = new Swiper(swiperContainer, {
			slidesPerView: sliderSettings.slidesPerViewMobile,
			spaceBetween: sliderSettings.spaceBetween,
			// breakpoints: {
			// 	1024: {
			// 		slidesPerView: sliderSettings.slidesPerViewDesktop,
			// 	},
			// 	768: {
			// 		slidesPerView: sliderSettings.slidesPerViewTablet,
			// 	},
			// 	320: {
			// 		slidesPerView: sliderSettings.slidesPerViewMobile,
			// 	},
			// },
			navigation: {
				nextEl: swiperBlock.querySelector('.swiper-button-next'),
				prevEl: swiperBlock.querySelector('.swiper-button-prev'),
			},
		});
	});
}

