import { ListingCardData } from './ListingCardData';
import { ListingVariationData } from './ListingVariationData';

export type ListingDataForCart = ListingCardData & {
	variations: ListingVariationData[];
};
