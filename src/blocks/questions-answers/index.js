import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import "primereact/resources/themes/lara-light-cyan/theme.css";

import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );
