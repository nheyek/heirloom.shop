export const NUM_TOP_LEVEL_CATEGORIES = 4;

export enum Layout {
	COMPACT,
	STANDARD,
}

export const STANDARD_GRID_COLUMNS = {
	base: 1,
	sm: 2,
	md: 3,
	lg: 4,
};

export const STANDARD_GRID_GAP = 5;
export const STANDARD_IMAGE_ASPECT_RATIO = 3 / 2;

export const CLIENT_ROUTES = {
	admin: 'admin',
	category: 'category',
	shop: 'shop',
	listing: 'listing',
	shopManager: 'shop-manager',
	favorites: 'favorites',
	checkout: 'checkout',
	orderConfirmed: 'order-confirmed',
	order: 'order',
	orders: 'orders',
};

export enum StorageKey {
	SHOPPING_CART = 'shopping-cart-v2',
	PENDING_FAVORITE = 'pendingListingFavorite',
}

export enum CategoryIconCode {
	RING = 'RING',
	EARRINGS = 'EARRINGS',
	HANDBAG = 'HANDBAG',
	VASE = 'VASE',
	CHAIR = 'CHAIR',
	CANDLESTICK = 'CANDLESTICK',
}

export enum CountryCode {
	US = 'US',
	CA = 'CA',
	UK = 'UK',
	IT = 'IT',
	FR = 'FR',
	DE = 'DE',
	BE = 'BE',
	CZ = 'CZ',
	AT = 'AT',
	CH = 'CH',
	PT = 'PT',
}

export const US_STATES = [
	{ value: 'AL', label: 'Alabama' },
	{ value: 'AK', label: 'Alaska' },
	{ value: 'AZ', label: 'Arizona' },
	{ value: 'AR', label: 'Arkansas' },
	{ value: 'CA', label: 'California' },
	{ value: 'CO', label: 'Colorado' },
	{ value: 'CT', label: 'Connecticut' },
	{ value: 'DE', label: 'Delaware' },
	{ value: 'FL', label: 'Florida' },
	{ value: 'GA', label: 'Georgia' },
	{ value: 'HI', label: 'Hawaii' },
	{ value: 'ID', label: 'Idaho' },
	{ value: 'IL', label: 'Illinois' },
	{ value: 'IN', label: 'Indiana' },
	{ value: 'IA', label: 'Iowa' },
	{ value: 'KS', label: 'Kansas' },
	{ value: 'KY', label: 'Kentucky' },
	{ value: 'LA', label: 'Louisiana' },
	{ value: 'ME', label: 'Maine' },
	{ value: 'MD', label: 'Maryland' },
	{ value: 'MA', label: 'Massachusetts' },
	{ value: 'MI', label: 'Michigan' },
	{ value: 'MN', label: 'Minnesota' },
	{ value: 'MS', label: 'Mississippi' },
	{ value: 'MO', label: 'Missouri' },
	{ value: 'MT', label: 'Montana' },
	{ value: 'NE', label: 'Nebraska' },
	{ value: 'NV', label: 'Nevada' },
	{ value: 'NH', label: 'New Hampshire' },
	{ value: 'NJ', label: 'New Jersey' },
	{ value: 'NM', label: 'New Mexico' },
	{ value: 'NY', label: 'New York' },
	{ value: 'NC', label: 'North Carolina' },
	{ value: 'ND', label: 'North Dakota' },
	{ value: 'OH', label: 'Ohio' },
	{ value: 'OK', label: 'Oklahoma' },
	{ value: 'OR', label: 'Oregon' },
	{ value: 'PA', label: 'Pennsylvania' },
	{ value: 'RI', label: 'Rhode Island' },
	{ value: 'SC', label: 'South Carolina' },
	{ value: 'SD', label: 'South Dakota' },
	{ value: 'TN', label: 'Tennessee' },
	{ value: 'TX', label: 'Texas' },
	{ value: 'UT', label: 'Utah' },
	{ value: 'VT', label: 'Vermont' },
	{ value: 'VA', label: 'Virginia' },
	{ value: 'WA', label: 'Washington' },
	{ value: 'WV', label: 'West Virginia' },
	{ value: 'WI', label: 'Wisconsin' },
	{ value: 'WY', label: 'Wyoming' },
	{ value: 'DC', label: 'District of Columbia' },
];

export const countryDisplayName = {
	[CountryCode.US]: 'USA',
	[CountryCode.CA]: 'Canada',
	[CountryCode.UK]: 'United Kingdom',
	[CountryCode.IT]: 'Italy',
	[CountryCode.FR]: 'France',
	[CountryCode.DE]: 'Germany',
	[CountryCode.BE]: 'Belgium',
	[CountryCode.CZ]: 'Czech Republic',
	[CountryCode.AT]: 'Austria',
	[CountryCode.CH]: 'Switzerland',
	[CountryCode.PT]: 'Portugal',
};
