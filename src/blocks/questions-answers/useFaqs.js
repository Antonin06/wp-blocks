import { useSelect } from '@wordpress/data';
import { useEffect, useState, useMemo } from '@wordpress/element';

const useFaqs = () => {
	const fetchedFaqs = useSelect((select) => {
		return select('core').getEntityRecords('postType', 'faq', { per_page: -1 });
	}, []);

	const isResolving = useSelect((select) => {
		return select('core/data').isResolving('core', 'getEntityRecords', ['postType', 'faq', { per_page: -1 }]);
	}, []);

	const faqs = useMemo(() => {
		console.log('Memoized FAQs:', fetchedFaqs); // Log when memoization happens
		return fetchedFaqs || [];
	}, [fetchedFaqs]);

	return { faqs, isLoading: isResolving };
};

export default useFaqs;
