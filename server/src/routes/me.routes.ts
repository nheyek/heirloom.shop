import { API_ROUTES } from '@common/constants';
import { Router } from 'express';
import { getFavoritedListings } from '../controllers/favoriteListing.controller';
import { getCurrentUser } from '../controllers/user.controller';
import { authAndSetUser } from '../middleware/auth0.middleware';

const router = Router();

router.get('/', authAndSetUser, getCurrentUser);
router.get(
	`/${API_ROUTES.currentUser.favorites}`,
	authAndSetUser,
	getFavoritedListings,
);

export default router;
