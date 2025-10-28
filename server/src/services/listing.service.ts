import { getEm } from '../db';
import { Listing } from '../entities/Listing';
import { Shop } from '../entities/Shop';
import { ListingCardData } from '@common/types/ListingCardData';

export const findAllListings = async (): Promise<ListingCardData[]> => {
	const em = getEm();
	const listings = await em.find(Listing, {});

	return listings.map((listing) => ({
		id: listing.id,
		title: listing.title,
		subtitle: listing.subtitle || '',
		categoryId: listing.category ? listing.category.id.toString() : '',
		priceDollars: listing.priceDollars || 0,
		primaryImageUuid: listing.primaryImageUuid || '',
		shopTitle: listing.shop.title,
	}));
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
