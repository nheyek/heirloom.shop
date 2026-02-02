import { Router } from 'express';
import { getCartListings } from '../controllers/cart.controller';

const router = Router();

router.get('/listings', getCartListings);

export default router;
