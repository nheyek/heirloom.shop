import {
	CartItemData,
	CombinationsData,
	ListingCardData,
	ListingPageData,
	VariationsData,
} from '@heirloom/common/contract';
import { getCombinationKey } from '@heirloom/common/domain/listing';
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
});

export const mapListingToCompleteApiResponseData = (
	listing: Listing,
): ListingPageData => ({
	...mapListingToApiResponseData(listing),
	fullDescr: listing.fullDescr,
	processingProfile: listing.processingProfile
		? {
				minDays: listing.processingProfile.minDays,
				maxDays: listing.processingProfile.maxDays,
			}
		: undefined,
	originZip: listing.shippingProfile?.originZip,
	shippingDetails: listing.shippingProfile
		? {
				shipTimeDaysMin: listing.shippingProfile.shippingDaysMin,
				shipTimeDaysMax: listing.shippingProfile.shippingDaysMax,
				shippingRate: listing.shippingProfile.flatShippingRateCents || 0,
			}
		: undefined,
	returnPolicy: listing.returnProfile
		? {
				policyType: listing.returnProfile.policyType,
				returnWindowDays: listing.returnProfile.returnWindowDays,
			}
		: undefined,
	upc: listing.upc,
	variations: (listing.variations ?? {}) as VariationsData,
	combinations: (listing.combinations ?? {}) as CombinationsData,
});

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
		variations: (listing.variations ?? {}) as VariationsData,
		combinations,
	};
};
