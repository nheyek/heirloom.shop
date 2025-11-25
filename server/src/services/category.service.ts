import { getEm } from '../db';
import { ListingCategory } from '../entities/ListingCategory';

export const findTopLevelCategories = async (): Promise<ListingCategory[]> => {
	const em = getEm();
	return em.find(ListingCategory, { parent: null });
};
