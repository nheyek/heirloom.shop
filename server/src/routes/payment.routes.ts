import { Router } from 'express';
import { API_ROUTES } from '../../../common/constants';
import { createPaymentIntent } from '../controllers/payment.controller';

const router = Router();
router.post(`/${API_ROUTES.payment.intent}`, createPaymentIntent);

export default router;
