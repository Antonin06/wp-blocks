import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import MyModal from './modal';
import "primereact/resources/themes/lara-light-cyan/theme.css";

export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const blockProps = useBlockProps();
	const { faqs = [], selectedFaqIds = [] } = attributes;

	const handleFaqChange = (newFaqIds) => {
		setAttributes({ selectedFaqIds: newFaqIds });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Select and Order FAQs', 'text-domain')}>
					<MyModal
						faqs={faqs}
						selectedFaqIds={selectedFaqIds}
						handleFaqChange={handleFaqChange}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className="block-questions-answers">
					{selectedFaqIds.length > 0 ? (
						selectedFaqIds.map((faqId) => {
							const faq = faqs.find(faq => faq.id === faqId);
							return (
								<div key={faq.id} className="block-questions-answers__accordion-item">
									<button className="block-questions-answers__accordion-button"
											aria-expanded="false"
											aria-controls={`accordion-content-${faq.id}`}>
										<span className="block-questions-answers__accordion-title">{faq.title}</span>
										<span className="block-questions-answers__icon" aria-hidden="true"></span>
									</button>
									<div className="block-questions-answers__accordion-content" aria-hidden="true">
										<div className="block-questions-answers__accordion-text">
											{faq.content}
										</div>
									</div>
								</div>
							);
						})
					) : (
						<p>{__('No FAQs selected', 'text-domain')}</p>
					)}
				</div>
			</div>
		</>
	);
}
