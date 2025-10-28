import * as shopService from '../services/shop.service';
import * as productService from '../services/listing.service';
import { Request, Response } from 'express';
import { ShopProfile } from '@common/types/ShopProfile';

export const getShopProfile = async (req: Request, res: Response) => {
	const shop = await shopService.findShopById(Number(req.params.id));
	if (!shop) {
		res.status(404).json({ message: 'Shop not found' });
	}
	res.json({ name: shop?.title });
};

export const addListingToShop = async (req: Request, res: Response) => {
	if (!req.userClaims?.email) {
		return res.status(401).json({ message: 'Unauthorized: Missing email claim' });
	}

	const shopId = Number(req.params.id);
	try {
		shopService.authorizeShopAction(shopId, req.userClaims.email);
	} catch (e) {
		res.status(403).json({
			message: 'Forbidden: You do not have permission to perform this action on the shop',
		});
	}

	const profileApiRequest = req.body as ShopProfile;
	const id = productService.createListing(profileApiRequest, shopId);

	res.status(201).json({ id });
};
