import { CheckoutItemData } from '../CheckoutItemData';
import { ShippingAddress } from '../ShippingAddress';

export type CheckoutApiRequest = {
	items: CheckoutItemData[];
	shippingAddress: ShippingAddress;
	email: string;
};
