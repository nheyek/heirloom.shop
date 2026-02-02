import { sql } from '@mikro-orm/core';
import { getEm } from '../db';
import { Listing } from '../entities/generated/Listing';
import { ListingImage } from '../entities/generated/ListingImage';
import { ListingVariation } from '../entities/generated/ListingVariation';
import { Shop } from '../entities/generated/Shop';
import { encodeId } from '../utils/hashids';

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

export const findListingImages = async (id: number): Promise<ListingImage[]> => {
	const em = getEm();
	return em.find(ListingImage, { listing: { id } });
};

export const findListingsByCategory = async (categoryId: string): Promise<Listing[]> => {
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

export const findListingsByShop = async (shopId: number): Promise<Listing[]> => {
	const em = getEm();

	return em.find(Listing, { shop: { id: shopId } });
};

export const findListingById = async (id: number) => {
	const em = getEm();
	return em.findOne(
		Listing,
		{ id },
		{
			populate: [
				'shop',
				'country',
				'shippingProfile',
				'returnExchangeProfile',
				'shippingOrigin',
			],
		},
	);
};

export const findListingByShortId = async (shortId: string) => {
	const em = getEm();
	return em.findOne(
		Listing,
		{ shortId },
		{
			populate: [
				'shop',
				'country',
				'shippingProfile',
				'returnExchangeProfile',
				'shippingOrigin',
			],
		},
	);
};

export const createListing = async (
	profileApiRequest: { title: string; desc: string },
	shopId: number,
) => {
	const em = getEm();
	const listing = em.create(Listing, {
		title: profileApiRequest.title,
		fullDescr: profileApiRequest.desc,
		shop: { id: shopId } as Shop,
	});
	await em.persistAndFlush(listing);

	// Generate short_id after we have the ID
	listing.shortId = encodeId(listing.id);
	await em.flush();

	return listing.id;
};

export const findListingVariations = async (listingId: number): Promise<ListingVariation[]> => {
	const em = getEm();
	return em.find(
		ListingVariation,
		{ listing: { id: listingId } },
		{ populate: ['listingVariationOptionCollection'] },
	);
};

export const findListingsByShortIds = async (shortIds: string[]): Promise<Listing[]> => {
	const em = getEm();
	return em.find(
		Listing,
		{ shortId: { $in: shortIds } },
		{ populate: ['shop', 'country', 'category'] },
	);
};

export const findListingsWithVariationsByShortIds = async (
	shortIds: string[],
): Promise<Map<string, { listing: Listing; variations: ListingVariation[] }>> => {
	const listings = await findListingsByShortIds(shortIds);

	const result = new Map<string, { listing: Listing; variations: ListingVariation[] }>();

	for (const listing of listings) {
		const variations = await findListingVariations(listing.id);
		result.set(listing.shortId, { listing, variations });
	}

	return result;
};
