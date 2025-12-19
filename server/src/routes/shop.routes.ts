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
router.get('/:id/listings', getListingsByShop);
router.post('/:id/listings', authAndSetUser, addListingToShop);

export default router;
