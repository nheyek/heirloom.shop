// Single source of truth for every `FieldError.field` value produced by the
// validators in this module. Consumers (dialogs, useListingForm, the server
// service layer) must reference these constants rather than re-typing the
// string, so a typo/rename shows up as a compile error instead of a
// silently-unmatched error lookup.
export const ValidationField = {
	Name: 'name',
	Days: 'days',
	OriginZip: 'originZip',
	FlatRate: 'flatRate',
	WindowDays: 'windowDays',
	CustomText: 'customText',
	Cost: 'cost',
	HelperText: 'helperText',
	Title: 'title',
	Subtitle: 'subtitle',
	Category: 'category',
	Images: 'images',
	Price: 'price',
	ShippingProfile: 'shippingProfile',
	ReturnProfile: 'returnProfile',
	ProcessingProfile: 'processingProfile',
	PersonalizationProfile: 'personalizationProfile',
	Variations: 'variations',
	VariationName: 'variationName',
	VariationOptions: 'variationOptions',
	Combinations: 'combinations',
	DescrSections: 'descrSections',
	DescrSectionTitle: 'descrSectionTitle',
	DescrSectionBody: 'descrSectionBody',
} as const;

export type ValidationFieldKey =
	(typeof ValidationField)[keyof typeof ValidationField];

export type FieldError = { field: ValidationFieldKey; message: string };

export const stripHtml = (html: string): string =>
	html.replace(/<[^>]*>/g, '').trim();

export const isValidPriceCents = (
	cents: number,
	maxCents: number,
): boolean => Number.isInteger(cents) && cents > 0 && cents <= maxCents;
