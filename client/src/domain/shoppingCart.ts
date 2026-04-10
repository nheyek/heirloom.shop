import { CartItemData } from '@common/contract';

export const calculateItemPrice = (
	listingData: CartItemData,
	selectedOptions: Record<string, number>,
): number => {
	let total = listingData.priceCents ?? 0;

	Object.entries(selectedOptions).forEach(([variationId, optionId]) => {
		const variation = listingData.variations.find(
			(v) => v.id === Number(variationId),
		);

		if (!variation) {
			throw new Error(
				`Variation with ID ${variationId} not found for listing ${listingData.shortId}`,
			);
		}

		if (variation.pricesVary) {
			const option = variation.options.find((o) => o.id === optionId);
			if (!option) {
				throw new Error(
					`Option with ID ${optionId} not found for variation ${variationId} in listing ${listingData.shortId}`,
				);
			}
			total += option.additionalPriceCents || 0;
		}
	});

	return total;
};
