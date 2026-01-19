import { Request, Response } from 'express';
import {
	mapListingToListingCardData,
	mapListingToListingPageData,
} from '../mappers/listing.mapper';
import * as listingService from '../services/listing.service';

export const getAllListings = async (req: Request, res: Response) => {
	const listings = await listingService.findListingsComplete();
	res.json(listings.map(mapListingToListingCardData));
};

export const getListingById = async (req: Request, res: Response) => {
	const listingId = Number(req.params.id);
	const [listing, variations] = await Promise.all([
		listingService.findListingById(listingId),
		listingService.findListingVariations(listingId),
	]);
	if (listing) {
		res.json(mapListingToListingPageData(listing, variations));
	} else {
		res.status(404).json({ message: 'Product not found' });
	}
};
