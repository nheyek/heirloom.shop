import { Shop } from '../entities/generated/Shop';
import { ShopCardData } from '@common/types/ShopCardData';

export const mapShopToShopCardData = (shop: Shop): ShopCardData => ({
	id: shop.id,
	shortId: shop.shortId || '',
	title: shop.title,
	location: shop.shopLocation,
	classification: shop.classification,
	profileImageUuid: shop.profileImageUuid,
	countryCode: shop.country?.code || null,
	categoryIcon: shop.categoryIcon || null,
});
