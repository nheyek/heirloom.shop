import { CartItemData } from '@common/contract';

export type ShoppingCartItem = {
	listingData: CartItemData;
	selectedOptions: Record<string, number>;
	quantity: number;
	addedAt: number;
};
