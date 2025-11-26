import { Request, Response } from 'express';
import * as listingService from '../services/listing.service';

export const getAllListings = async (req: Request, res: Response) => {
	const listings = await listingService.findFeaturedListings();
	res.json(listings);
};

export const getListingById = async (req: Request, res: Response) => {
	const listing = await listingService.findListingById(Number(req.params.id));
	if (listing) {
		res.json(listing);
	} else {
		res.status(404).json({ message: 'Product not found' });
	}
};
