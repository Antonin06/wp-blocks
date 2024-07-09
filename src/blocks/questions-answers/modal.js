import React, { useState, useEffect } from 'react';
import { Button } from '@wordpress/components';
import { Dialog } from 'primereact/dialog';
import { PickList } from 'primereact/picklist';

const MyModal = ({ faqs, selectedFaqIds, handleFaqChange }) => {
	const [visible, setVisible] = useState(false);
	const [source, setSource] = useState([]);
	const [target, setTarget] = useState([]);

	useEffect(() => {
		setSource(faqs.filter(faq => !selectedFaqIds.includes(faq.id)));
		setTarget(faqs.filter(faq => selectedFaqIds.includes(faq.id)));
	}, [faqs]);

	const openDialog = () => setVisible(true);
	const closeDialog = () => setVisible(false);

	const onChange = (event) => {
		console.log(event.target.map(faq => faq.id));
		setSource(event.source);
		setTarget(event.target);
		handleFaqChange(event.target.map(faq => faq.id));
	};

	const itemTemplate = (item) => {
		return (
			<div className="flex flex-wrap p-2 align-items-center gap-3">
				{item.title}
			</div>
		);
	};

	const dialogFooter = (
		<div>
			<Button onClick={closeDialog}>Close</Button>
		</div>
	);

	return (
		<>
			<Button onClick={openDialog}>Open FAQ Selector</Button>
			<Dialog
				header="Select and Order FAQs"
				visible={visible}
				style={{ width: '50vw' }}
				footer={dialogFooter}
				onHide={closeDialog}
				modal
				draggable={false}>
				<PickList
					dataKey="id"
					source={source}
					target={target}
					onChange={onChange}
					itemTemplate={itemTemplate}
					sourceHeader="Available"
					targetHeader="Selected"
					sourceStyle={{ height: '300px' }}
					targetStyle={{ height: '300px' }}
				/>
			</Dialog>
		</>
	);
};

export default MyModal;
