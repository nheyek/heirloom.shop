import { API_ROUTES } from '@heirloom/common/constants';
import { Router } from 'express';
import { handleStripeWebhook } from '@server/controllers/webhook.controller';

const router = Router();

router.post(`/${API_ROUTES.webhooks.stripe}`, handleStripeWebhook);

export default router;
