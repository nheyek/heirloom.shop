export type ListingVariationOptionData = {
	id: number;
	name: string;
	additionalPriceDollars: number;
};

export type ListingVariationData = {
	id: number;
	name: string;
	pricesVary: boolean;
	options: ListingVariationOptionData[];
};
