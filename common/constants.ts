export const LISTING_LIMITS = {
	// Structural limits
	maxVariations: 3,
	maxOptionsPerVariation: 10,
	maxDescrSections: 5,

	// Listing title / subtitle
	maxTitleLength: 128,
	maxSubtitleLength: 256,

	// Name lengths (variations, profiles, options, etc.)
	maxNameLength: 60,

	// Price bounds (in cents)
	minPriceCents: 1,           // $0.01
	maxPriceCents: 99_999_99,   // $99,999.99

	// Rich text character limits (stripped HTML)
	maxDescrSectionBodyChars: 5000,
	maxReturnPolicyChars: 2000,
};

export const SEARCH_QUERY_LIMITS = {
	minChars: 3,
	maxChars: 48,
};

export const SHOP_ROLE = {
	OWNER: 'OWNER',
};
