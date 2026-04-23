import e from 'express';
import { getEm } from '@server/db';
import { AppUser } from '@server/entities/generated/AppUser';
import { ShopUserRole } from '@server/entities/generated/ShopUserRole';

export const findUserByEmail = async (email: string) => {
	const em = getEm();
	return em.findOne(AppUser, { email });
};

export const findOrCreateUser = async (
	email: string,
): Promise<AppUser> => {
	const em = getEm();
	try {
		const user = em.create(AppUser, { username: email, email });
		await em.persist(user).flush();
		return user;
	} catch {
		// Another concurrent request inserted the user first — fetch it
		return em.findOneOrFail(AppUser, { email });
	}
};

export const getShopIdForUser = async (userId: number) => {
	const em = getEm();
	const shopRole = await em.findOne(ShopUserRole, {
		user: { id: userId },
	});
	return shopRole?.shop.id || null;
};
