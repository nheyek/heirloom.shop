import { Router } from 'express';
import { getAllProducts, getProductById } from '../controllers/product.controller';
import { authenticate } from '../middleware/auth0.middleware';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

export default router;
