import { Router } from 'express';
import {
	getCategories,
	getCategoryById,
	getChildCategories,
	getListingsByCategory,
	getTopLevelCategories,
} from '../controllers/category.controller';

const router = Router();

router.get('/', getCategories);
router.get('/topLevel', getTopLevelCategories);
router.get('/:id', getCategoryById);
router.get('/:id/children', getChildCategories);
router.get('/:id/listings', getListingsByCategory);

export default router;
