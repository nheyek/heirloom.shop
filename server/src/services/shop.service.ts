import { getEm } from '../db';
import { Shop } from '../entities/Shop';
import { ShopUserRole } from '../entities/ShopUserRole';

export const findShopById = async (id: number) => {
	const em = getEm();
	return em.findOne(Shop, { id });
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
