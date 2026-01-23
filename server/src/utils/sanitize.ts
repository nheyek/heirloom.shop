/**
 * Removes control characters (including null bytes) and normalizes whitespace.
 */
export const sanitizeInputString = (input: string): string => {
	return input
		.replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
		.replace(/\s+/g, ' ') // Normalize whitespace
		.trim();
};
