import { ListingCardData } from '@common/types/ListingCardData';
import { ListingPageData } from '@common/types/ListingPageData';
import { ListingVariationData } from '@common/types/ListingVariationData';
import { Listing } from '../entities/generated/Listing';
import { ListingVariation } from '../entities/generated/ListingVariation';
import { ListingVariationOption } from '../entities/generated/ListingVariationOption';

export const mapListingToApiResponseData = (
	listing: Listing,
): ListingCardData => ({
	id: listing.id,
	shortId: listing.shortId || '',
	title: listing.title,
	subtitle: listing.subtitle || '',
	categoryId: listing.category
		? listing.category.id.toString()
		: '',
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
	leadTimeDaysMin: listing.leadTimeDaysMin,
	leadTimeDaysMax: listing.leadTimeDaysMax,
	originZip: listing.shippingOrigin?.originZip,
	shippingDetails: listing.shippingProfile
		? {
				shipTimeDaysMin:
					listing.shippingProfile.shippingDaysMin || 0,
				shipTimeDaysMax:
					listing.shippingProfile.shippingDaysMax || 0,
				shippingRate: listing.shippingProfile
					.flatShippingRateCents
					? `$${(listing.shippingProfile.flatShippingRateCents / 100).toFixed(2)}`
					: 'FREE',
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
