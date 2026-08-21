import { LISTING_LIMITS } from '../constants.js';
import {
	ListingDescrSection,
	ListingWriteBody,
	VariationOptionData,
} from '../contract.js';
import {
	Combinations,
	deriveCombinationsList,
	resolveEffectiveCombinationPrice,
	Variations,
} from '../domain/listing.js';
import {
	FieldError,
	isValidPriceCents,
	stripHtml,
	ValidationField,
} from './shared.js';

export const validateTitle = (title: string): FieldError | null => {
	const trimmed = title.trim();
	if (!trimmed)
		return {
			field: ValidationField.Title,
			message: 'Title is required.',
		};
	if (trimmed.length > LISTING_LIMITS.maxTitleLength) {
		return {
			field: ValidationField.Title,
			message: `Title must be ${LISTING_LIMITS.maxTitleLength} characters or fewer.`,
		};
	}
	return null;
};

export const validateSubtitle = (
	subtitle: string | null,
): FieldError | null => {
	const trimmed = (subtitle ?? '').trim();
	if (trimmed.length > LISTING_LIMITS.maxSubtitleLength) {
		return {
			field: ValidationField.Subtitle,
			message: `Subtitle must be ${LISTING_LIMITS.maxSubtitleLength} characters or fewer.`,
		};
	}
	return null;
};

export const validateInventory = (
	trackInventory: boolean,
	inventory: number | null | undefined,
): FieldError | null => {
	if (!trackInventory) return null;
	if (!isValidInventoryValue(inventory)) {
		return {
			field: ValidationField.Inventory,
			message: `Must be a whole number between 0 and ${LISTING_LIMITS.maxInventory.toLocaleString()}.`,
		};
	}
	return null;
};

const UUID_RE =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const validateImageUuids = (
	imageUuids: string[],
): FieldError | null => {
	if (imageUuids.length === 0) {
		return {
			field: ValidationField.Images,
			message: 'At least one image is required.',
		};
	}
	if (imageUuids.length > LISTING_LIMITS.maxImages) {
		return {
			field: ValidationField.Images,
			message: `A listing can have at most ${LISTING_LIMITS.maxImages} images.`,
		};
	}
	if (imageUuids.some((id) => !UUID_RE.test(id))) {
		return {
			field: ValidationField.Images,
			message: 'One or more images are invalid.',
		};
	}
	return null;
};

export type VariationOptionEntryInput = Pick<
	VariationOptionData,
	'name' | 'priceCents'
>;

export type VariationEntryInput = {
	name: string;
	options: VariationOptionEntryInput[];
};

export const validateVariationEntry = (
	variation: VariationEntryInput,
	existingNames: string[],
): FieldError[] => {
	const errors: FieldError[] = [];

	const trimmedName = variation.name.trim();
	if (!trimmedName) {
		errors.push({
			field: ValidationField.VariationName,
			message: 'Name is required.',
		});
	} else if (trimmedName.length > LISTING_LIMITS.maxNameLength) {
		errors.push({
			field: ValidationField.VariationName,
			message: `Name must be ${LISTING_LIMITS.maxNameLength} characters or fewer.`,
		});
	} else if (
		existingNames.some(
			(n) => n.toLowerCase() === trimmedName.toLowerCase(),
		)
	) {
		errors.push({
			field: ValidationField.VariationName,
			message: 'A variation with this name already exists.',
		});
	}

	const trimmedOptions = variation.options.map((o) =>
		o.name.trim(),
	);
	const lowered = trimmedOptions.map((n) => n.toLowerCase());
	if (variation.options.length < 2) {
		errors.push({
			field: ValidationField.VariationOptions,
			message: 'At least two options are required.',
		});
	} else if (
		variation.options.length >
		LISTING_LIMITS.maxOptionsPerVariation
	) {
		errors.push({
			field: ValidationField.VariationOptions,
			message: `A variation can have at most ${LISTING_LIMITS.maxOptionsPerVariation} options.`,
		});
	} else if (trimmedOptions.some((n) => !n)) {
		errors.push({
			field: ValidationField.VariationOptions,
			message: 'All options must have a name.',
		});
	} else if (
		trimmedOptions.some(
			(n) => n.length > LISTING_LIMITS.maxNameLength,
		)
	) {
		errors.push({
			field: ValidationField.VariationOptions,
			message: `Option names must be ${LISTING_LIMITS.maxNameLength} characters or fewer.`,
		});
	} else if (new Set(lowered).size !== lowered.length) {
		errors.push({
			field: ValidationField.VariationOptions,
			message: 'Option names must be unique.',
		});
	}

	if (
		variation.options.some(
			(o) =>
				o.priceCents != null &&
				!isValidPriceCents(
					o.priceCents,
					LISTING_LIMITS.maxPriceCents,
				),
		)
	) {
		errors.push({
			field: ValidationField.VariationOptions,
			message: 'Option prices must be valid.',
		});
	}

	return errors;
};

