import {
	CombinationsData,
	VariationsData,
} from '@heirloom/common/contract';
import { isListingOutOfStock } from '@heirloom/common/domain/listing';
import { getEm } from '@server/db';
import { FeaturedListing } from '@server/entities/generated/FeaturedListing';
import { Listing } from '@server/entities/generated/Listing';
import { ListingCategory } from '@server/entities/generated/ListingCategory';
import { Shop } from '@server/entities/generated/Shop';
import { encodeShortId, ShortIdEntityType } from '@server/utils/hashids';

export const findFeaturedListings = async (): Promise<Listing[]> => {
	const em = getEm();
	const featured = await em.find(
		FeaturedListing,
		{},
		{
			populate: ['listing', 'listing.shop', 'listing.shop.country'],
			orderBy: { id: 'asc' },
		},
	);
	return featured.map((f) => f.listing);
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
		{ category: { $in: categoryIds } },
		{ populate: ['shop', 'shop.country'] },
	);
};

export const findListingsByShop = async (
	shopId: number,
): Promise<Listing[]> => {
	const em = getEm();

	return em.find(
		Listing,
		{ shop: { id: shopId } },
		{ populate: ['shop', 'category'], orderBy: { id: 'asc' } },
	);
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
				'shop.country',
				'shippingProfile',
				'processingProfile',
				'returnProfile',
				'personalizationProfile',
			],
		},
	);
};

export const findAvailableFullListingDataByShortId = async (
	shortId: string,
) => {
	const em = getEm();
	const listing = await em.findOne(
		Listing,
		{ shortId, available: true },
		{
			populate: [
				'shop',
				'shop.country',
				'shippingProfile',
				'processingProfile',
				'returnProfile',
				'personalizationProfile',
			],
		},
	);
	if (!listing) return null;
	if (
		isListingOutOfStock(
			listing.trackInventory,
			listing.inventory,
			(listing.variations ?? {}) as VariationsData,
			(listing.combinations ?? {}) as CombinationsData,
		)
	)
		return null;
	return listing;
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
		shortId: encodeShortId(nextId, ShortIdEntityType.Listing),
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

