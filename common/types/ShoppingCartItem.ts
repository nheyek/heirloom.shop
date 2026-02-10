import { ListingDataForCart } from '@common/types/ListingDataForCart';

export type ShoppingCartItem = {
	listingData: ListingDataForCart;
	selectedOptions: { [variationId: number]: number };
	quantity: number;
	addedAt: number;
};
