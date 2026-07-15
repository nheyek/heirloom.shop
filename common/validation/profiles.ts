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

export const validateProfileName = (
	name: string,
	existingNames: string[],
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

export type ProcessingProfileInput = Omit<
	CreateProcessingProfileBody,
	'minDays' | 'maxDays'
> & {
	existingNames: string[];
	minDays: number | string;
	maxDays: number | string;
};

export const validateProcessingProfileInput = (
	input: ProcessingProfileInput,
): FieldError[] => {
	const errors: FieldError[] = [];
	const nameError = validateProfileName(
		input.name,
		input.existingNames,
	);
	if (nameError) errors.push(nameError);
	if (!validateDayRange(input.minDays, input.maxDays)) {
		errors.push({
			field: ValidationField.Days,
			message: 'Enter a valid range (min ≤ max, both ≥ 1).',
		});
	}
	return errors;
};

export type ShippingProfileInput = Omit<
	CreateShippingProfileBody,
	'flatShippingRateCents' | 'shippingDaysMin' | 'shippingDaysMax'
> & {
	existingNames: string[];
	// Distinct from `flatShippingRateCents` being null: a null rate is only
	// a validation error if the user picked "flat rate" pricing in the
	// first place (vs. free shipping), and the wire body has no field that
	// distinguishes those two cases once a rate is absent.
	isFlatRate: boolean;
	flatShippingRateCents: number | null;
	shippingDaysMin: number | string;
	shippingDaysMax: number | string;
};

export const validateShippingProfileInput = (
	input: ShippingProfileInput,
): FieldError[] => {
	const errors: FieldError[] = [];
	const nameError = validateProfileName(
		input.name,
		input.existingNames,
	);
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
		errors.push({
			field: ValidationField.FlatRate,
			message: 'Enter a valid price.',
		});
	}

	if (!validateDayRange(input.shippingDaysMin, input.shippingDaysMax)) {
		errors.push({
			field: ValidationField.Days,
			message: 'Enter a valid range (min ≤ max, both ≥ 1).',
		});
	}

	return errors;
};

export type ReturnProfileInput = Omit<
	CreateReturnProfileBody,
	'returnWindowDays' | 'policyDescrRichText'
> & {
	existingNames: string[];
	returnWindowDays: number | string | null | undefined;
	policyDescrRichText: string | null;
};

export const validateReturnProfileInput = (
	input: ReturnProfileInput,
): FieldError[] => {
	const errors: FieldError[] = [];
	const nameError = validateProfileName(
		input.name,
		input.existingNames,
	);
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

export type PersonalizationProfileInput = Omit<
	CreatePersonalizationProfileBody,
	'costCents'
> & {
	existingNames: string[];
	costCents: number | null;
};

export const validatePersonalizationProfileInput = (
	input: PersonalizationProfileInput,
): FieldError[] => {
	const errors: FieldError[] = [];
	const nameError = validateProfileName(
		input.name,
		input.existingNames,
	);
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
