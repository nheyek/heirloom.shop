import { ShopProfile } from '@common/types/ShopProfile';
import { Request, Response } from 'express';
import { mapListingToListingCardData } from '../mappers/listing.mapper';
import { mapShopToShopCardData } from '../mappers/shop.mapper';
import * as listingService from '../services/listing.service';
import * as productService from '../services/listing.service';
import * as shopService from '../services/shop.service';

export const getAllShops = async (req: Request, res: Response) => {
	const shops = await shopService.findShops();
	res.json(shops.map(mapShopToShopCardData));
};

export const getShop = async (req: Request, res: Response) => {
	const shortId = req.params.id;
	const shop = await shopService.findShopByShortId(shortId);
	if (!shop) {
		return res.status(404).json({ message: 'Shop not found' });
	}
	res.json(mapShopToShopCardData(shop));
};

export const getListingsByShop = async (req: Request, res: Response) => {
	const shortId = req.params.id;
	const shop = await shopService.findShopByShortId(shortId);
	if (!shop) {
		return res.status(404).json({ message: 'Shop not found' });
	}
	const listings = await listingService.findListingsByShop(shop.id);
	return res.json(listings.map(mapListingToListingCardData));
};

export const addListingToShop = async (req: Request, res: Response) => {
	if (!req.userClaims?.email) {
		return res.status(401).json({ message: 'Unauthorized: Missing email claim' });
	}

	const shortId = req.params.id;
	const shop = await shopService.findShopByShortId(shortId);
	if (!shop) {
		return res.status(404).json({ message: 'Shop not found' });
	}

	try {
		shopService.authorizeShopAction(shop.id, req.userClaims.email);
	} catch (e) {
		res.status(403).json({
			message: 'Forbidden: You do not have permission to perform this action on the shop',
		});
	}

	const profileApiRequest = req.body as ShopProfile;
	const id = productService.createListing(profileApiRequest, shop.id);

	res.status(201).json({ id });
};
