export type ListingCardData = {
	id: number;
	title: string;
	subtitle: string;
	categoryId: string;
	priceDollars: number;
	countryCode?: string;
	shopId: number;
	shopTitle: string;
	imageUuids: string[];
};
