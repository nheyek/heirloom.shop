import { CheckoutItemData, CombinationsData, OrderItemDisplayData, VariationsData } from '@heirloom/common/contract';
import {
	getCombinationKey,
	HEIRLOOM_LISTING_PROFILES,
	resolveEffectiveCombinationPrice,
} from '@heirloom/common/domain/listing';
import { calculateDeliveryEstimate } from '@heirloom/common/utils/dateUtils';
import { Listing } from '@server/entities/generated/Listing';
import { CheckoutCartData } from '@server/types/CheckoutCartData';
import { ShoppingCartPreTaxTotals } from '@server/types/ShoppingCartPreTaxTotals';

// Heirloom-fulfilled listings (shop.directFulfillment === false) have no
// listing-specific processing/shipping profile of their own — fall back to
// the same standard profile the client shows on the listing page, rather
// than treating shipping cost/delivery estimate as zero/unavailable.
export const resolveShippingRateCents = (listing: Listing): number =>
	listing.shop.directFulfillment
		? (listing.shippingProfile?.flatShippingRateCents ?? 0)
		: HEIRLOOM_LISTING_PROFILES.shipping.shippingRate;

export const resolveDeliveryEstimate = (listing: Listing): string | null => {
	const processingProfile = listing.shop.directFulfillment
		? listing.processingProfile
		: HEIRLOOM_LISTING_PROFILES.processing;
	const shippingProfile = listing.shop.directFulfillment
		? listing.shippingProfile
		: HEIRLOOM_LISTING_PROFILES.shipping;

	return processingProfile && shippingProfile
		? calculateDeliveryEstimate(processingProfile, shippingProfile)
		: null;
};

const resolveUnitPrice = (
	priceCents: number,
	combinations: CombinationsData,
	variations: VariationsData,
	selectedOptions: Record<string, string>,
	personalizationCostCents: number | null | undefined,
	personalizationText: string | null | undefined,
	trackInventory: boolean,
	listingInventory: number | null | undefined,
): number => {
	const key = getCombinationKey(selectedOptions);
	const combination = combinations[key];
	const hasVariations = Object.keys(variations).length > 0;
	if (combination?.disabled) throw new Error('Selected combination is unavailable');
	if (trackInventory) {
		const relevantInventory = hasVariations
			? (combination?.inventory ?? 0)
			: (listingInventory ?? 0);
		if (relevantInventory === 0)
			throw new Error('Selected combination is unavailable');
	}
	if (personalizationText && personalizationCostCents == null) {
		throw new Error('Personalization is not available for this listing');
	}
	const basePrice = resolveEffectiveCombinationPrice(selectedOptions, combinations, variations, priceCents) ?? priceCents;
	return personalizationText && personalizationCostCents != null
		? basePrice + personalizationCostCents
		: basePrice;
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
			variations,
			item.selectedOptions,
			listing.personalizationProfile?.costCents,
			item.personalizationText,
			listing.trackInventory,
			listing.inventory,
		);

		subtotalCents += unitPriceCents * item.quantity;
		shippingCents += resolveShippingRateCents(listing) * item.quantity;
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
			variations,
			item.selectedOptions,
			listing.personalizationProfile?.costCents,
			item.personalizationText,
			listing.trackInventory,
			listing.inventory,
		);

		snapshots.push({
			title: listing.title,
			shopName: listing.shop.title,
			shopShortId: listing.shop.shortId,
			imageUuid: listing.imageUuids[0] ?? null,
			unitPriceCents,
			shippingPriceCents: resolveShippingRateCents(listing),
			quantity: item.quantity,
			estimatedDelivery: resolveDeliveryEstimate(listing),
			variations: resolveVariationDisplayNames(variations, item.selectedOptions),
			personalizationText: item.personalizationText ?? null,
			personalizationName: listing.personalizationProfile?.name ?? null,
		});
	}

	return snapshots;
};
