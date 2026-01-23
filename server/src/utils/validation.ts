type LengthValidationResult =
	| { valid: true }
	| { valid: false; message: string };

export const validateStringLength = (
	value: string,
	min: number,
	max: number,
	fieldName: string = 'Value',
): LengthValidationResult => {
	if (value.length < min) {
		return { valid: false, message: `${fieldName} must be at least ${min} characters` };
	}
	if (value.length > max) {
		return { valid: false, message: `${fieldName} must be at most ${max} characters` };
	}
	return { valid: true };
};
