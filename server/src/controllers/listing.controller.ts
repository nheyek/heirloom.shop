import { Request, Response } from 'express';
import { mapListingToListingCardData } from '../mappers/listing.mapper';
import * as listingService from '../services/listing.service';

export const getAllListings = async (req: Request, res: Response) => {
	const listings = await listingService.findListingsComplete();
	res.json(listings.map(mapListingToListingCardData));
};

export const getListingById = async (req: Request, res: Response) => {
	const listing = await listingService.findListingById(Number(req.params.id));
	if (listing) {
		res.json(listing);
	} else {
		res.status(404).json({ message: 'Product not found' });
	}
};
