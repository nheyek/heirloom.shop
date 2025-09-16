import { Router } from 'express';
import { getCurrentUser } from '../controllers/user.controller';
import { authAndSetUser } from '../middleware/auth0.middleware';

const router = Router();

router.get('/', authAndSetUser, getCurrentUser);

export default router;
