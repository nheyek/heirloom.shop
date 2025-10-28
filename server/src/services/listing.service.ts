import { getEm } from '../db';
import { Listing } from '../entities/Listing';
import { Shop } from '../entities/Shop';

export const findAllListings = async () => {
	const em = getEm();
	return em.find(Listing, {});
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
