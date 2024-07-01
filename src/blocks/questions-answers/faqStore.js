import { register } from '@wordpress/data';

const DEFAULT_STATE = {
	faqs: [],
	isLoading: true,
};

const actions = {
	setFaqs(faqs) {
		return {
			type: 'SET_FAQS',
			faqs,
		};
	},
	setLoading(isLoading) {
		return {
			type: 'SET_LOADING',
			isLoading,
		};
	},
	fetchFaqs() {
		return async (dispatch) => {
			dispatch(actions.setLoading(true));
			const faqs = await wp.data.select('core').getEntityRecords('postType', 'faq', { per_page: -1 });
			dispatch(actions.setFaqs(faqs));
			dispatch(actions.setLoading(false));
		};
	},
};

const reducer = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case 'SET_FAQS':
			return {
				...state,
				faqs: action.faqs,
			};
		case 'SET_LOADING':
			return {
				...state,
				isLoading: action.isLoading,
			};
		default:
			return state;
	}
};

const selectors = {
	getFaqs(state) {
		return state.faqs;
	},
	isLoading(state) {
		return state.isLoading;
	},
};

register('my-plugin/faq-store', {
	reducer,
	actions,
	selectors,
});
