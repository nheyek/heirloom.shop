import { CategoryCard } from '@client/components/cards/CategoryCard';
import { ItemGrid } from '@client/components/collections/ItemGrid';
import {
	CARD_GRID_COLUMNS,
	STANDARD_IMAGE_ASPECT_RATIO,
} from '@client/constants';
import { CategoryTileData } from '@heirloom/common/contract';
import { ReactNode } from 'react';

type Props = {
	categories: CategoryTileData[];
	isLoading: boolean;
	columns?: Record<string, number>;
	center?: boolean;
	header?: ReactNode;
};

export const CategoryGrid = (props: Props) => (
	<ItemGrid
		items={props.categories}
		isLoading={props.isLoading}
		getItemKey={(category) => category.id}
		columns={props.columns ?? CARD_GRID_COLUMNS}
		center={props.center}
		header={props.header}
		skeletonAspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
		numPlaceholders={4}
		renderItem={(category) => <CategoryCard {...category} />}
	/>
);
