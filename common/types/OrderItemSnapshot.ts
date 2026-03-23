export type OrderItemSnapshot = {
	title: string;
	shopName: string;
	imageUuid: string | null;
	unitPriceCents: number;
	quantity: number;
	variations: { name: string; value: string }[];
};
