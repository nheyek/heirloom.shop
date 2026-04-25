import { ShopCardData } from '@heirloom/common/contract';
import { Shop } from '@server/entities/generated/Shop';

export const mapShopToApiResponseData = (
	shop: Shop,
): ShopCardData => ({
	id: shop.id,
	shortId: shop.shortId || '',
	title: shop.title,
	location: shop.shopLocation,
	classification: shop.classification,
	profileImageUuid: shop.profileImageUuid,
	countryCode: shop.country?.code || null,
	categoryIcon: shop.categoryIcon || null,
});
