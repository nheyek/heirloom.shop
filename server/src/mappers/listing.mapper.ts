import {
	CartItemData,
	CombinationsData,
	ListingCardData,
	ListingPageData,
	ShopManagerListingCardData,
	VariationsData,
} from '@heirloom/common/contract';
import {
	getCombinationKey,
	isListingOutOfStock,
} from '@heirloom/common/domain/listing';
import { Listing } from '@server/entities/generated/Listing';

export const mapListingToApiResponseData = (
	listing: Listing,
): ListingCardData => ({
	id: listing.id,
	shortId: listing.shortId,
	title: listing.title,
	subtitle: listing.subtitle || '',
	categoryId: listing.category.id,
	priceCents: listing.priceCents || 0,
	countryCode: listing.shop.country?.code,
	shopId: listing.shop.id,
	shopShortId: listing.shop.shortId || '',
	shopTitle: listing.shop.title,
	imageUuids: listing.imageUuids,
	available: listing.available,
	variations: (listing.variations ?? {}) as VariationsData,
	combinations: (listing.combinations ?? {}) as CombinationsData,
});

export const mapListingToShopManagerCardData = (
	listing: Listing,
): ShopManagerListingCardData => ({
	...mapListingToApiResponseData(listing),
	inventory: listing.inventory ?? null,
	trackInventory: listing.trackInventory,
});

export const mapListingToCompleteApiResponseData = (
	listing: Listing,
): ListingPageData => {
	// Personalization is a shop-specific customization option, not a
	// fulfillment detail, so unlike processing/shipping/returns it isn't
	// gated behind directFulfillment (Heirloom-fulfilled shops still fall
	// back to HEIRLOOM_LISTING_PROFILES for those, but can still offer
	// personalization).
	const personalization = listing.personalizationProfile
		? {
				name: listing.personalizationProfile.name,
				costCents: listing.personalizationProfile.costCents,
				helperText: listing.personalizationProfile.helperText ?? null,
			}
		: undefined;

	return {
		...mapListingToApiResponseData(listing),
		directFulfillment: listing.shop.directFulfillment,
		fullDescr: listing.fullDescr,
		trackInventory: listing.trackInventory,
		outOfStock: isListingOutOfStock(
			listing.trackInventory,
			listing.inventory,
			(listing.variations ?? {}) as VariationsData,
			(listing.combinations ?? {}) as CombinationsData,
		),
		profiles: listing.shop.directFulfillment
			? {
					processing: listing.processingProfile
						? {
								minDays: listing.processingProfile.minDays,
								maxDays: listing.processingProfile.maxDays,
							}
						: undefined,
					shipping: listing.shippingProfile
						? {
								originZip: listing.shippingProfile.originZip,
								shippingDaysMin: listing.shippingProfile.shippingDaysMin,
								shippingDaysMax: listing.shippingProfile.shippingDaysMax,
								shippingRate: listing.shippingProfile.flatShippingRateCents || 0,
							}
						: undefined,
					returns: listing.returnProfile
						? {
								policyType: listing.returnProfile.policyType,
								returnWindowDays: listing.returnProfile.returnWindowDays,
								policyDescrRichText:
									listing.returnProfile.policyDescrRichText ?? null,
							}
						: undefined,
					personalization,
				}
			: personalization
				? { personalization }
				: null,
	};
};

export const mapListingToCartItemData = (
	listing: Listing,
	selectedOptionSets: Array<Record<string, string>>,
	shippingPrice: number,
	deliveryEstimate: string | null | undefined,
): CartItemData => {
	const allCombinations = (listing.combinations ?? {}) as CombinationsData;
	const neededKeys = new Set(selectedOptionSets.map(getCombinationKey));
	const combinations: CombinationsData = Object.fromEntries(
		[...neededKeys]
			.filter((key) => key in allCombinations)
			.map((key) => [key, allCombinations[key]]),
	);
	return {
		...mapListingToApiResponseData(listing),
		shippingPrice,
		deliveryEstimate,
		personalizationCostCents:
			listing.personalizationProfile?.costCents ?? null,
		personalizationName: listing.personalizationProfile?.name ?? null,
		variations: (listing.variations ?? {}) as VariationsData,
		combinations,
		trackInventory: listing.trackInventory,
	};
};
