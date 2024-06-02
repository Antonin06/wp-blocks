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
			slidesPerView: sliderSettings.slidesPerView,
			spaceBetween: sliderSettings.spaceBetween,
		});
	});
}

