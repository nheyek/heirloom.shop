import { Shop } from '../entities/Shop';
import { ShopCardData } from '@common/types/ShopCardData';

export const mapShopToShopCardData = (shop: Shop): ShopCardData => ({
	id: shop.id,
	title: shop.title,
	location: shop.shopLocation,
	classification: shop.classification,
	profileImageUuid: shop.profileImageUuid,
});
