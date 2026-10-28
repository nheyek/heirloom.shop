import {
	CartItemData,
	CombinationsData,
	ListingCardData,
	ListingCollectionData,
	ListingPageData,
	ShopManagerListingCardData,
	VariationImagesData,
	VariationsData,
} from '@heirloom/common/contract';
import {
	getCombinationKey,
	getDefaultHeroImageUuid,
	getListingBasePrice,
	isListingOutOfStock,
	summarizeVariations,
} from '@heirloom/common/domain/listing';
import { Listing } from '@server/entities/generated/Listing';
import { mapShopToCardData } from '@server/mappers/shop.mapper';

const getVariations = (listing: Listing): VariationsData =>
	(listing.variations ?? {}) as VariationsData;

const getCombinations = (listing: Listing): CombinationsData =>
	(listing.variationAvailability ?? {}) as CombinationsData;

const getVariationImages = (
	listing: Listing,
): VariationImagesData | null =>
	(listing.variationImages ?? null) as VariationImagesData | null;

const mapListingToBaseData = (listing: Listing) => ({
	id: listing.id,
	shortId: listing.shortId,
	title: listing.title,
	subtitle: listing.subtitle || '',
	categoryId: listing.category.id,
	priceCents: listing.priceCents || 0,
	countryCode: listing.country?.code,
	shopId: listing.shop.id,
	shopShortId: listing.shop.shortId || '',
	shopTitle: listing.shop.title,
	imageUuids: listing.imageUuids,
	available: listing.available,
	trackInventory: listing.trackInventory,
	variations: getVariations(listing),
	combinations: getCombinations(listing),
	variationImages: getVariationImages(listing),
});

export const mapListingToCardData = (
	listing: Listing,
): ListingCardData => {
	const variations = getVariations(listing);
	const combinations = getCombinations(listing);
	return {
		id: listing.id,
		shortId: listing.shortId,
		title: listing.title,
		subtitle: listing.subtitle || '',
		heroImageUuid: getDefaultHeroImageUuid({
			imageUuids: listing.imageUuids,
			variations,
			combinations,
			variationImages: getVariationImages(listing),
			trackInventory: listing.trackInventory,
		}),
		...getListingBasePrice(
			variations,
			combinations,
			listing.priceCents || 0,
		),
		shopShortId: listing.shop.shortId || '',
		variations: summarizeVariations(variations),
		createdAt: listing.createdAt.toISOString(),
	};
};

export const mapListingsToCollection = (
	listings: Listing[],
): ListingCollectionData => {
	const shopsById = new Map(
		listings.map((listing) => [listing.shop.id, listing.shop]),
	);
	return {
		listings: listings.map(mapListingToCardData),
		shops: [...shopsById.values()].map(mapShopToCardData),
	};
};

export const mapListingToShopManagerCardData = (
	listing: Listing,
): ShopManagerListingCardData => ({
	...mapListingToCardData(listing),
	available: listing.available,
	inventory: listing.inventory ?? null,
	trackInventory: listing.trackInventory,
});

export const mapListingToPageData = (
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
		...mapListingToBaseData(listing),
		directFulfillment: listing.shop.directFulfillment,
		fullDescr: listing.fullDescr,
		outOfStock: isListingOutOfStock(
			listing.trackInventory,
			listing.inventory,
			getVariations(listing),
			getCombinations(listing),
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
	const allCombinations = getCombinations(listing);
	const neededKeys = new Set(selectedOptionSets.map(getCombinationKey));
	const combinations: CombinationsData = Object.fromEntries(
		[...neededKeys]
			.filter((key) => key in allCombinations)
			.map((key) => [key, allCombinations[key]]),
	);
	return {
		...mapListingToBaseData(listing),
		combinations,
		shippingPrice,
		deliveryEstimate,
		personalizationCostCents:
			listing.personalizationProfile?.costCents ?? null,
		personalizationName: listing.personalizationProfile?.name ?? null,
	};
};
