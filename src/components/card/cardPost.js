import {useSelect} from "@wordpress/data";
import getMedia from "@wordpress/api-fetch";

const cardPost = ({ post }) => {
	console.log(post)

	const categories = useSelect((select) => {
		if (!post.categories || post.categories.length === 0) {
			return [];
		}
		const { getEntityRecords } = select('core');
		return getEntityRecords('taxonomy', 'category', { include: post.categories });
	}, [post.categories]);

	const thumbnailUrl = useSelect((select) => {
		if (!post.featured_media) {
			return 'https://via.placeholder.com/150';
		}
		const media = select('core').getMedia(post.featured_media);
		return media ? media.source_url : 'https://via.placeholder.com/150';
	}, [post.featured_media]);

	const altText = useSelect((select) => {
		if (!post.featured_media) {
			return 'Placeholder';
		}
		const media = select('core').getMedia(post.featured_media);
		return media ? media.alt_text : 'Placeholder';
	}, [post.featured_media]);


	console.log(thumbnailUrl)
	console.log(categories)

	return (
		<article className="card-post">
			<div className="card-post__header">
				<img
					className="card-post__thumbnail"
					src={thumbnailUrl}
					alt={altText}
				/>
				{categories && categories.length > 0 ? (
					<a className="card-post__category" href={categories[0].link} target="_blank">{categories[0].name}</a>
				) : null}
			</div>
			<h2 className="card-post__title" dangerouslySetInnerHTML={{__html: post.title.rendered}}></h2>
			<p className="card-post__excerpt" dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}></p>
			<a className="card-post__link" href={post.link} target="_blank">Read more</a>
		</article>
	);
}

export default cardPost;
