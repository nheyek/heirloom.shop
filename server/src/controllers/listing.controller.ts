import { Request, Response } from 'express';
import { ERROR_MESSAGES } from '../constants';
import {
	mapListingToApiResponseData,
	mapListingToCompleteApiResponseData,
} from '../mappers/listing.mapper';
import * as listingService from '../services/listing.service';

export const getAllListings = async (req: Request, res: Response) => {
	const listings = await listingService.findListingsComplete();
	res.json(listings.map(mapListingToApiResponseData));
};

export const getListingById = async (req: Request, res: Response) => {
	const shortId = req.params.id;
	const listing =
		await listingService.findFullListingDataByShortId(shortId);
	if (!listing) {
		return res.status(404).json({ message: ERROR_MESSAGES.listing.notFound });
	}
	const variations = await listingService.findListingVariations(
		listing.id,
	);
	res.json(
		mapListingToCompleteApiResponseData(listing, variations),
	);
};
