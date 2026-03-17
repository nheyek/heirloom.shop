/**
 * Converts cents to dollars for display
 * @param cents Price in cents
 * @returns Price in dollars
 */
export const centsToDollars = (cents: number): number => {
	return cents / 100;
};

/**
 * Converts dollars to cents for storage
 * @param dollars Price in dollars
 * @returns Price in cents
 */
export const dollarsToCents = (dollars: number): number => {
	return Math.round(dollars * 100);
};
