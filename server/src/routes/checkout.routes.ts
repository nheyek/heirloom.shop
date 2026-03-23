import { API_ROUTES } from '@common/constants';
import { Router } from 'express';
import {
	calculateTax,
	submitOrder,
} from '../controllers/checkout.controller';

const router = Router();

router.post(`/${API_ROUTES.checkout.calculateTax}`, calculateTax);
router.post(`/${API_ROUTES.checkout.submitOrder}`, submitOrder);

export default router;
