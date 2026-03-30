import { CategoryTileData } from '@common/types/CategoryTileData';
import { ListingCategory } from '../entities/generated/ListingCategory';

export const mapCategoryToApiResponseData = (
	category: ListingCategory,
): CategoryTileData => ({
	id: category.id,
	parentId: category.parent?.id,
	title: category.title,
	imageUuid: category.imageUuid,
});
