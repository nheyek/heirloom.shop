import e from 'express';
import { getEm } from '../db';
import { AppUser } from '../entities/generated/AppUser';
import { ShopUserRole } from '../entities/generated/ShopUserRole';

export const findUserByEmail = async (email: string) => {
	const em = getEm();
	return em.findOne(AppUser, { email });
};

export const createUser = async (email: string): Promise<AppUser> => {
	const em = getEm();
	const user = em.create(AppUser, {
		username: email,
		email,
	});

	await em.persistAndFlush(user);

	return user;
};

export const getShopIdForUser = async (userId: number) => {
	const em = getEm();
	const shopRole = await em.findOne(ShopUserRole, { user: { id: userId } });
	return shopRole?.shop.id || null;
};
