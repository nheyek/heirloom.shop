import { getEm } from '../db';
import { UserFavoriteListing } from '../entities/generated/UserFavoriteListing';
import { Listing } from '../entities/generated/Listing';
import { AppUser } from '../entities/generated/AppUser';

export const favoriteListing = async (userId: number, listingId: number): Promise<void> => {
	const em = getEm();
	
	// Check if already favorited
	const existing = await em.findOne(UserFavoriteListing, {
		user: { id: userId },
		listing: { id: listingId },
	});
	
	if (existing) {
		return; // Already favorited, nothing to do
	}
	
	const favoritedListing = em.create(UserFavoriteListing, {
		user: em.getReference(AppUser, userId),
		listing: em.getReference(Listing, listingId),
	});
	
	await em.persistAndFlush(favoritedListing);
};

export const unfavoriteListing = async (userId: number, listingId: number): Promise<void> => {
	const em = getEm();
	
	const favoritedListing = await em.findOne(UserFavoriteListing, {
		user: { id: userId },
		listing: { id: listingId },
	});
	
	if (favoritedListing) {
		await em.removeAndFlush(favoritedListing);
	}
};

export const isListingFavorited = async (userId: number, listingId: number): Promise<boolean> => {
	const em = getEm();
	
	const favoritedListing = await em.findOne(UserFavoriteListing, {
		user: { id: userId },
		listing: { id: listingId },
	});
	
	return !!favoritedListing;
};

export const getFavoritedListingsForUser = async (userId: number): Promise<Listing[]> => {
	const em = getEm();
	
	const favoritedListings = await em.find(
		UserFavoriteListing,
		{ user: { id: userId } },
		{ populate: ['listing', 'listing.shop', 'listing.country'], orderBy: { createdAt: 'desc' } }
	);
	
	return favoritedListings.map(fl => fl.listing);
};
