/**
 * Formats cents as a dollar string for display
 * @param cents Price in cents
 * @returns Formatted price string (e.g., "$25.99")
 */
export const formatCentsAsDollars = (cents: number): string => {
	return `$${(cents / 100).toFixed(2)}`;
};

/**
 * Converts cents to dollars (numeric)
 * @param cents Price in cents
 * @returns Price in dollars
 */
export const centsToDollars = (cents: number): number => {
	return cents / 100;
};
