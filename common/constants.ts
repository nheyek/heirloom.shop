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

export enum ImageVariant {
	FULL = 'full',
	SMALL = 'small',
	THUMB = 'thumb',
}

// Target pixel width each variant is downscaled to (never upscaled). FULL
// is unbounded since it keeps the originally uploaded size.
export const IMAGE_VARIANT_WIDTHS: Record<ImageVariant, number> = {
	[ImageVariant.FULL]: Infinity,
	[ImageVariant.SMALL]: 500,
	[ImageVariant.THUMB]: 200,
};

// Suffix inserted before the file extension for a variant's storage key,
// e.g. "<uuid>-small.jpg". FULL has no suffix since it reuses the
// originally uploaded key.
export const imageVariantSuffix = (variant: ImageVariant): string =>
	variant === ImageVariant.FULL ? '' : `-${variant}`;

export enum OrderStatus {
	PENDING = 'PENDING',
	PAYMENT_SUCCEEDED = 'PAYMENT_SUCCEEDED',
}

export enum ShopRole {
	OWNER = 'owner',
}

export enum ReturnPolicyType {
	STANDARD = 'standard',
	CUSTOM = 'custom',
	NO_RETURNS = 'no_returns',
}
