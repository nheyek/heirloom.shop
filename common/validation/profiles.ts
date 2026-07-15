import { LISTING_LIMITS, ReturnPolicyType } from '../constants.js';
import {
	CreatePersonalizationProfileBody,
	CreateProcessingProfileBody,
	CreateReturnProfileBody,
	CreateShippingProfileBody,
} from '../contract.js';
import {
	FieldError,
	isValidPriceCents,
	stripHtml,
	ValidationField,
} from './shared.js';

// Required/length only — no uniqueness, since that needs a list of the
// shop's other profile names that only the caller has. The server checks
// uniqueness via the DB's unique constraint (see DuplicateProfileNameError
// in shopManager.service.ts) rather than this check, so it calls this
// directly; the client calls `validateProfileNameUniqueness` too, for
// immediate feedback before it ever hits the server.
export const validateProfileNameFields = (
	name: string,
): FieldError | null => {
	const trimmed = name.trim();
	if (!trimmed)
		return { field: ValidationField.Name, message: 'Name is required.' };
	if (trimmed.length > LISTING_LIMITS.maxProfileNameLength) {
		return {
			field: ValidationField.Name,
			message: `Name must be ${LISTING_LIMITS.maxProfileNameLength} characters or fewer.`,
		};
	}
	return null;
};

export const validateProfileNameUniqueness = (
	name: string,
	existingNames: string[],
): FieldError | null => {
	const trimmed = name.trim();
	if (
		existingNames.some(
			(n) => n.toLowerCase() === trimmed.toLowerCase(),
		)
	) {
		return {
			field: ValidationField.Name,
			message: 'A profile with this name already exists.',
		};
	}
	return null;
};

export const validateDayRange = (
	minDays: number | string,
	maxDays: number | string,
): { min: number; max: number } | null => {
	const min =
		typeof minDays === 'number' ? minDays : parseInt(minDays, 10);
	const max =
		typeof maxDays === 'number' ? maxDays : parseInt(maxDays, 10);
	if (
		!Number.isInteger(min) ||
		!Number.isInteger(max) ||
		min < 1 ||
		max < min
	)
		return null;
	return { min, max };
};

export type ProcessingProfileFieldsInput = Omit<
	CreateProcessingProfileBody,
	'minDays' | 'maxDays'
> & {
	minDays: number | string;
	maxDays: number | string;
};

// Called directly by the server (no existingNames — see the comment on
// validateProfileNameFields).
export const validateProcessingProfileFields = (
	input: ProcessingProfileFieldsInput,
): FieldError[] => {
	const errors: FieldError[] = [];
	const nameError = validateProfileNameFields(input.name);
	if (nameError) errors.push(nameError);
	if (!validateDayRange(input.minDays, input.maxDays)) {
		errors.push({
			field: ValidationField.Days,
			message: 'Enter a valid range (min ≤ max, both ≥ 1).',
		});
	}
	return errors;
};

export type ProcessingProfileInput = ProcessingProfileFieldsInput & {
	existingNames: string[];
};

// Called by the client, which has the shop's existing profile names loaded
// in memory and can surface a duplicate-name error immediately.
export const validateProcessingProfileInput = (
	input: ProcessingProfileInput,
): FieldError[] => {
	const errors = validateProcessingProfileFields(input);
	const uniquenessError = validateProfileNameUniqueness(
		input.name,
		input.existingNames,
	);
	if (uniquenessError) errors.push(uniquenessError);
	return errors;
};

export type ShippingProfileFieldsInput = Omit<
	CreateShippingProfileBody,
	'shippingDaysMin' | 'shippingDaysMax'
> & {
	// Distinct from `flatShippingRateCents` being null: a null rate is only
	// a validation error if the user picked "flat rate" pricing in the
	// first place (vs. free shipping), and the wire body has no field that
	// distinguishes those two cases once a rate is absent.
	isFlatRate: boolean;
	shippingDaysMin: number | string;
	shippingDaysMax: number | string;
};

