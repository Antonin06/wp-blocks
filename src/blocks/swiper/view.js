import Swiper from 'swiper';
import {Navigation, Pagination} from "swiper/modules";

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
			spaceBetween: sliderSettings.spaceBetweenMobile,
			breakpoints: {
				1024: {
					slidesPerView: sliderSettings.slidesPerViewDesktop,
					spaceBetween: sliderSettings.spaceBetweenDesktop,
				},
				768: {
					slidesPerView: sliderSettings.slidesPerViewTablet,
					spaceBetween: sliderSettings.spaceBetweenTablet,
				},
				320: {
					slidesPerView: sliderSettings.slidesPerViewMobile,
					spaceBetween: sliderSettings.spaceBetweenMobile,
				},
			},
			navigation: {
				nextEl: swiperBlock.querySelector('.swiper-button-next'),
				prevEl: swiperBlock.querySelector('.swiper-button-prev'),
			},
		});
	});
}

