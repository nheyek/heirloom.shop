export type ListingVariationOptionData = {
	id: number;
	name: string;
	additionalPriceCents: number;
};

export type ListingVariationData = {
	id: number;
	name: string;
	pricesVary: boolean;
	options: ListingVariationOptionData[];
};
