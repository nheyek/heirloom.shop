import { ShoppingCartItem } from '../types/ShoppingCartItem';

export const calculateItemPrice = (
	item: ShoppingCartItem,
): number => {
	let total = item.listingData.priceDollars;

	Object.entries(item.selectedOptions).forEach(
		([variationId, optionId]) => {
			const variation = item.listingData.variations.find(
				(v) => v.id === Number(variationId),
			);
			if (variation?.pricesVary) {
				const option = variation?.options.find(
					(o) => o.id === optionId,
				);
				total += option?.additionalPriceDollars || 0;
			}
		},
	);

	return total;
};
