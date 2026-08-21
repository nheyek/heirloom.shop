import {
	CartItemData,
	OrderItemDisplayData,
} from '@heirloom/common/contract';
import {
	getCombinationKey,
	isValidCombinationSelection,
	resolveEffectiveCombinationPrice,
} from '@heirloom/common/domain/listing';

export type ShoppingCartItem = {
	listingData: CartItemData;
	selectedOptions: Record<string, string>;
	quantity: number;
	addedAt: number;
	// Existence (a non-empty string) is what indicates the personalization
	// surcharge should be applied, mirroring the listing page's checkbox.
	personalizationText?: string;
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
			item.personalizationText,
		),
		quantity: item.quantity,
		estimatedDelivery: item.listingData.deliveryEstimate ?? null,
		variations,
		personalizationText: item.personalizationText ?? null,
		personalizationName: item.listingData.personalizationName ?? null,
	};
};

export const calculateItemPrice = (
	listingData: CartItemData,
	selectedOptions: Record<string, string>,
	personalizationText?: string,
): number => {
	const basePrice =
		resolveEffectiveCombinationPrice(
			selectedOptions,
			listingData.combinations,
			listingData.variations,
			listingData.priceCents ?? 0,
		) ?? listingData.priceCents ?? 0;
	return !!personalizationText &&
		listingData.personalizationCostCents != null
		? basePrice + listingData.personalizationCostCents
		: basePrice;
};

export const isCartItemValid = (
	selectedOptions: Record<string, string>,
	listingData: CartItemData | undefined,
	personalizationText?: string | null,
): boolean => {
	if (!listingData) return false;
	if (!listingData.available) return false;
	if (personalizationText && listingData.personalizationName == null)
		return false;
	return isValidCombinationSelection(selectedOptions, listingData);
};
