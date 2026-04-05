import { CheckoutItemData, ShippingAddress } from '@common/contract';

export type CheckoutApiRequest = {
	items: CheckoutItemData[];
	shippingAddress: ShippingAddress;
	email: string;
};
