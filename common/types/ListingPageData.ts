import { ListingCardData } from './ListingCardData';
import { ListingVariationData } from './ListingVariationData';

export type ListingPageData = ListingCardData & {
	leadTimeDaysMin: number;
	leadTimeDaysMax: number;
	originZip?: string;
	shippingDetails?: {
		shipTimeDaysMin: number;
		shipTimeDaysMax: number;
		shippingRate: string;
	};
	returnExchangePolicy?: {
		returnsAccepted: boolean;
		exchangesAccepted: boolean;
		returnWindowDays: number;
	};
	variations: ListingVariationData[];
};
