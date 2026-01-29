export type ListingCardData = {
	id: number;
	shortId: string;
	title: string;
	subtitle: string;
	categoryId: string;
	priceDollars: number;
	countryCode?: string;
	shopId: number;
	shopShortId: string;
	shopTitle: string;
	imageUuids: string[];
};
