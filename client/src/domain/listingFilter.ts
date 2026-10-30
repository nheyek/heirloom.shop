import { ListingCardData } from '@heirloom/common/contract';

export const PRICE_STEP_CENTS = 100;

export type PriceRange = [number, number];

export const getPriceBounds = (
	listings: ListingCardData[],
): PriceRange | null => {
	if (listings.length === 0) return null;
	const prices = listings.map((listing) => listing.basePriceCents);
	return [
		Math.floor(Math.min(...prices) / PRICE_STEP_CENTS) *
			PRICE_STEP_CENTS,
		Math.ceil(Math.max(...prices) / PRICE_STEP_CENTS) *
			PRICE_STEP_CENTS,
	];
};

export const filterListingsByPrice = (
	listings: ListingCardData[],
	range: PriceRange | null,
): ListingCardData[] =>
	range
		? listings.filter(
				(listing) =>
					listing.basePriceCents >= range[0] &&
					listing.basePriceCents <= range[1],
			)
		: listings;
