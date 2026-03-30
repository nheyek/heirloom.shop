import { ShopCardData } from '@common/types/ShopCardData';
import { Shop } from '../entities/generated/Shop';

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
