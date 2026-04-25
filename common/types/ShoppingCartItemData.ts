import { CartItemData } from '../contract.js';

export type ShoppingCartItem = {
	listingData: CartItemData;
	selectedOptions: Record<string, number>;
	quantity: number;
	addedAt: number;
};
