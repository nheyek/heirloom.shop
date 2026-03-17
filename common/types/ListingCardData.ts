export type ListingCardData = {
	id: number;
	shortId: string;
	title: string;
	subtitle: string;
	categoryId: string;
	priceCents: number;
	countryCode?: string;
	shopId: number;
	shopShortId: string;
	shopTitle: string;
	imageUuids: string[];
};
