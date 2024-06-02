import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
} from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import {PanelBody, SelectControl, Spinner, RangeControl, TabPanel} from "@wordpress/components";
import {useEffect, useRef, useState} from '@wordpress/element';

// Libraries
import {Swiper} from 'swiper';
import {Navigation, Pagination} from "swiper/modules";
// Components
import PostCard from '../../components/card/cardPost';

// CSS
import './editor.scss';
import './style.scss';

// Metadata
import metadata from "./block.json";

Swiper.use([Navigation, Pagination]);

const cardComponents = {
	post: PostCard,
};
export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const { query, sliderSettings } = attributes;
	const { postType, postsPerPage } = query;
	const { slidesPerView, spaceBetween } = sliderSettings;

	const blockProps = useBlockProps();
	const swiperRef = useRef(null);

	// Détermination de l'état de chargement pour les types de post et les posts
	const { postTypes } = useSelect((select) => {
		const { getEntityRecords, isResolving } = select("core");
		const data = getEntityRecords("root", "postType", {
			per_page: -1,
		});
		const isLoading = isResolving("core", "getEntityRecords", ["root", "postType", { per_page: -1 }]);
		return { postTypes: data?.filter(item => item.visibility.show_in_nav_menus && item.visibility.show_ui), isLoadingTypes: isLoading };
	}, []);

	const { posts } = useSelect(select => {
		const { getEntityRecords, isResolving } = select('core');
		const data = getEntityRecords('postType', postType, {
			per_page: postsPerPage // Utilisation de postsPerPage
		});
		const isLoading = isResolving('core', 'getEntityRecords', ['postType', postType, { per_page: postsPerPage }]);
		return { posts: data, isLoadingPosts: isLoading };
	}, [postType, postsPerPage]); // Ajoutez postsPerPage comme dépendance

	useEffect(() => {
		if (swiperRef.current) {
			const navigationPrev = swiperRef.current.querySelector('.swiper-button-prev');
			const navigationNext = swiperRef.current.querySelector('.swiper-button-next');
			let swiper = new Swiper(swiperRef.current, {
				slidesPerView: slidesPerView,
				spaceBetween: spaceBetween,
				navigation: {
					nextEl: navigationNext,
					prevEl: navigationPrev,
				},
				simulateTouch: false,
				preventClicks: false,
				preventClicksPropagation: false,
			});

			if (navigationPrev) {
				console.log('prev')
				navigationPrev.addEventListener('click', () => {
					console.log('prev click')
					swiper.slidePrev();
				});
			}
			if (navigationNext) {
				console.log('next')
				navigationNext.addEventListener('click', () => {
					console.log('next click')
					swiper.slideNext();
				});
			}

			return () => {
				// S'assurer de détruire l'instance de Swiper pour éviter des fuites de mémoire
				if (swiper) swiper.destroy();
			};
		}
	}, [posts, slidesPerView, spaceBetween]); // Réinitialise le swiper chaque fois que les posts changent


	const CardComponent = cardComponents[postType] || PostCard;

	console.log(props.attributes, "props");
	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Réglages requête", metadata.textdomain)}>
					<SelectControl
						label={__('Séléctionner un type de post', metadata.textdomain)}
						value={postType}
						options={[
							...(postTypes || []).map((item) => ({
								label: item.labels.singular_name,
								value: item.slug,
							})),
						]}
						onChange={(value) => {
							setAttributes({
								query: {
									...query,
									postType: value
								}
							});
						}}
					/>
					<RangeControl
						label={__('Nombre de post à afficher', metadata.textdomain)}
						value={postsPerPage}
						onChange={(value) => {
							setAttributes({
								query: {
									...query,
									postsPerPage: value
								}
							});
						}}
						min={1}
						max={10}
					/>
				</PanelBody>
				<PanelBody title={__("Réglages Slider", metadata.textdomain)}>
					<RangeControl
						label={__('Nombre de slide à afficher', metadata.textdomain)}
						value={slidesPerView}
						onChange={(value) => {
							setAttributes({
								sliderSettings: {
									...sliderSettings,
									slidesPerView: Number(value)
								}
							});
						}}
						min={1}
						max={10}
					/>
					<RangeControl
						label={__('Espace entre les slides', metadata.textdomain)}
						value={spaceBetween}
						onChange={(value) => {
							setAttributes({
								sliderSettings: {
									...sliderSettings,
									spaceBetween: Number(value)
								}
							});
						}}
						min={0}
						max={100}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div ref={swiperRef} className="swiper-container">
					<div className="swiper-wrapper">
						{posts && posts.length > 0 ? (
							posts.map(post => (
								<div className="swiper-slide" key={post.id}>
									<CardComponent post={post} />
								</div>
							))
						) : (
							<p>{__('No posts found.', metadata.textdomain)}</p>
						)}
					</div>
					<div className="swiper-button-prev"></div>
					<div className="swiper-button-next"></div>
					<div className="swiper-pagination"></div>
				</div>
			</div>
		</>
	);
}
