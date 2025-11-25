import { CategoryCardData } from '@common/types/CategoryCardData';
import { ListingCategory } from '../entities/ListingCategory';

export const mapCategoryToCategoryCardData = (category: ListingCategory): CategoryCardData => ({
	id: category.id,
	title: category.title,
	imageUuid: category.imageUuid,
});
