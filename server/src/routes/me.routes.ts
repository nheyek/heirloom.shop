import { Router } from 'express';
import { getCurrentUser } from '../controllers/user.controller';
import { getSavedListings } from '../controllers/savedListing.controller';
import { authAndSetUser } from '../middleware/auth0.middleware';

const router = Router();

router.get('/', authAndSetUser, getCurrentUser);
router.get('/saved-listings', authAndSetUser, getSavedListings);

export default router;
