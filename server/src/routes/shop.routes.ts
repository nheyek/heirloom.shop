import { API_ROUTES } from '@common/constants';
import { Router } from 'express';
import {
	addListingToShop,
	getAllShops,
	getListingsByShop,
	getShop,
} from '../controllers/shop.controller';
import { authAndSetUser } from '../middleware/auth0.middleware';

const router = Router();

router.get('/', getAllShops);
router.get('/:id', getShop);
router.get(
	`/:id/${API_ROUTES.shops.listings}`,
	getListingsByShop,
);
router.post(
	`/:id/${API_ROUTES.shops.listings}`,
	authAndSetUser,
	addListingToShop,
);

export default router;
