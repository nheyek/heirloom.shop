import { ShippingAddress } from '../contract.js';

export type ShippingAddressErrors = {
	[K in keyof ShippingAddress]?: string;
};
