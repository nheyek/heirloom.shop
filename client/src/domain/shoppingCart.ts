import {
	CartItemData,
	OrderItemDisplayData,
} from '@heirloom/common/contract';
import { getCombinationKey, resolveEffectiveCombinationPrice } from '@heirloom/common/domain/listing';

export type ShoppingCartItem = {
	listingData: CartItemData;
	selectedOptions: Record<string, string>;
	quantity: number;
	addedAt: number;
};

export const getOrderItemDisplayData = (
	item: ShoppingCartItem,
): OrderItemDisplayData => {
	const variations = Object.entries(item.selectedOptions).flatMap(
		([varId, optId]) => {
			const variation = item.listingData.variations[varId];
			if (!variation) return [];
			const option = variation.options[optId];
			if (!option) return [];
			return [{ name: variation.name, value: option.name }];
		},
	);

	return {
		title: item.listingData.title,
		shopName: item.listingData.shopTitle ?? '',
		shopShortId: item.listingData.shopShortId,
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
	selectedOptions: Record<string, string>,
): number =>
	resolveEffectiveCombinationPrice(
		selectedOptions,
		listingData.combinations,
		listingData.variations,
		listingData.priceCents ?? 0,
	) ?? listingData.priceCents ?? 0;
