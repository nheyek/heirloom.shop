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

export const ABOUT_HEIRLOOM_HTML =
	'<p>Heirloom is an online store and marketplace featuring a range of products from makers that exhibit the highest level of craftsmanship.</p><p />' +
	'<h1>Background</h1>' +
	'<p>Throw-away culture is, sadly, a defining feature of the present historical moment.</p>' +
	"<p>Disillusionment is growing. People are beginning to ask questions about where their products come from, how they're made, and what they're made of.</p><p />" +
	'<h1>The Idea</h1>' +
	'<p>"They don\'t make them like they used to" is a common refrain. But while "they" may not, there are others that do. They are just often hard to find.</p>' +
	'<p>Heirloom seeks to make it easy to find these makers and purchase their work.</p><p />' +
	'<h1>The Experience</h1>' +
	'<p>The site is designed to prioritize authentic discovery and simplicity over maximizing sales. We will not send you unsolicited emails. You will never serve you ads or promoted content.</p>' +
	'<p>Orders are professionally packed and shipped within 1 business day. All orders ship free and are guaranteed against damage in transit.</p>' +
	"<p>If, for any reason, what you received doesn't meet your expectations, we'll take it back for a full refund within 30 days.</p><p />" +
	'<h1>Who We Are</h1>' +
	'<p>Heirloom was founded and developed by Nick Heyek, a Chicago-based software engineer and manufacturer.</p>' +
	"<p>Our facility is located at 3100 W Grand Ave in Chicago's Humboldt Park neighborhood.</p><p />" +
	'<h1>Get in Touch</h1>' +
	'<p>For questions, feedback, or any other reason, reach us at support@heirloom.shop.</p>';
