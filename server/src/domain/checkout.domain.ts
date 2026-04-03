import { CheckoutItemData } from '@common/types/CheckoutItemData';
import { OrderItemSnapshot } from '@common/types/OrderItemSnapshot';
import { CheckoutCartData } from '@server/types/CheckoutCartData';
import { ShoppingCartPreTaxTotals } from '@server/types/ShoppingCartPreTaxTotals';

export const calculateCheckoutTotals = (
	items: CheckoutItemData[],
	{ listings, variationOptions }: CheckoutCartData,
): ShoppingCartPreTaxTotals => {
	const listingByShortId = new Map(
		listings.map((l) => [l.shortId, l]),
	);
	const optionById = new Map(
		variationOptions.map((o) => [o.id, o]),
	);

	let subtotalCents = 0;
	let shippingCents = 0;

	for (const item of items) {
		const listing = listingByShortId.get(item.listingShortId);
		if (!listing) continue;

		let unitPriceCents = listing.priceCents || 0;

		for (const optionId of Object.values(item.selectedOptions)) {
			const option = optionById.get(optionId);
			if (option) {
				unitPriceCents += option.additionalPriceCents || 0;
			}
		}

		subtotalCents += unitPriceCents * item.quantity;
		shippingCents +=
			(listing.shippingProfile?.flatShippingRateCents ?? 0) *
			item.quantity;
	}

	return { subtotalCents, shippingCents };
};

export const createOrderItemSnapshots = (
	items: CheckoutItemData[],
	{ listings, variationOptions }: CheckoutCartData,
): OrderItemSnapshot[] => {
	const listingByShortId = new Map(
		listings.map((l) => [l.shortId, l]),
	);
	const optionById = new Map(
		variationOptions.map((o) => [o.id, o]),
	);

	const snapshots: OrderItemSnapshot[] = [];

	for (const item of items) {
		const listing = listingByShortId.get(item.listingShortId);
		if (!listing) continue;

		let unitPriceCents = listing.priceCents || 0;
		const variations = [];

		for (const optionId of Object.values(item.selectedOptions)) {
			const option = optionById.get(optionId);
			if (option) {
				unitPriceCents += option.additionalPriceCents || 0;
				variations.push({
					name: option.listingVariation.variationName,
					value: option.optionName,
				});
			}
		}

		snapshots.push({
			title: listing.title,
			shopName: listing.shop.title,
			imageUuid: listing.imageUuids[0] ?? null,
			unitPriceCents,
			quantity: item.quantity,
			variations,
		});
	}

	return snapshots;
};
