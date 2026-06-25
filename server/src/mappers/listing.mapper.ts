import { ListingCardData } from '@heirloom/common/contract';
import { ListingPageData } from '@heirloom/common/contract';
import { ListingVariationData } from '@heirloom/common/contract';
import { Listing } from '@server/entities/generated/Listing';
import { ListingVariation } from '@server/entities/generated/ListingVariation';
import { ListingVariationOption } from '@server/entities/generated/ListingVariationOption';

export const mapListingToApiResponseData = (
	listing: Listing,
): ListingCardData => ({
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
});

export const mapListingToCompleteApiResponseData = (
	listing: Listing,
	variations: ListingVariation[],
): ListingPageData => ({
	...mapListingToApiResponseData(listing),
	fullDescr: listing.fullDescr,
	processingProfile: listing.processingProfile
		? { minDays: listing.processingProfile.minDays, maxDays: listing.processingProfile.maxDays }
		: undefined,
	originZip: listing.shippingProfile?.originZip,
	shippingDetails: listing.shippingProfile
		? {
				shipTimeDaysMin: listing.shippingProfile.shippingDaysMin,
				shipTimeDaysMax: listing.shippingProfile.shippingDaysMax,
				shippingRate:
					listing.shippingProfile.flatShippingRateCents ||
					0,
			}
		: undefined,
	returnExchangePolicy: listing.returnExchangeProfile
		? {
				returnsAccepted:
					listing.returnExchangeProfile.acceptReturns,
				exchangesAccepted:
					listing.returnExchangeProfile.acceptExchanges,
				returnWindowDays:
					listing.returnExchangeProfile.returnWindowDays,
			}
		: undefined,
	variations: variations.map(mapVariationToApiResponseData),
});

export const mapVariationToApiResponseData = (
	variation: ListingVariation,
): ListingVariationData => ({
	id: variation.id,
	name: variation.variationName,
	pricesVary: variation.pricesVary,
	options: variation.listingVariationOptionCollection
		.getItems()
		.map((option: ListingVariationOption) => ({
			id: option.id,
			name: option.optionName,
			additionalPriceCents: option.additionalPriceCents || 0,
		})),
});
