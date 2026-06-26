import { CheckoutItemData, CombinationsData, OrderItemDisplayData, VariationsData } from '@heirloom/common/contract';
import { getCombinationKey } from '@heirloom/common/domain/listing';
import { calculateDeliveryEstimate } from '@heirloom/common/utils';
import { CheckoutCartData } from '@server/types/CheckoutCartData';
import { ShoppingCartPreTaxTotals } from '@server/types/ShoppingCartPreTaxTotals';

const resolveUnitPrice = (
	priceCents: number,
	combinations: CombinationsData,
	selectedOptions: Record<string, string>,
): number => {
	const key = getCombinationKey(selectedOptions);
	const combination = combinations[key];
	if (combination?.disabled) throw new Error('Selected combination is unavailable');
	return combination?.priceCents ?? priceCents;
};

const resolveVariationDisplayNames = (
	variations: VariationsData,
	selectedOptions: Record<string, string>,
): Array<{ name: string; value: string }> =>
	Object.entries(selectedOptions).map(([varId, optId]) => {
		const variation = variations[varId];
		if (!variation) throw new Error(`Invalid variation ID: ${varId}`);
		const option = variation.options[optId];
		if (!option) throw new Error(`Invalid option ID: ${optId} for variation ${varId}`);
		return { name: variation.name, value: option.name };
	});

export const calculateCheckoutTotals = (
	items: CheckoutItemData[],
	{ listings }: CheckoutCartData,
): ShoppingCartPreTaxTotals => {
	const listingByShortId = new Map(listings.map((l) => [l.shortId, l]));

	let subtotalCents = 0;
	let shippingCents = 0;

	for (const item of items) {
		const listing = listingByShortId.get(item.listingShortId);
		if (!listing) continue;

		const combinations = (listing.combinations ?? {}) as CombinationsData;
		const variations = (listing.variations ?? {}) as VariationsData;
		resolveVariationDisplayNames(variations, item.selectedOptions);
		const unitPriceCents = resolveUnitPrice(
			listing.priceCents || 0,
			combinations,
			item.selectedOptions,
		);

		subtotalCents += unitPriceCents * item.quantity;
		shippingCents +=
			(listing.shippingProfile?.flatShippingRateCents ?? 0) * item.quantity;
	}

	return { subtotalCents, shippingCents };
};

export const createOrderItemSnapshots = (
	items: CheckoutItemData[],
	{ listings }: CheckoutCartData,
): OrderItemDisplayData[] => {
	const listingByShortId = new Map(listings.map((l) => [l.shortId, l]));
	const snapshots: OrderItemDisplayData[] = [];

	for (const item of items) {
		const listing = listingByShortId.get(item.listingShortId);
		if (!listing) continue;

		const combinations = (listing.combinations ?? {}) as CombinationsData;
		const variations = (listing.variations ?? {}) as VariationsData;

		const unitPriceCents = resolveUnitPrice(
			listing.priceCents || 0,
			combinations,
			item.selectedOptions,
		);

		snapshots.push({
			title: listing.title,
			shopName: listing.shop.title,
			shopShortId: listing.shop.shortId,
			imageUuid: listing.imageUuids[0] ?? null,
			unitPriceCents,
			shippingPriceCents: listing.shippingProfile?.flatShippingRateCents ?? 0,
			quantity: item.quantity,
			estimatedDelivery: calculateDeliveryEstimate(
				listing.processingProfile?.minDays ?? 0,
				listing.processingProfile?.maxDays ?? 0,
				listing.shippingProfile
					? {
							shipTimeDaysMin: listing.shippingProfile.shippingDaysMin ?? 0,
							shipTimeDaysMax: listing.shippingProfile.shippingDaysMax ?? 0,
						}
					: undefined,
			),
			variations: resolveVariationDisplayNames(variations, item.selectedOptions),
		});
	}

	return snapshots;
};
