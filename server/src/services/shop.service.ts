import { AdminShopListItem } from '@heirloom/common/contract';
import { getEm } from '@server/db';
import { Shop } from '@server/entities/generated/Shop';
import { ShopUserRole } from '@server/entities/generated/ShopUserRole';

export const findShops = async () => {
	const em = getEm();
	return em.find(Shop, {}, { populate: ['country'] });
};

export const findShopById = async (id: number) => {
	const em = getEm();
	return em.findOne(Shop, { id });
};

export const findShopByShortId = async (
	shortId: string,
) => {
	const em = getEm();
	return em.findOne(
		Shop,
		{ shortId },
		{ populate: ['country'] },
	);
};

export const findShopsForAdmin = async (): Promise<AdminShopListItem[]> => {
	const em = getEm();
	const conn = em.getConnection();
	return conn.execute<AdminShopListItem[]>(`
		SELECT
			s.id,
			s.title,
			to_char(s.created_at AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS "createdAt",
			s.direct_fulfillment AS "directFulfillment",
			COUNT(l.id)::int AS "listingCount"
		FROM shop s
		LEFT JOIN listing l ON l.shop_id = s.id
		GROUP BY s.id, s.title, s.created_at, s.direct_fulfillment
		ORDER BY s.created_at DESC NULLS LAST
	`);
};

export const authorizeShopAction = async (
	shopId: number,
	userEmail: string,
) => {
	const em = getEm();
	const roleAssignment = await em.findOne(ShopUserRole, {
		shop: { id: shopId },
		user: { email: userEmail },
	});

	if (!roleAssignment) {
		throw new Error(
			'No role assignment found for user with this shop',
		);
	}
};
