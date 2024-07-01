import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useState, useMemo } from '@wordpress/element';
import { PickList } from 'primereact/picklist';
import "primereact/resources/primereact.min.css";
// import React from 'react';

// Dummy data
const dummyFaqs = [
	{ id: 1, title: "FAQ 1", content: "Content for FAQ 1" },
	{ id: 2, title: "FAQ 2", content: "Content for FAQ 2" },
	{ id: 3, title: "FAQ 3", content: "Content for FAQ 3" },
	{ id: 4, title: "FAQ 4", content: "Content for FAQ 4" },
];

export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const blockProps = useBlockProps();
	const { faqIds = [] } = attributes;

	const [source, setSource] = useState(dummyFaqs.filter(faq => !faqIds.includes(faq.id)));
	const [target, setTarget] = useState(dummyFaqs.filter(faq => faqIds.includes(faq.id)));

	console.log(source, target);
	const onChange = (event) => {
		setSource(event.source);
		setTarget(event.target);
		setAttributes({ faqIds: event.target.map((item) => item.id) });
	};

	const ItemTemplate = () => ({ item }) => {
		console.log(item)
		if (!item || !item.title) {
			return null;
		}
		return (
			<div className="flex flex-wrap p-2 align-items-center gap-3">
				{item.title}
			</div>
		);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Select and Order FAQs', 'text-domain')}>
					<PickList
						dataKey="id"
						source={source}
						target={target}
						onChange={onChange}
						itemTemplate={ItemTemplate}
						sourceHeader="Available"
						targetHeader="Selected"
						sourceStyle={{ height: '200px' }}
						targetStyle={{ height: '200px' }}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className="block-questions-answers">
					{target.length > 0 ? (
						target.map((faq) => (
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
						))
					) : (
						<p>{__('No FAQs selected', 'text-domain')}</p>
					)}
				</div>
			</div>
		</>
	);
}
