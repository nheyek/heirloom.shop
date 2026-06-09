import { getEm } from '@server/db';
import { UserFavoriteShop } from '@server/entities/generated/UserFavoriteShop';
import { Shop } from '@server/entities/generated/Shop';
import { AppUser } from '@server/entities/generated/AppUser';

export const favoriteShop = async (
	userId: number,
	shopId: number,
): Promise<void> => {
	const em = getEm();

	const existing = await em.findOne(UserFavoriteShop, {
		user: { id: userId },
		shop: { id: shopId },
	});

	if (existing) {
		return;
	}

	const favoritedShop = em.create(UserFavoriteShop, {
		user: em.getReference(AppUser, userId),
		shop: em.getReference(Shop, shopId),
	});

	await em.persist(favoritedShop).flush();
};

export const unfavoriteShop = async (
	userId: number,
	shopId: number,
): Promise<void> => {
	const em = getEm();

	const favoritedShop = await em.findOne(UserFavoriteShop, {
		user: { id: userId },
		shop: { id: shopId },
	});

	if (favoritedShop) {
		await em.remove(favoritedShop).flush();
	}
};

export const isShopFavorited = async (
	userId: number,
	shopId: number,
): Promise<boolean> => {
	const em = getEm();

	const favoritedShop = await em.findOne(UserFavoriteShop, {
		user: { id: userId },
		shop: { id: shopId },
	});

	return !!favoritedShop;
};

export const getFavoritedShopsForUser = async (
	userId: number,
): Promise<Shop[]> => {
	const em = getEm();

	const favoritedShops = await em.find(
		UserFavoriteShop,
		{ user: { id: userId } },
		{
			populate: ['shop'],
			orderBy: { createdAt: 'desc' },
		},
	);

	return favoritedShops.map((fs) => fs.shop);
};
