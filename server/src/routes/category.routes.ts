import { Router } from 'express';
import { getTopLevelCategories } from '../controllers/category.controller';

const router = Router();

router.get('/topLevel', getTopLevelCategories);

export default router;
