import { Router } from 'express';
import { getCurrentUser } from '../controllers/user.controller';
import { getFavoritedListings } from '../controllers/favoriteListing.controller';
import { authAndSetUser } from '../middleware/auth0.middleware';

const router = Router();

router.get('/', authAndSetUser, getCurrentUser);
router.get(
	'/favorited-listings',
	authAndSetUser,
	getFavoritedListings,
);

export default router;
