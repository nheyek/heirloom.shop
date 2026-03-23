export type ShippingAddress = {
	firstName: string;
	lastName: string;
	line1: string;
	line2: string;
	city: string;
	state: string;
	zip: string;
};

export type ShippingAddressErrors = {
	[K in keyof ShippingAddress]?: string;
};
