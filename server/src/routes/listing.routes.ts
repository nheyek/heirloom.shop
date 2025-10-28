import { Router } from 'express';
import { getAllListings, getListingById } from '../controllers/listing.controller';

const router = Router();

router.get('/', getAllListings);
router.get('/:id', getListingById);

export default router;
