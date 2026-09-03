export const LISTING_LIMITS = {
	// Structural limits
	maxVariations: 3,
	maxOptionsPerVariation: 20,
	maxDescrSections: 5,
	maxImages: 20,

	// Listing title / subtitle
	maxTitleLength: 128,
	maxSubtitleLength: 256,

	// Name lengths
	maxNameLength: 60, // variations, options, etc.
	maxProfileNameLength: 64, // processing/shipping/return profile names

	// Price bounds (in cents)
	minPriceCents: 1, // $0.01
	maxPriceCents: 99_999_99, // $99,999.99

	// Rich text character limits (stripped HTML)
	maxDescrSectionBodyChars: 5000,
	maxReturnPolicyChars: 2000,

	maxPersonalizationHelperTextLength: 256,

	maxInventory: 9_999,
};

export const SHOP_LIMITS = {
	maxTitleLength: 128,
	maxClassificationLength: 32,
	maxLocationLength: 64,

	// Rich text character limit (stripped HTML)
	maxProfileRichTextChars: 5000,
};

export const SEARCH_QUERY_LIMITS = {
	minChars: 3,
	maxChars: 48,
};

export const DELIVERY_ESTIMATE_UNAVAILABLE_TEXT =
	'Delivery estimate unavailable';

export enum ImageVariant {
	FULL = 'full',
	SMALL = 'small',
}

// Target pixel width each variant is downscaled to (never upscaled). FULL
// is unbounded since it keeps the originally uploaded size.
export const IMAGE_VARIANT_WIDTHS: Record<ImageVariant, number> = {
	[ImageVariant.FULL]: Infinity,
	[ImageVariant.SMALL]: 800,
};

// Suffix inserted before the file extension for a variant's storage key,
// e.g. "<uuid>-small.jpg". FULL has no suffix since it reuses the
// originally uploaded key.
export const imageVariantSuffix = (variant: ImageVariant): string =>
	variant === ImageVariant.FULL ? '' : `-${variant}`;

export enum OrderStatus {
	PENDING = 'PENDING',
	CONFIRMED = 'CONFIRMED',
	SHIPPED = 'SHIPPED',
}

export enum ShippingProvider {
	UPS = 'UPS',
	FEDEX = 'FedEx',
	USPS = 'USPS',
	DHL = 'DHL',
}

export enum ShopRole {
	OWNER = 'owner',
}

export enum ReturnPolicyType {
	STANDARD = 'standard',
	CUSTOM = 'custom',
	NO_RETURNS = 'no_returns',
}

export const US_STATES = [
	{ value: 'AL', label: 'Alabama' },
	{ value: 'AZ', label: 'Arizona' },
	{ value: 'AR', label: 'Arkansas' },
	{ value: 'CA', label: 'California' },
	{ value: 'CO', label: 'Colorado' },
	{ value: 'CT', label: 'Connecticut' },
	{ value: 'DE', label: 'Delaware' },
	{ value: 'FL', label: 'Florida' },
	{ value: 'GA', label: 'Georgia' },
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
] as const;

export const US_STATE_CODES = new Set<string>(
	US_STATES.map((s) => s.value),
);
