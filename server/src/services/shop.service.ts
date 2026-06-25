import {
	AdminShopListItem,
	CreateShopBody,
	UpdateShopBody,
} from '@heirloom/common/contract';
import { ShopRole } from '@heirloom/common/constants';
import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { getEm } from '@server/db';
import { Country } from '@server/entities/generated/Country';
import { Shop } from '@server/entities/generated/Shop';
import { AppUser } from '@server/entities/generated/AppUser';
import { ShopUserRole } from '@server/entities/generated/ShopUserRole';
import { findOrCreateUser } from '@server/services/user.service';
import { encodeShortId } from '@server/utils/hashids';

export class DuplicateShopTitleError extends Error {}

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

export const findShopsForAdmin = async (): Promise<
	AdminShopListItem[]
> => {
	const em = getEm();
	const conn = em.getConnection();
	return conn.execute<AdminShopListItem[]>(`
		SELECT
			s.id,
			s.short_id AS "shortId",
			s.title,
			to_char(s.created_at AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS "createdAt",
			s.direct_fulfillment AS "directFulfillment",
			COUNT(l.id)::int AS "listingCount"
		FROM shop s
		LEFT JOIN listing l ON l.shop_id = s.id
		GROUP BY s.id, s.short_id, s.title, s.created_at, s.direct_fulfillment
		ORDER BY s.created_at DESC NULLS LAST
	`);
};

export const createShop = async (
	body: CreateShopBody,
): Promise<AdminShopListItem> => {
	const em = getEm();

	const [{ nextval }] = await em
		.getConnection()
		.execute("SELECT nextval('shop_id_seq')");
	const nextId = Number(nextval);

	const country = em.getReference(Country, body.countryCode);
	const shop = em.create(Shop, {
		id: nextId,
		shortId: encodeShortId(nextId),
		title: body.title,
		classification: body.classification,
		shopLocation: body.location,
		country,
		directFulfillment: body.directFulfillment,
		profileImageUuid: body.profileImageUuid,
	});
	try {
		await em.persist(shop).flush();
	} catch (e) {
		if (e instanceof UniqueConstraintViolationException) {
			throw new DuplicateShopTitleError();
		}
		throw e;
	}

	if (body.directFulfillment && body.ownerEmail) {
		const owner = await findOrCreateUser(
			body.ownerEmail.toLowerCase(),
		);
		const role = em.create(ShopUserRole, {
			shop,
			user: owner,
			shopRole: ShopRole.OWNER,
		});
		await em.persist(role).flush();
	}

	return {
		id: shop.id,
		shortId: shop.shortId,
		title: shop.title,
		createdAt: new Date().toISOString(),
		listingCount: 0,
		directFulfillment: shop.directFulfillment,
	};
};

export const updateShop = async (
	shortId: string,
	body: UpdateShopBody,
): Promise<Shop | null> => {
	const em = getEm();
	const shop = await em.findOne(
		Shop,
		{ shortId },
		{ populate: ['country'] },
	);
	if (!shop) return null;

	const country = em.getReference(Country, body.countryCode);
	shop.title = body.title;
	shop.classification = body.classification;
	shop.shopLocation = body.location;
	shop.country = country;
	if (body.profileImageUuid !== undefined) {
		shop.profileImageUuid = body.profileImageUuid ?? undefined;
	}
	if (body.profileRichText !== undefined) {
		shop.profileRichText = body.profileRichText ?? undefined;
	}

	try {
		await em.flush();
	} catch (e) {
		if (e instanceof UniqueConstraintViolationException) {
			throw new DuplicateShopTitleError();
		}
		throw e;
	}

	return shop;
};

export const authorizeShopAction = async (
	shopId: number,
	userEmail: string,
) => {
	const em = getEm();

	const user = await em.findOne(AppUser, { email: userEmail });
	if (user?.isAdmin) return;

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
