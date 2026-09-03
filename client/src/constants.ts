export const NUM_TOP_LEVEL_CATEGORIES = 4;

export enum InputSize {
	Md,
	Lg,
}

export enum Layout {
	MOBILE,
	DESKTOP,
}

export const STANDARD_GRID_COLUMNS = {
	base: 1,
	sm: 2,
	md: 3,
	lg: 4,
};

export const STANDARD_GRID_GAP = 5;
export const STANDARD_IMAGE_ASPECT_RATIO = 3 / 2;
export const LISTING_IMAGE_ASPECT_RATIO = 1;

export const MAX_IMAGE_SIZE_MB = 5;

export const STANDARD_THUMBNAIL_WIDTH = 225;
export const STANDARD_THUMBNAIL_GAP = 3;

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
	IS = 'IS',
	NO = 'NO',
	JP = 'JP',
	NL = 'NL',
}

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
	[CountryCode.IS]: 'Iceland',
	[CountryCode.NO]: 'Norway',
	[CountryCode.JP]: 'Japan',
	[CountryCode.NL]: 'Netherlands',
};

export enum FulfillmentType {
	DIRECT = 'DIRECT',
	HEIRLOOM = 'HEIRLOOM',
}

export const STANDARD_RETURN_POLICY_HTML =
	'<ul><li>A free return label will be sent to the customer via email upon initiation of a return.</li><li>A refund will be issued to the original payment method within 7 days of receipt of the returned items.</li><li>Returned items must be in their original condition and packaging.</li></ul>';
