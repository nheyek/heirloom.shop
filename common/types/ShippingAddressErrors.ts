import { ShippingAddress } from '@common/contract';

export type ShippingAddressErrors = {
	[K in keyof ShippingAddress]?: string;
};
