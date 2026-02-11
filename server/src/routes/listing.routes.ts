import { API_ROUTES } from '@common/constants';
import { Router } from 'express';
import {
	favoriteListingByShortId,
	unfavoriteListingByShortId,
} from '../controllers/favoriteListing.controller';
import {
	getAllListings,
	getListingById,
} from '../controllers/listing.controller';
import { authAndSetUser } from '../middleware/auth0.middleware';

const router = Router();

router.get('/', getAllListings);
router.get('/:id', getListingById);
router.post(
	`/:id/${API_ROUTES.listings.favorite}`,
	authAndSetUser,
	favoriteListingByShortId,
);
router.delete(
	`/:id/${API_ROUTES.listings.favorite}`,
	authAndSetUser,
	unfavoriteListingByShortId,
);

export default router;
