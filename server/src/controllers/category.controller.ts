import { Request, Response } from 'express';
import { mapCategoryToCategoryCardData } from '../mappers/category.mapper';
import { mapListingToListingCardData } from '../mappers/listing.mapper';
import {
	findCategoryById,
	findChildCategories,
	findTopLevelCategories,
} from '../services/category.service';
import * as listingService from '../services/listing.service';

export const getTopLevelCategories = async (req: Request, res: Response) => {
	const categories = await findTopLevelCategories();
	res.json(categories.map(mapCategoryToCategoryCardData));
};

export const getCategoryById = async (req: Request, res: Response) => {
	const { id } = req.params;
	const category = await findCategoryById(id.toUpperCase());

	if (!category) {
		return res.status(404).json({ error: 'Category not found' });
	}

	res.json(mapCategoryToCategoryCardData(category));
};

export const getChildCategories = async (req: Request, res: Response) => {
	const { id } = req.params;
	const children = await findChildCategories(id.toUpperCase());
	res.json(children.map(mapCategoryToCategoryCardData));
};

export const getListingsByCategory = async (req: Request, res: Response) => {
	const { id } = req.params;
	const listings = await listingService.findListingsByCategory(id.toUpperCase());
	res.json(listings.map(mapListingToListingCardData));
};
