import { CartListingData } from '@common/types/CartListingData';
import { Request, Response } from 'express';
import { mapListingToCartListingData } from '../mappers/listing.mapper';
import * as listingService from '../services/listing.service';

export const getCartListings = async (req: Request, res: Response) => {
	const idsParam = req.query.ids;

	if (!idsParam || typeof idsParam !== 'string') {
		return res.status(400).json({ message: 'ids query parameter is required' });
	}

	const shortIds = idsParam
		.split(',')
		.map((id) => id.trim())
		.filter((id) => id);

	if (shortIds.length === 0) {
		return res.json([]);
	}

	const cartListings: CartListingData[] = [];
	const listings = await listingService.findListingsByShortIds(shortIds);
	listings.forEach(async (listing) => {
		const variations = await listingService.findListingVariations(listing.id);
		cartListings.push(mapListingToCartListingData(listing, variations));
	});

	res.json(cartListings);
};
