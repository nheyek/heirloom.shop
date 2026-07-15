export const NUM_TOP_LEVEL_CATEGORIES = 4;

export enum InputSize {
	Md,
	Lg,
}

export enum Layout {
	COMPACT,
	STANDARD,
}

export const STANDARD_GRID_COLUMNS = {
	base: 1,
	sm: 2,
	md: 3,
	lg: 4,
	xl: 5,
};

export const STANDARD_GRID_GAP = 5;
export const STANDARD_IMAGE_ASPECT_RATIO = 3 / 2;

export const MAX_IMAGE_SIZE_MB = 5;

export const THUMBNAIL_WIDTH = 225;
export const THUMBNAIL_GAP = 3;

export const CLIENT_ROUTES = {
	admin: 'admin',
	category: 'category',
	shop: 'shop',
	listing: 'listing',
	favorites: 'favorites',
	checkout: 'checkout',
	orderConfirmed: 'order-confirmed',
	order: 'order',
	orders: 'orders',
	shops: 'shops',
	analytics: 'analytics',
	manage: 'manage',
	info: 'info',
	listings: 'listings',
	messages: 'messages',
	new: 'new',
	settings: 'settings',
};

export enum StorageKey {
	SHOPPING_CART = 'shopping-cart-v2',
	PENDING_FAVORITE = 'pendingListingFavorite',
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
	DK = 'DK',
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
	[CountryCode.DK]: 'Denmark',
};

export enum FulfillmentType {
	DIRECT = 'DIRECT',
	HEIRLOOM = 'HEIRLOOM',
}

export const STANDARD_RETURN_POLICY_HTML =
	'<ul><li>Customer is responsible for return shipping costs.</li><li>Refunds applied to the original payment method within 7 days of return delivery.</li><li>Exchanges can be discussed with the seller on a case-by-case basis.</li></ul>';
