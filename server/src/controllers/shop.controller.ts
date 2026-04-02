import { ShopProfile } from '@common/types/ShopProfile';
import { Request, Response } from 'express';
import { ERROR_MESSAGES } from '../constants';
import { mapListingToApiResponseData } from '../mappers/listing.mapper';
import { mapShopToApiResponseData } from '../mappers/shop.mapper';
import * as listingService from '../services/listing.service';
import * as productService from '../services/listing.service';
import * as shopService from '../services/shop.service';

export const getAllShops = async (req: Request, res: Response) => {
	const shops = await shopService.findShops();
	res.json(shops.map(mapShopToApiResponseData));
};

export const getShop = async (req: Request, res: Response) => {
	const shortId = req.params.id;
	const shop = await shopService.findShopByShortId(shortId);
	if (!shop) {
		return res
			.status(404)
			.json({ message: ERROR_MESSAGES.shop.notFound });
	}
	res.json(mapShopToApiResponseData(shop));
};

export const getListingsByShop = async (
	req: Request,
	res: Response,
) => {
	const shortId = req.params.id;
	const shop = await shopService.findShopByShortId(shortId);
	if (!shop) {
		return res
			.status(404)
			.json({ message: ERROR_MESSAGES.shop.notFound });
	}
	const listings = await listingService.findListingsByShop(shop.id);
	return res.json(listings.map(mapListingToApiResponseData));
};

export const addListingToShop = async (
	req: Request,
	res: Response,
) => {
	if (!req.userClaims?.email) {
		return res.status(401);
	}

	const shortId = req.params.id;
	const shop = await shopService.findShopByShortId(shortId);
	if (!shop) {
		return res
			.status(404)
			.json({ message: ERROR_MESSAGES.shop.notFound });
	}

	try {
		await shopService.authorizeShopAction(
			shop.id,
			req.userClaims.email,
		);
	} catch (e) {
		return res.status(403).json({
			message: ERROR_MESSAGES.shop.forbidden,
		});
	}

	const profileApiRequest = req.body as ShopProfile;
	const id = await productService.createListing(
		profileApiRequest,
		shop.id,
	);

	res.status(201).json({ id });
};
