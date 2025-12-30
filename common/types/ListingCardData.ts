export type ListingCardData = {
	id: number;
	title: string;
	subtitle: string;
	categoryId: string;
	priceDollars: number;
	countryCode?: string;
	shopTitle: string;
	shopProfileImageUuid?: string;
	imageUuids: string[];
};