// Mirrors the duplicate/length/required predicates in validateVariationEntry,
// but returns the offending indices instead of messages so the option-entry
// UI can highlight exactly the rows at fault.
export const findInvalidVariationOptionIndices = (
	options: VariationOptionEntryInput[],
): number[] => {
	const trimmedOptions = options.map((o) => o.name.trim());
	const lowered = trimmedOptions.map((n) => n.toLowerCase());
	const invalid = new Set<number>();
	trimmedOptions.forEach((name, i) => {
		if (!name || name.length > LISTING_LIMITS.maxNameLength)
			invalid.add(i);
	});
	lowered.forEach((name, i) => {
		if (lowered.indexOf(name) !== lowered.lastIndexOf(name))
			invalid.add(i);
	});
	return [...invalid];
};

export const validateDescrSectionEntry = (
	section: ListingDescrSection,
	existingTitles: string[],
): FieldError[] => {
	const errors: FieldError[] = [];

	const trimmedTitle = section.title.trim();
	if (!trimmedTitle) {
		errors.push({
			field: ValidationField.DescrSectionTitle,
			message: 'Title is required.',
		});
	} else if (trimmedTitle.length > LISTING_LIMITS.maxNameLength) {
		errors.push({
			field: ValidationField.DescrSectionTitle,
			message: `Title must be ${LISTING_LIMITS.maxNameLength} characters or fewer.`,
		});
	} else if (
		existingTitles.some((t) => t.trim() === trimmedTitle)
	) {
		errors.push({
			field: ValidationField.DescrSectionTitle,
			message: 'A section with this title already exists.',
		});
	}

	const strippedBody = stripHtml(section.richText);
	if (!strippedBody) {
		errors.push({
			field: ValidationField.DescrSectionBody,
			message: 'Body is required.',
		});
	} else if (
		strippedBody.length > LISTING_LIMITS.maxDescrSectionBodyChars
	) {
		errors.push({
			field: ValidationField.DescrSectionBody,
			message: `Body must be ${LISTING_LIMITS.maxDescrSectionBodyChars.toLocaleString()} characters or fewer.`,
		});
	}

	return errors;
};

const isValidInventoryValue = (
	inventory: number | null | undefined,
): boolean =>
	inventory != null &&
	Number.isInteger(inventory) &&
	inventory >= 0 &&
	inventory <= LISTING_LIMITS.maxInventory;

export const findInvalidCombinations = (
	variations: Variations,
	combinations: Combinations,
	basePriceCents: number | null,
	trackInventory: boolean,
): {
	hasActive: boolean;
	missingPriceKeys: string[];
	missingInventoryKeys: string[];
} => {
	const allCombinations = deriveCombinationsList(variations);
	const pricesVary = Object.values(variations).some(
		(v) => v.pricesVary,
	);
	let hasActive = allCombinations.length === 0;
	const missingPriceKeys: string[] = [];
	const missingInventoryKeys: string[] = [];

	for (const { key, optionMap } of allCombinations) {
		const entry = combinations[key];
		if (entry?.disabled) continue;
		hasActive = true;
		if (pricesVary) {
			const effectivePrice = resolveEffectiveCombinationPrice(
				optionMap,
				combinations,
				variations,
				basePriceCents,
			);
			if (!(effectivePrice && effectivePrice > 0))
				missingPriceKeys.push(key);
		}
		if (
			trackInventory &&
			!isValidInventoryValue(entry?.inventory)
		)
			missingInventoryKeys.push(key);
	}

	return { hasActive, missingPriceKeys, missingInventoryKeys };
};

// Derived from the wire body type rather than redeclared: title, subtitle,
// imageUuids, fullDescr, variations, combinations, inventory, and
// trackInventory all flow straight from ListingWriteBody.
// `personalizationProfileId` is dropped entirely — it has no "required" rule
// (personalization is always optional) and is checked for existence
// directly against the DB by the caller, not through this shared validator.
// The remaining fields below are widened because validation has to accept
// in-progress (not-yet-valid) form state that the wire type deliberately
// disallows — e.g. a price the user hasn't entered yet, or a profile id
// still held as the `<select>`'s string value rather than the number the
// API expects.
export type ListingFieldsInput = Omit<
	ListingWriteBody,
	| 'categoryId'
	| 'priceCents'
	| 'shippingProfileId'
	| 'returnProfileId'
	| 'processingProfileId'
	| 'personalizationProfileId'
