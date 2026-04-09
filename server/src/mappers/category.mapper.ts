import { CategoryTileData } from '@common/contract';
import { ListingCategory } from '@server/entities/generated/ListingCategory';

export const mapCategoryToApiResponseData = (
	category: ListingCategory,
): CategoryTileData => ({
	id: category.id,
	parentId: category.parent?.id,
	title: category.title,
	imageUuid: category.imageUuid,
});
