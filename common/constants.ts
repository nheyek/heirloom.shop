export const API_ROUTES = {
	currentUser: 'me',
	listings: 'listings',
	shops: {
		base: 'shops',
		listings: 'listings',
	},
	categories: {
		base: 'categories',
		topLevel: 'topLevel',
		children: 'children',
		listings: 'listings',
	},
	search: {
		base: 'search',
		queryParam: 'q',
	},
	cart: {
		listings: 'cart/listings',
	},
};

export const SEARCH_QUERY_LIMITS = {
	minChars: 3,
	maxChars: 48,
};
