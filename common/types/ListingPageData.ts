import { ListingCardData } from './ListingCardData';
import { ListingVariationData } from './ListingVariationData';

export type ListingPageData = ListingCardData & {
	fullDescr?: { title: string; richText: string }[];
	leadTimeDaysMin: number;
	leadTimeDaysMax: number;
	originZip?: string;
	shippingDetails?: {
		shipTimeDaysMin: number;
		shipTimeDaysMax: number;
		shippingRate: number;
	};
	returnExchangePolicy?: {
		returnsAccepted: boolean;
		exchangesAccepted: boolean;
		returnWindowDays: number;
	};
	variations: ListingVariationData[];
};
