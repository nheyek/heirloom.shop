import { Request, Response } from 'express';
import { ERROR_MESSAGES } from '../constants';
import { mapCategoryToApiResponseData } from '../mappers/category.mapper';
import { mapListingToApiResponseData } from '../mappers/listing.mapper';
import {
	findAllCategories,
	findCategoryById,
	findChildCategories,
	findTopLevelCategories,
} from '../services/category.service';
import * as listingService from '../services/listing.service';

export const getTopLevelCategories = async (
	req: Request,
	res: Response,
) => {
	const categories = await findTopLevelCategories();
	res.json(categories.map(mapCategoryToApiResponseData));
};

export const getCategoryById = async (
	req: Request,
	res: Response,
) => {
	const { id } = req.params;
	const category = await findCategoryById(id.toUpperCase());

	if (!category) {
		return res
			.status(404)
			.json({ error: ERROR_MESSAGES.category.notFound });
	}

	res.json(mapCategoryToApiResponseData(category));
};

export const getChildCategories = async (
	req: Request,
	res: Response,
) => {
	const { id } = req.params;
	const children = await findChildCategories(id.toUpperCase());
	res.json(children.map(mapCategoryToApiResponseData));
};

export const getListingsByCategory = async (
	req: Request,
	res: Response,
) => {
	const { id } = req.params;
	const listings = await listingService.findListingsByCategory(
		id.toUpperCase(),
	);
	res.json(listings.map(mapListingToApiResponseData));
};

export const getCategories = async (req: Request, res: Response) => {
	const categories = await findAllCategories();
	res.json(categories.map(mapCategoryToApiResponseData));
};
