import { API_ROUTES } from '@common/constants';
import { Router } from 'express';
import { fetchOrderStatus } from '../controllers/order.controller';

const router = Router();

router.get(`/:shortId/${API_ROUTES.orders.status}`, fetchOrderStatus);

export default router;
