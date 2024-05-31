import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
} from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { PanelBody, SelectControl, Spinner, RangeControl } from "@wordpress/components";
import {useEffect, useRef, useState} from '@wordpress/element';

import Swiper from 'swiper';
import {Navigation, Pagination} from "swiper/modules";
// importe les styles nécessaires pour Swiper
import 'swiper/swiper-bundle.css';

Swiper.use([Navigation, Pagination]);
import './editor.scss';
import metadata from "./block.json";

export default function Edit() {
	const swiperRef = useRef(null);
	const blockProps = useBlockProps();
	const [postsPerPage, setPostsPerPage] = useState(5);
	const [postType, setPostType] = useState('post');

	// Détermination de l'état de chargement pour les types de post et les posts
	const { postTypes, isLoadingTypes } = useSelect((select) => {
		const { getEntityRecords, isResolving } = select("core");
		const data = getEntityRecords("root", "postType", {
			per_page: -1,
		});
		const isLoading = isResolving("core", "getEntityRecords", ["root", "postType", { per_page: -1 }]);
		return { postTypes: data?.filter(item => item.visibility.show_in_nav_menus && item.visibility.show_ui), isLoadingTypes: isLoading };
	}, []);

	const { posts, isLoadingPosts } = useSelect(select => {
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
				slidesPerView: 3,
				spaceBetween: 30,
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
	}, [posts]); // Réinitialise le swiper chaque fois que les posts changent

	console.log({ posts });

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Settings", metadata.textdomain)}>
					<SelectControl
						label={__('Select Post Type:', metadata.textdomain)}
						value={postType}
						options={[
							...(postTypes || []).map((item) => ({
								label: item.labels.singular_name,
								value: item.slug,
							})),
						]}
						onChange={(value) => setPostType(value)}
					/>
					<RangeControl
						label={__('Number of Posts:', metadata.textdomain)}
						value={postsPerPage}
						onChange={(value) => setPostsPerPage(Number(value))}
						min={1}
						max={10}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div ref={swiperRef} className="swiper-container">
					<div className="swiper-wrapper">
						{posts && posts.length > 0 ? (
							posts.map(post => (
								<div className="swiper-slide" key={post.id}>
									<div className="card">
										<h3>{post.title.rendered}</h3>
										<p>{post.excerpt.rendered}</p>
									</div>
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
