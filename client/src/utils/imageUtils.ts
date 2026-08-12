import { ImageVariant, imageVariantSuffix } from '@heirloom/common/constants';

export type ImageSource = {
	url: string;
	fallback?: string;
};

export const listingImageUrl = (
	shopShortId: string,
	uuid: string,
	variant: ImageVariant = ImageVariant.FULL,
) =>
	`${process.env.LISTING_IMAGES_URL}/${shopShortId}/${uuid}${imageVariantSuffix(variant)}.jpg`;

export const shopProfileImageUrl = (
	uuid: string,
	variant: ImageVariant = ImageVariant.FULL,
) =>
	`${process.env.SHOP_PROFILE_IMAGES_URL}/${uuid}${imageVariantSuffix(variant)}.jpg`;
