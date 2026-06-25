import { sql } from '@mikro-orm/core';
import { getEm } from '@server/db';
import { Listing } from '@server/entities/generated/Listing';
import { ListingCategory } from '@server/entities/generated/ListingCategory';
import { ListingVariation } from '@server/entities/generated/ListingVariation';
import { Shop } from '@server/entities/generated/Shop';
import { encodeShortId } from '@server/utils/hashids';

export const findListingsComplete = async (): Promise<Listing[]> => {
	const em = getEm();
	return em.find(
		Listing,
		{},
		{
			populate: ['shop', 'country'],
			orderBy: { [sql`RANDOM()`]: 'asc' },
			limit: 8,
		},
	);
};

export const findListingsByCategory = async (
	categoryId: string,
): Promise<Listing[]> => {
	const em = getEm();

	const categoryIdResult = await em.getConnection().execute(
		`
        WITH RECURSIVE category_tree AS (
        SELECT id FROM listing_category WHERE id = ?
        UNION ALL
        SELECT c.id FROM listing_category c
        JOIN category_tree ct ON c.parent_id = ct.id
        )
        SELECT id FROM category_tree
    `,
		[categoryId],
		'all',
	);

	const categoryIds = categoryIdResult.map((row: any) => row.id);
	return em.find(
		Listing,
		{
			category: { $in: categoryIds },
		},
		{ populate: ['shop', 'country'] },
	);
};

export const findListingsByShop = async (
	shopId: number,
): Promise<Listing[]> => {
	const em = getEm();

	return em.find(Listing, { shop: { id: shopId } }, { populate: ['shop', 'category'] });
};

export const findFullListingDataByShortId = async (
	shortId: string,
) => {
	const em = getEm();
	return em.findOne(
		Listing,
		{ shortId },
		{
			populate: [
				'shop',
				'country',
				'shippingProfile',
				'returnProfile',
			],
		},
	);
};

export const createListing = async (
	profileApiRequest: {
		title: string;
		desc: string;
		categoryId: string;
	},
	shopId: number,
) => {
	const em = getEm();

	const [{ nextval }] = await em
		.getConnection()
		.execute("SELECT nextval('listing_id_seq')");
	const nextId = Number(nextval);

	const listing = em.create(Listing, {
		id: nextId,
		shortId: encodeShortId(nextId),
		title: profileApiRequest.title,
		fullDescr: profileApiRequest.desc,
		shop: em.getReference(Shop, shopId),
		category: em.getReference(
			ListingCategory,
			profileApiRequest.categoryId,
		),
	});
	await em.persist(listing).flush();

	return listing.id;
};

export const findListingVariations = async (
	listingId: number,
): Promise<ListingVariation[]> => {
	const em = getEm();
	return em.find(
		ListingVariation,
		{ listing: { id: listingId } },
		{ populate: ['listingVariationOptionCollection'] },
	);
};

export const findListingsByShortIds = async (
	shortIds: string[],
): Promise<Listing[]> => {
	const em = getEm();
	return em.find(
		Listing,
		{ shortId: { $in: shortIds } },
		{ populate: ['shop', 'country', 'category'] },
	);
};
