import { ListingCardData, ListingVariationData } from '@common/contract';

export type ListingDataForCart = ListingCardData & {
	variations: ListingVariationData[];
	shippingPrice: number;
};
