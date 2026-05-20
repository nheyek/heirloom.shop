import { handleStripeWebhook } from '@server/controllers/webhook.controller';
import { Router } from 'express';

const router = Router();

router.post(`/stripe`, handleStripeWebhook);

export default router;
