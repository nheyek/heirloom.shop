export type OrderItemSnapshot = {
	title: string;
	shopName: string;
	imageUuid: string | null;
	unitPriceCents: number;
	quantity: number;
	estimatedDelivery: string | null;
	variations: { name: string; value: string }[];
};