export const validateShippingProfileFields = (
	input: ShippingProfileFieldsInput,
): FieldError[] => {
	const errors: FieldError[] = [];
	const nameError = validateProfileNameFields(input.name);
	if (nameError) errors.push(nameError);

	if (!/^\d{5}$/.test(input.originZip.trim())) {
		errors.push({
			field: ValidationField.OriginZip,
			message: 'Enter a valid 5-digit zip code.',
		});
	}

	if (
		input.isFlatRate &&
		(input.flatShippingRateCents == null ||
			!isValidPriceCents(
				input.flatShippingRateCents,
				LISTING_LIMITS.maxPriceCents,
			))
	) {
		errors.push({ field: ValidationField.FlatRate, message: 'Enter a valid price.' });
	}

	if (!validateDayRange(input.shippingDaysMin, input.shippingDaysMax)) {
		errors.push({
			field: ValidationField.Days,
			message: 'Enter a valid range (min ≤ max, both ≥ 1).',
		});
	}

	return errors;
};

export type ShippingProfileInput = ShippingProfileFieldsInput & {
	existingNames: string[];
};

export const validateShippingProfileInput = (
	input: ShippingProfileInput,
): FieldError[] => {
	const errors = validateShippingProfileFields(input);
	const uniquenessError = validateProfileNameUniqueness(
		input.name,
		input.existingNames,
	);
	if (uniquenessError) errors.push(uniquenessError);
	return errors;
};

export type ReturnProfileFieldsInput = Omit<
	CreateReturnProfileBody,
	'returnWindowDays'
> & {
	returnWindowDays: number | string | null;
};

export const validateReturnProfileFields = (
	input: ReturnProfileFieldsInput,
): FieldError[] => {
	const errors: FieldError[] = [];
	const nameError = validateProfileNameFields(input.name);
	if (nameError) errors.push(nameError);

	if (input.policyType !== ReturnPolicyType.NO_RETURNS) {
		const days =
			typeof input.returnWindowDays === 'number'
				? input.returnWindowDays
				: parseInt(String(input.returnWindowDays ?? ''), 10);
		if (!Number.isInteger(days) || days < 1) {
			errors.push({
				field: ValidationField.WindowDays,
				message: 'Window is required.',
			});
		}
	}

	if (input.policyType === ReturnPolicyType.CUSTOM) {
		const stripped = stripHtml(input.policyDescrRichText ?? '');
		if (!stripped) {
			errors.push({
				field: ValidationField.CustomText,
				message: 'Policy details are required.',
			});
		} else if (
			stripped.length > LISTING_LIMITS.maxReturnPolicyChars
		) {
			errors.push({
				field: ValidationField.CustomText,
				message: `Policy must be ${LISTING_LIMITS.maxReturnPolicyChars.toLocaleString()} characters or fewer.`,
			});
		}
	}

	return errors;
};

export type ReturnProfileInput = ReturnProfileFieldsInput & {
	existingNames: string[];
};

export const validateReturnProfileInput = (
	input: ReturnProfileInput,
): FieldError[] => {
	const errors = validateReturnProfileFields(input);
	const uniquenessError = validateProfileNameUniqueness(
		input.name,
		input.existingNames,
	);
	if (uniquenessError) errors.push(uniquenessError);
	return errors;
};

export type PersonalizationProfileFieldsInput = Omit<
	CreatePersonalizationProfileBody,
	'costCents'
> & {
	costCents: number | null;
};

export const validatePersonalizationProfileFields = (
	input: PersonalizationProfileFieldsInput,
): FieldError[] => {
	const errors: FieldError[] = [];
	const nameError = validateProfileNameFields(input.name);
	if (nameError) errors.push(nameError);

	if (
		input.costCents == null ||
		!isValidPriceCents(input.costCents, LISTING_LIMITS.maxPriceCents)
	) {
		errors.push({
			field: ValidationField.Cost,
			message: 'Cost is required.',
		});
	}

	const trimmedHelperText = (input.helperText ?? '').trim();
	if (
		trimmedHelperText.length >
		LISTING_LIMITS.maxPersonalizationHelperTextLength
	) {
		errors.push({
			field: ValidationField.HelperText,
			message: `Helper text must be ${LISTING_LIMITS.maxPersonalizationHelperTextLength} characters or fewer.`,
		});
	}

	return errors;
};

export type PersonalizationProfileInput = PersonalizationProfileFieldsInput & {
	existingNames: string[];
};

export const validatePersonalizationProfileInput = (
	input: PersonalizationProfileInput,
): FieldError[] => {
	const errors = validatePersonalizationProfileFields(input);
	const uniquenessError = validateProfileNameUniqueness(
		input.name,
		input.existingNames,
	);
	if (uniquenessError) errors.push(uniquenessError);
	return errors;
};
