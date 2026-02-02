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
	const shortId = req.params.id;
	const listing = await listingService.findFullListingDataByShortId(shortId);
	if (!listing) {
		return res.status(404).json({ message: 'Product not found' });
	}
	const variations = await listingService.findListingVariations(listing.id);
	res.json(mapListingToListingPageData(listing, variations));
};
