export const NUM_TOP_LEVEL_CATEGORIES = 4;

export enum InputSize {
	Md,
	Lg,
}

export enum Layout {
	MOBILE,
	DESKTOP,
}

export const STANDARD_GRID_GAP = 5;
export const CARD_WIDTH = 300;
export const FIELD_ERROR_COLOR = '#df1b41';
export const SANS_FONT_FAMILY = 'Roboto';
export const NAVBAR_HEIGHT = 65;

const CARD_GRID_MAX_COLUMNS = 5;

export const CARD_GRID_COLUMN_COUNTS = Array.from(
	{ length: CARD_GRID_MAX_COLUMNS - 1 },
	(_, i) => i + 2,
);

export const cardGridBreakpointKey = (
	columns: number,
	hasSidebar: boolean,
) => `cardCols${columns}${hasSidebar ? '_sb' : ''}`;

const cardGridColumnsFor = (hasSidebar: boolean) => ({
	base: 1,
	...Object.fromEntries(
		CARD_GRID_COLUMN_COUNTS.map((columns) => [
			cardGridBreakpointKey(columns, hasSidebar),
			columns,
		]),
	),
});

export const CARD_GRID_COLUMNS = cardGridColumnsFor(false);
export const SIDEBAR_CARD_GRID_COLUMNS = cardGridColumnsFor(true);
export const GRID_CONTENT_MAX_WIDTH = 1600;
export const LISTING_GRID_PAGE_SIZE = 20;
export const LISTING_FORM_FIELD_GAP = 7;
export const FORM_LABEL_GAP = 2.5;
export const LISTING_CONTENT_MAX_WIDTH = 1200;
export const LISTING_PAGE_PADDING = 5;
export const LISTING_COLUMN_GAP_MOBILE = 5;
export const LISTING_COLUMN_GAP_DESKTOP = 10;
export const LISTING_PURCHASE_COLUMN_WIDTH = 375;
export const LISTING_VARIATION_GAP = 5;
export const GRID_PAGE_PADDING_Y = 5;
export const SECTION_TITLE_GAP = 3;
export const SINGLE_LINE_HEIGHT = 1.1;
export const MULTI_LINE_HEIGHT = 1.25;
export const STANDARD_IMAGE_ASPECT_RATIO = 3 / 2;
export const LISTING_IMAGE_ASPECT_RATIO = 1;
export const LISTING_CARD_BODY_HEIGHT = 150;
export const LISTING_CARD_SHOP_TITLE_HEIGHT = 25;
export const SHOP_CARD_BODY_HEIGHT = 110;
export const ORDER_ITEM_CARD_BODY_HEIGHT = 155;

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

export const COUNTRY_DISPLAY_NAME = {
	[CountryCode.US]: 'USA',
	[CountryCode.CA]: 'Canada',
	[CountryCode.UK]: 'UK',
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

export enum InfoPageKey {
	ABOUT = 'ABOUT',
	SHIPPING_RETURNS = 'SHIPPING_RETURNS',
	PRIVACY = 'PRIVACY',
	TERMS_OF_SERVICE = 'TERMS_OF_SERVICE',
}
