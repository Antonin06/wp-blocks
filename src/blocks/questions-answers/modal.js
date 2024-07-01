import React, { useState, useCallback } from 'react';
import { Button } from '@wordpress/components';
import { Dialog } from 'primereact/dialog';
import { PickList } from 'primereact/picklist';

const MyModal = ({ attributes, setAttributes, availableFaqs, selectedFaqs, ItemTemplate }) => {
	const [visible, setVisible] = useState(false);

	const onChange = useCallback((event) => {
		setAttributes({ faqIds: event.target.map((item) => item.id) });
	}, [setAttributes]);

	const openDialog = () => setVisible(true);
	const closeDialog = () => setVisible(false);

	const dialogFooter = (
		<div>
			<Button label="Close" onClick={closeDialog} />
		</div>
	);

	return (
		<>
			<Button onClick={openDialog}>Open Dialog</Button>
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
					source={availableFaqs}
					target={selectedFaqs}
					onChange={onChange}
					itemTemplate={item => (
						<div className="p-2">
							{item.title}
						</div>
					)}
					sourceHeader="Available"
					targetHeader="Selected"
				/>
			</Dialog>
		</>
	);
};

export default MyModal;
