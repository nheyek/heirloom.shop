import { sql } from '@mikro-orm/core';
import { getEm } from '../db';
import { Listing } from '../entities/Listing';
import { Shop } from '../entities/Shop';

export const findFeaturedListings = async (): Promise<Listing[]> => {
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

export const findListingsByCategory = async (categoryId: string): Promise<Listing[]> => {
	const em = getEm();

	const queryResult = await em.getConnection().execute(
		`
        WITH RECURSIVE category_tree AS (
            SELECT id FROM listing_category WHERE id = ?
            UNION ALL
            SELECT c.id FROM listing_category c
            JOIN category_tree ct ON c.parent_id = ct.id
        )
        SELECT l.* FROM listing l
        WHERE l.category_id IN (SELECT id FROM category_tree)
    `,
		[categoryId],
	);

	return queryResult.map((row: any) => em.map(Listing, row));
};

export const findListingById = async (id: number) => {
	const em = getEm();
	return em.findOne(Listing, { id });
};

export const createListing = async (
	profileApiRequest: { title: string; desc: string },
	shopId: number,
) => {
	const em = getEm();
	const listing = em.create(Listing, {
		title: profileApiRequest.title,
		descrRichText: profileApiRequest.desc,
		shop: { id: shopId } as Shop,
	});
	await em.persistAndFlush(listing);
	return listing.id;
};
