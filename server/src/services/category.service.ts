import { getEm } from '../db';
import { ListingCategory } from '../entities/ListingCategory';

export const findTopLevelCategories = async (): Promise<ListingCategory[]> => {
	const em = getEm();
	return em.find(ListingCategory, { parent: null });
};

export const findCategoryById = async (id: string): Promise<ListingCategory | null> => {
	const em = getEm();
	return em.findOne(ListingCategory, { id }, { populate: ['parent'] });
};

export const findChildCategories = async (parentId: string): Promise<ListingCategory[]> => {
	const em = getEm();
	return em.find(ListingCategory, { parent: { id: parentId } });
};
