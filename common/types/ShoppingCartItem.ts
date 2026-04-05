import { ListingDataForCart } from './ListingDataForCart';

export type ShoppingCartItem = {
	listingData: ListingDataForCart;
	selectedOptions: Record<string, number>;
	quantity: number;
	addedAt: number;
};
