import { CategoryCard } from '@client/components/cards/CategoryCard';
import { ItemGrid } from '@client/components/collections/ItemGrid';
import {
	STANDARD_GRID_COLUMNS,
	STANDARD_IMAGE_ASPECT_RATIO,
} from '@client/constants';
import { CategoryTileData } from '@heirloom/common/contract';

type Props = {
	categories: CategoryTileData[];
	isLoading: boolean;
	columns?: Record<string, number>;
};

export const CategoryCardGrid = (props: Props) => (
	<ItemGrid
		items={props.categories}
		isLoading={props.isLoading}
		getItemKey={(category) => category.id}
		columns={props.columns ?? STANDARD_GRID_COLUMNS}
		skeletonAspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
		renderItem={(category) => <CategoryCard {...category} />}
	/>
);