> & {
	categoryId: string | null;
	priceCents: number | null;
	shippingProfileId: number | string | null;
	returnProfileId: number | string | null;
	processingProfileId: number | string | null;
};

export type ListingFieldsOptions = { directFulfillment: boolean };

export const validateListingFields = (
	input: ListingFieldsInput,
	options: ListingFieldsOptions,
): FieldError[] => {
	const errors: FieldError[] = [];

	const titleError = validateTitle(input.title);
	if (titleError) errors.push(titleError);

	const subtitleError = validateSubtitle(input.subtitle);
	if (subtitleError) errors.push(subtitleError);

	if (!input.categoryId) {
		errors.push({
			field: ValidationField.Category,
			message: 'Category is required.',
		});
	}

	if (
		options.directFulfillment &&
		input.shippingProfileId == null
	) {
		errors.push({
			field: ValidationField.ShippingProfile,
			message: 'Profile is required.',
		});
	}
	if (options.directFulfillment && input.returnProfileId == null) {
		errors.push({
			field: ValidationField.ReturnProfile,
			message: 'Profile is required.',
		});
	}
	if (
		options.directFulfillment &&
		input.processingProfileId == null
	) {
		errors.push({
			field: ValidationField.ProcessingProfile,
			message: 'Profile is required.',
		});
	}

	const imageError = validateImageUuids(input.imageUuids);
	if (imageError) errors.push(imageError);

	const derivedCombinations = deriveCombinationsList(
		input.variations,
	);
	// Inventory is tracked per-combination once variations exist (see the
	// combinations table below), so the single listing-level value isn't
	// used or validated in that case.
	if (derivedCombinations.length === 0) {
		const inventoryError = validateInventory(
			input.trackInventory,
			input.inventory,
		);
		if (inventoryError) errors.push(inventoryError);
	}

	const variationEntries = Object.values(input.variations);
	const pricesVary = variationEntries.some((v) => v.pricesVary);

	if (!pricesVary) {
		if (
			input.priceCents == null ||
			!isValidPriceCents(
				input.priceCents,
				LISTING_LIMITS.maxPriceCents,
			)
		) {
			errors.push({
				field: ValidationField.Price,
				message: 'Price is required.',
			});
		}
	}

	if (variationEntries.length > LISTING_LIMITS.maxVariations) {
		errors.push({
			field: ValidationField.Variations,
			message: `A listing can have at most ${LISTING_LIMITS.maxVariations} variations.`,
		});
	}

	const variationNames = variationEntries.map((v) => v.name.trim());
	variationEntries.forEach((variation, i) => {
		const siblingNames = variationNames.filter((_, j) => j !== i);
		errors.push(
			...validateVariationEntry(
				{
					name: variation.name,
					options: Object.values(variation.options).map(
						(o) => ({
							name: o.name,
							priceCents: o.priceCents,
						}),
					),
				},
				siblingNames,
			),
		);
	});

	const { hasActive, missingPriceKeys, missingInventoryKeys } =
		findInvalidCombinations(
			input.variations,
			input.combinations,
			input.priceCents,
			input.trackInventory,
		);
	if (derivedCombinations.length > 0 && !hasActive) {
		errors.push({
			field: ValidationField.Combinations,
			message: 'At least one combination must be active.',
		});
	} else if (missingPriceKeys.length > 0) {
		errors.push({
			field: ValidationField.Combinations,
			message: 'Price is required for every combination.',
		});
	} else if (missingInventoryKeys.length > 0) {
		errors.push({
			field: ValidationField.Combinations,
			message: 'Inventory is required for every combination.',
		});
	}

	const sections = input.fullDescr ?? [];
	if (sections.length > LISTING_LIMITS.maxDescrSections) {
		errors.push({
			field: ValidationField.DescrSections,
			message: `A listing can have at most ${LISTING_LIMITS.maxDescrSections} description sections.`,
		});
	}
	const sectionTitles = sections.map((s) => s.title.trim());
	sections.forEach((section, i) => {
		const siblingTitles = sectionTitles.filter((_, j) => j !== i);
		errors.push(
			...validateDescrSectionEntry(section, siblingTitles),
		);
	});

	return errors;
};
