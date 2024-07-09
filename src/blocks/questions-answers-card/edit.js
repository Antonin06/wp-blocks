import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { PanelBody, SelectControl, Spinner } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import './editor.scss';
import './style.scss';

export default function Edit(props) {
	const blockProps = useBlockProps();
	const { attributes, setAttributes, clientId } = props;

	const { faqs, isLoadingFaqs, selectedFaqs } = useSelect((select) => {
		const { getEntityRecords, isResolving } = select('core');
		const { getBlocks } = select('core/block-editor');

		const data = getEntityRecords('postType', 'faq', { per_page: -1 });
		const isLoading = isResolving('core', 'getEntityRecords', ['postType', 'faq', { per_page: -1 }]);

		// Get parent block ID
		const parentBlockId = select('core/block-editor').getBlockParents(clientId)[0];
		let selectedFaqs = [];

		if (parentBlockId) {
			// Get child blocks of the parent block
			const childBlocks = getBlocks(parentBlockId);

			// Extract selected FAQs from child blocks
			selectedFaqs = childBlocks.map(block => block.attributes.faqId).filter(Boolean);
			console.log('Selected FAQs from sibling blocks:', selectedFaqs);
		}

		return { faqs: data, isLoadingFaqs: isLoading, selectedFaqs: selectedFaqs };
	}, [clientId]);

	const availableFaqs = faqs ? faqs.filter(faq => !selectedFaqs.includes(faq.id)) : [];
	const noAvailableFaqs = availableFaqs.length === 0;

	const onChangeFaq = (faqId) => {
		setAttributes({ faqId: parseInt(faqId, 10) });
	};

	useEffect(() => {
		console.log('FAQs:', faqs);
		console.log('Is Loading FAQs:', isLoadingFaqs);
		console.log('Available FAQs:', availableFaqs);
	}, [faqs, isLoadingFaqs, availableFaqs]);

	if (isLoadingFaqs) {
		return <Spinner />;
	}

	const selectedFaq = faqs && faqs.length > 0 && attributes.faqId ? faqs.find(faq => faq.id === attributes.faqId) : null;

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Select FAQ', 'text-domain')}>
					<SelectControl
						label={noAvailableFaqs ? __('No more FAQs to select', 'text-domain') : __('Select a FAQ', 'text-domain')}
						value={attributes.faqId}
						options={[
							{ label: __('Select a FAQ', 'text-domain'), value: '' },
							...availableFaqs.map(faq => ({ label: faq.title.rendered, value: faq.id }))
						]}
						onChange={onChangeFaq}
						disabled={noAvailableFaqs}
					/>
				</PanelBody>
			</InspectorControls>
			<div className="block-questions-answers__accordion-item" {...blockProps}>
				<button className="block-questions-answers__accordion-button"
						id={`accordion-button-${attributes.faqId}`}
						aria-expanded="false"
						aria-controls={`accordion-content-${attributes.faqId}`}>
					<span className="block-questions-answers__accordion-title">{selectedFaq ? selectedFaq.title.rendered : __('No FAQ selected', 'text-domain')}</span>
					<span className="block-questions-answers__icon" aria-hidden="true"></span>
				</button>
				<div className="block-questions-answers__accordion-content"
					 id={`accordion-content-${attributes.faqId}`} aria-hidden="true">
					<div className="block-questions-answers__accordion-text">
						{selectedFaq ? selectedFaq.content.rendered : __('Select a FAQ to display content.', 'text-domain')}
					</div>
				</div>
			</div>
		</>
	);
}
