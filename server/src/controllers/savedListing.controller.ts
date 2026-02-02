import { Request, Response } from 'express';
import { mapListingToListingCardData } from '../mappers/listing.mapper';
import * as listingService from '../services/listing.service';
import * as savedListingService from '../services/savedListing.service';
import * as userService from '../services/user.service';

export const saveListingByShortId = async (req: Request, res: Response) => {
	if (!req.userClaims?.email) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const shortId = req.params.id;
	const listing = await listingService.findFullListingDataByShortId(shortId);

	if (!listing) {
		return res.status(404).json({ message: 'Listing not found' });
	}

	const user = await userService.findUserByEmail(req.userClaims.email);
	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	await savedListingService.saveListing(user.id, listing.id);
	res.status(200).json({ saved: true });
};

export const unsaveListingByShortId = async (req: Request, res: Response) => {
	if (!req.userClaims?.email) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const shortId = req.params.id;
	const listing = await listingService.findFullListingDataByShortId(shortId);

	if (!listing) {
		return res.status(404).json({ message: 'Listing not found' });
	}

	const user = await userService.findUserByEmail(req.userClaims.email);
	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	await savedListingService.unsaveListing(user.id, listing.id);
	res.status(200).json({ saved: false });
};

export const getSavedListings = async (req: Request, res: Response) => {
	if (!req.userClaims?.email) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const user = await userService.findUserByEmail(req.userClaims.email);
	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	const listings = await savedListingService.getSavedListingsForUser(user.id);
	res.json(listings.map(mapListingToListingCardData));
};
