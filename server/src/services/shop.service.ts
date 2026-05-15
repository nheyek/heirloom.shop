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

type AdminShopRow = {
	id: number;
	title: string;
	created_at: Date | null;
	direct_fulfillment: boolean;
	listing_count: number;
};

export const findShopsForAdmin = async (): Promise<AdminShopListItem[]> => {
	const em = getEm();
	const conn = em.getConnection();
	const rows = await conn.execute<AdminShopRow[]>(`
		SELECT
			s.id,
			s.title,
			s.created_at,
			s.direct_fulfillment,
			COUNT(l.id)::int AS listing_count
		FROM shop s
		LEFT JOIN listing l ON l.shop_id = s.id
		GROUP BY s.id, s.title, s.created_at, s.direct_fulfillment
		ORDER BY s.created_at DESC NULLS LAST
	`);
	return rows.map((row: AdminShopRow) => ({
		id: row.id,
		title: row.title,
		createdAt: row.created_at?.toISOString() ?? null,
		directFulfillment: row.direct_fulfillment,
		listingCount: row.listing_count,
	}));
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
