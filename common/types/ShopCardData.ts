export type ShopCardData = {
	id: number;
	shortId: string;
	title: string;
	location?: string | null;
	classification?: string | null;
	profileImageUuid?: string | null;
	countryCode: string | null;
	categoryIcon: string | null;
};
