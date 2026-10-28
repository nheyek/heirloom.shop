import { ListingCardData } from '@heirloom/common/contract';

export enum ListingSort {
	DEFAULT = 'DEFAULT',
	PRICE_ASC = 'PRICE_ASC',
	PRICE_DESC = 'PRICE_DESC',
	MOST_RECENT = 'MOST_RECENT',
}

export const LISTING_SORT_LABELS: Record<ListingSort, string> = {
	[ListingSort.DEFAULT]: 'Default',
	[ListingSort.PRICE_ASC]: 'Lowest Price',
	[ListingSort.PRICE_DESC]: 'Highest Price',
	[ListingSort.MOST_RECENT]: 'Most Recent',
};

const comparators: Record<
	Exclude<ListingSort, ListingSort.DEFAULT>,
	(a: ListingCardData, b: ListingCardData) => number
> = {
	[ListingSort.PRICE_ASC]: (a, b) =>
		a.basePriceCents - b.basePriceCents,
	[ListingSort.PRICE_DESC]: (a, b) =>
		b.basePriceCents - a.basePriceCents,
	[ListingSort.MOST_RECENT]: (a, b) =>
		Date.parse(b.createdAt) - Date.parse(a.createdAt),
};

export const sortListings = (
	listings: ListingCardData[],
	sort: ListingSort,
): ListingCardData[] =>
	sort === ListingSort.DEFAULT
		? listings
		: [...listings].sort(comparators[sort]);
