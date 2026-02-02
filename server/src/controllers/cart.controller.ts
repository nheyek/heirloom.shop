import { Request, Response } from 'express';
import { mapListingToCartListingData } from '../mappers/listing.mapper';
import * as listingService from '../services/listing.service';

export const getCartListings = async (req: Request, res: Response) => {
	const idsParam = req.query.ids;

	if (!idsParam || typeof idsParam !== 'string') {
		return res.status(400).json({ message: 'ids query parameter is required' });
	}

	const shortIds = idsParam.split(',').map(id => id.trim()).filter(Boolean);

	if (shortIds.length === 0) {
		return res.json([]);
	}

	const listingsMap = await listingService.findListingsWithVariationsByShortIds(shortIds);

	const cartListings = Array.from(listingsMap.values()).map(({ listing, variations }) =>
		mapListingToCartListingData(listing, variations)
	);

	res.json(cartListings);
};
