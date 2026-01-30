import { Router } from 'express';
import { getAllListings, getListingById } from '../controllers/listing.controller';
import {
	saveListingByShortId,
	unsaveListingByShortId,
} from '../controllers/savedListing.controller';
import { authAndSetUser } from '../middleware/auth0.middleware';

const router = Router();

router.get('/', getAllListings);
router.get('/:id', getListingById);
router.post('/:id/save', authAndSetUser, saveListingByShortId);
router.delete('/:id/save', authAndSetUser, unsaveListingByShortId);

export default router;
