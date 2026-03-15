import { Router } from 'express';
import { API_ROUTES } from '../../../common/constants';
import { calculateTax } from '../controllers/tax.controller';

const router = Router();

router.post(`/${API_ROUTES.tax.calculate}`, calculateTax);

export default router;
