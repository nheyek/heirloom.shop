import { ListingCardData } from './ListingCardData';

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
};
