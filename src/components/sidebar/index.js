import {registerPlugin} from "@wordpress/plugins"
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import { PanelBody, TextControl } from '@wordpress/components';
import {useSelect} from "@wordpress/data";
import {store as coreStore} from "@wordpress/core-data";

const MySidebar = () => {
	const featuredMediaId = useSelect(
		(select) => select('core/editor').getEditedPostAttribute('featured_media'),
		[]
	);

	const thumbnail = useSelect(
		(select) => {
			if (!featuredMediaId) {
				return null;
			}
			return select(coreStore).getMedia(featuredMediaId);
		},
		[featuredMediaId]
	);

	console.log('featuredMediaId', featuredMediaId);

	return (
		<>
			<PluginSidebar
				name="my-custom-sidebar"
				title="My Custom Sidebar"
			>
				<PanelBody title="Custom Settings">
					<TextControl
						label="Custom Field"
						value={ '' /* Here you can fetch or set the value */}
						onChange={ (value) => { /* Handle the change */ } }
					/>
				</PanelBody>
			</PluginSidebar>
		</>
	);
};

registerPlugin( 'my-custom-sidebar', {
	render: MySidebar,
} );
