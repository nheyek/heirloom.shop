export type ShopCardData = {
	id: number;
	shortId: string;
	title: string;
	location?: string;
	classification?: string;
	profileImageUuid?: string;
	countryCode: string | null;
	categoryIcon: string | null;
};
