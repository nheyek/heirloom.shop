import { Router } from 'express';
import { getAllListings, getListingById } from '../controllers/listing.controller';
import {
	favoriteListingByShortId,
	unfavoriteListingByShortId,
} from '../controllers/favoriteListing.controller';
import { authAndSetUser } from '../middleware/auth0.middleware';

const router = Router();

router.get('/', getAllListings);
router.get('/:id', getListingById);
router.post('/:id/save', authAndSetUser, favoriteListingByShortId);
router.delete('/:id/save', authAndSetUser, unfavoriteListingByShortId);

export default router;
