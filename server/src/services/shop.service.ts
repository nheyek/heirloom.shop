import { getEm } from '../db';
import { Shop } from '../entities/generated/Shop';
import { ShopUserRole } from '../entities/generated/ShopUserRole';

export const findShops = async () => {
	const em = getEm();
	return em.find(Shop, {}, { populate: ['country'] });
};

export const findShopById = async (id: number) => {
	const em = getEm();
	return em.findOne(Shop, { id });
};

export const findShopByShortId = async (shortId: string) => {
	const em = getEm();
	return em.findOne(Shop, { shortId }, { populate: ['country'] });
};

export const authorizeShopAction = async (shopId: number, userEmail: string) => {
	const em = getEm();
	const roleAssignment = await em.findOne(ShopUserRole, {
		shop: { id: shopId },
		user: { email: userEmail },
	});

	if (!roleAssignment) {
		throw new Error('No role assignment found for user with this shop');
	}
};
