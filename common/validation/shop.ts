import { SHOP_LIMITS } from '../constants.js';
import {
	FieldError,
	stripHtml,
	ValidationField,
} from './shared.js';

export const validateShopTitle = (title: string): FieldError | null => {
	const trimmed = title.trim();
	if (!trimmed)
		return {
			field: ValidationField.Title,
			message: 'Shop name is required.',
		};
	if (trimmed.length > SHOP_LIMITS.maxTitleLength) {
		return {
			field: ValidationField.Title,
			message: `Shop name must be ${SHOP_LIMITS.maxTitleLength} characters or fewer.`,
		};
	}
	return null;
};

export const validateClassification = (
	classification: string,
): FieldError | null => {
	const trimmed = classification.trim();
	if (!trimmed)
		return {
			field: ValidationField.Classification,
			message: 'Classification is required.',
		};
	if (trimmed.length > SHOP_LIMITS.maxClassificationLength) {
		return {
			field: ValidationField.Classification,
			message: `Classification must be ${SHOP_LIMITS.maxClassificationLength} characters or fewer.`,
		};
	}
	return null;
};

export const validateLocation = (
	location: string,
): FieldError | null => {
	const trimmed = location.trim();
	if (!trimmed)
		return {
			field: ValidationField.Location,
			message: 'Location is required.',
		};
	if (trimmed.length > SHOP_LIMITS.maxLocationLength) {
		return {
			field: ValidationField.Location,
			message: `Location must be ${SHOP_LIMITS.maxLocationLength} characters or fewer.`,
		};
	}
	return null;
};

// profile_rich_text is an unbounded `text` column, so this can never protect
// the DB the way the other checks in this file do — it exists purely to
// keep the "About" section from growing unboundedly, matching the cap the
// listing form puts on its own rich text sections (maxDescrSectionBodyChars).
export const validateProfileRichText = (
	profileRichText: string | null | undefined,
): FieldError | null => {
	const stripped = stripHtml(profileRichText ?? '');
	if (stripped.length > SHOP_LIMITS.maxProfileRichTextChars) {
		return {
			field: ValidationField.ProfileRichText,
			message: `About text must be ${SHOP_LIMITS.maxProfileRichTextChars.toLocaleString()} characters or fewer.`,
		};
	}
	return null;
};

export type ShopFieldsInput = {
	title: string;
	classification: string;
	location: string;
};

// Required/length only, for title/classification/location — the fields
// present on both create and update. profileRichText is validated
// separately via validateProfileRichText since it's only ever set on
// update (the create flow has no About field).
export const validateShopFields = (
	input: ShopFieldsInput,
): FieldError[] => {
	const errors: FieldError[] = [];

	const titleError = validateShopTitle(input.title);
	if (titleError) errors.push(titleError);

	const classificationError = validateClassification(
		input.classification,
	);
	if (classificationError) errors.push(classificationError);

	const locationError = validateLocation(input.location);
	if (locationError) errors.push(locationError);

	return errors;
};
