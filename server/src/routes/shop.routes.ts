import { Router } from 'express';
import { addListingToShop, getAllShops, getShopProfile } from '../controllers/shop.controller';
import { authAndSetUser } from '../middleware/auth0.middleware';

const router = Router();

router.get('/', getAllShops);
router.get('/:id', getShopProfile);
router.post('/:id/listings', authAndSetUser, addListingToShop);

export default router;
