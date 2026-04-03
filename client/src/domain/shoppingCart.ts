import { ShoppingCartItem } from '@common/types/ShoppingCartItem';

export const calculateItemPrice = (
	item: ShoppingCartItem,
): number => {
	let total = item.listingData.priceCents ?? 0;

	Object.entries(item.selectedOptions).forEach(
		([variationId, optionId]) => {
			const variation = item.listingData.variations.find(
				(v) => v.id === Number(variationId),
			);

			if (!variation) {
				throw new Error(
					`Variation with ID ${variationId} not found for listing ${item.listingData.shortId}`,
				);
			}

			if (variation?.pricesVary) {
				const option = variation?.options.find(
					(o) => o.id === optionId,
				);
				if (!option) {
					throw new Error(
						`Option with ID ${optionId} not found for variation ${variationId} in listing ${item.listingData.shortId}`,
					);
				}
				total += option?.additionalPriceCents || 0;
			}
		},
	);

	return total;
};
