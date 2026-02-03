import { API_ROUTES } from '@common/constants';
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
router.get('/:id', getCategoryById);
router.get(
	`/:id/${API_ROUTES.categories.topLevel}`,
	getTopLevelCategories,
);
router.get(
	`/:id/${API_ROUTES.categories.children}`,
	getChildCategories,
);
router.get(
	`/:id/${API_ROUTES.categories.listings}`,
	getListingsByCategory,
);

export default router;
