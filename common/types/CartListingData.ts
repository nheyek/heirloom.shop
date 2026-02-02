import { ListingCardData } from './ListingCardData';
import { ListingVariationData } from './ListingVariationData';

export type CartListingData = ListingCardData & {
	variations: ListingVariationData[];
};
