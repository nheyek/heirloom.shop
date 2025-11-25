import { mapCategoryToCategoryCardData } from '../mappers/category.mapper';
import { findTopLevelCategories } from '../services/category.service';
import { Request, Response } from 'express';

export const getTopLevelCategories = async (req: Request, res: Response) => {
	const categories = await findTopLevelCategories();
	res.json(categories.map(mapCategoryToCategoryCardData));
};
