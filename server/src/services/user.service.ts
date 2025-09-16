import e from 'express';
import { getEm } from '../db';
import { Product } from '../entities/Product';
import { AppUser } from '../entities/AppUser';

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
