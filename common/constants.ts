export const API_ROUTES = {
	base: 'api',
	currentUser: {
		base: 'me',
		favorites: 'favorites',
	},
	listings: {
		base: 'listings',
		favorite: 'favorite',
	},
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
	checkout: {
		base: 'checkout',
		calculateTax: 'calculateTax',
		submitOrder: 'submitOrder',
	},
	webhooks: {
		base: 'webhooks',
		stripe: 'stripe',
	},
	orders: {
		base: 'orders',
		status: 'status',
	},
};

export const SEARCH_QUERY_LIMITS = {
	minChars: 3,
	maxChars: 48,
};
