import { getEm } from '../db';
import { UserSavedListing } from '../entities/generated/UserSavedListing';
import { Listing } from '../entities/generated/Listing';
import { AppUser } from '../entities/generated/AppUser';

export const saveListing = async (userId: number, listingId: number): Promise<void> => {
	const em = getEm();
	
	// Check if already saved
	const existing = await em.findOne(UserSavedListing, {
		user: { id: userId },
		listing: { id: listingId },
	});
	
	if (existing) {
		return; // Already saved, nothing to do
	}
	
	const savedListing = em.create(UserSavedListing, {
		user: em.getReference(AppUser, userId),
		listing: em.getReference(Listing, listingId),
	});
	
	await em.persistAndFlush(savedListing);
};

export const unsaveListing = async (userId: number, listingId: number): Promise<void> => {
	const em = getEm();
	
	const savedListing = await em.findOne(UserSavedListing, {
		user: { id: userId },
		listing: { id: listingId },
	});
	
	if (savedListing) {
		await em.removeAndFlush(savedListing);
	}
};

export const isListingSaved = async (userId: number, listingId: number): Promise<boolean> => {
	const em = getEm();
	
	const savedListing = await em.findOne(UserSavedListing, {
		user: { id: userId },
		listing: { id: listingId },
	});
	
	return !!savedListing;
};

export const getSavedListingsForUser = async (userId: number): Promise<Listing[]> => {
	const em = getEm();
	
	const savedListings = await em.find(
		UserSavedListing,
		{ user: { id: userId } },
		{ populate: ['listing', 'listing.shop', 'listing.country'], orderBy: { createdAt: 'desc' } }
	);
	
	return savedListings.map(sl => sl.listing);
};
