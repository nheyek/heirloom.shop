import { CheckoutItemData } from './CheckoutItemData';
import { ShippingAddress } from './ShippingAddress';

export type CheckoutData = {
	items: CheckoutItemData[];
	shippingAddress: ShippingAddress;
};
