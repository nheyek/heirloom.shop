import { Request, Response } from 'express';
import { mapListingToListingCardData } from '../mappers/listing.mapper';
import * as listingService from '../services/listing.service';
import * as favoriteListingService from '../services/favoriteListing.service';
import * as userService from '../services/user.service';

export const favoriteListingByShortId = async (req: Request, res: Response) => {
	if (!req.userClaims?.email) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const shortId = req.params.id;
	const listing = await listingService.findListingByShortId(shortId);

	if (!listing) {
		return res.status(404).json({ message: 'Listing not found' });
	}

	const user = await userService.findUserByEmail(req.userClaims.email);
	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	await favoriteListingService.favoriteListing(user.id, listing.id);
	res.status(200).json({ favorited: true });
};

export const unfavoriteListingByShortId = async (req: Request, res: Response) => {
	if (!req.userClaims?.email) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const shortId = req.params.id;
	const listing = await listingService.findListingByShortId(shortId);

	if (!listing) {
		return res.status(404).json({ message: 'Listing not found' });
	}

	const user = await userService.findUserByEmail(req.userClaims.email);
	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	await favoriteListingService.unfavoriteListing(user.id, listing.id);
	res.status(200).json({ favorited: false });
};

export const getFavoritedListings = async (req: Request, res: Response) => {
	if (!req.userClaims?.email) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const user = await userService.findUserByEmail(req.userClaims.email);
	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	const listings = await favoriteListingService.getFavoritedListingsForUser(user.id);
	res.json(listings.map(mapListingToListingCardData));
};
