export const listingImageUrl = (shopShortId: string, uuid: string) =>
	`${process.env.LISTING_IMAGES_URL}/${shopShortId}/${uuid}.jpg`;
