import { cardGridColumns } from '@client/theme';
import { ReactNode } from 'react';
import { CategoryCard } from '@client/components/cards/CategoryCard';
import { ItemGrid } from '@client/components/collections/ItemGrid';
import { STANDARD_IMAGE_ASPECT_RATIO } from '@client/constants';
import { CategoryTileData } from '@heirloom/common/contract';

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
		columns={props.columns ?? cardGridColumns}
		center={props.center}
		header={props.header}
		skeletonAspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
		renderItem={(category) => <CategoryCard {...category} />}
	/>
);
