import { CartItemData, OrderItemDisplayData } from '@common/contract';
import { ShoppingCartItem } from '@common/types/ShoppingCartItemData';

export const getOrderItemDisplayData = (
	item: ShoppingCartItem,
): OrderItemDisplayData => {
	const variations = Object.entries(item.selectedOptions).flatMap(
		([variationId, optionId]) => {
			const variation = item.listingData.variations.find(
				(v) => v.id === Number(variationId),
			);
			const option = variation?.options.find(
				(o) => o.id === optionId,
			);
			if (!variation || !option) return [];
			return [{ name: variation.name, value: option.name }];
		},
	);

	return {
		title: item.listingData.title,
		shopName: item.listingData.shopTitle ?? '',
		shippingPriceCents: item.listingData.shippingPrice ?? 0,
		imageUuid: item.listingData.imageUuids[0] ?? null,
		unitPriceCents: calculateItemPrice(
			item.listingData,
			item.selectedOptions,
		),
		quantity: item.quantity,
		estimatedDelivery: item.listingData.deliveryEstimate ?? null,
		variations,
	};
};

export const calculateItemPrice = (
	listingData: CartItemData,
	selectedOptions: Record<string, number>,
): number => {
	let total = listingData.priceCents ?? 0;

	Object.entries(selectedOptions).forEach(
		([variationId, optionId]) => {
			const variation = listingData.variations.find(
				(v) => v.id === Number(variationId),
			);

			if (!variation) {
				throw new Error(
					`Variation with ID ${variationId} not found for listing ${listingData.shortId}`,
				);
			}

			if (variation.pricesVary) {
				const option = variation.options.find(
					(o) => o.id === optionId,
				);
				if (!option) {
					throw new Error(
						`Option with ID ${optionId} not found for variation ${variationId} in listing ${listingData.shortId}`,
					);
				}
				total += option.additionalPriceCents || 0;
			}
		},
	);

	return total;
};
