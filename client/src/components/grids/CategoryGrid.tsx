import { SimpleGrid, Skeleton, useBreakpointValue } from '@chakra-ui/react';
import { CategoryTileData } from '@common/types/CategoryTileData';
import { CategoryTile } from '../CategoryTile';

type Props = {
	isLoading: boolean;
	categories: CategoryTileData[];
	numPlaceholders?: number;
};

export const CategoryGrid = (props: Props) => {
	if (props.isLoading) {
		return <Skeleton width="100%" height={200} borderRadius={0} />;
	}

	if (!props.categories.length) {
		return null;
	}

	const cols = { base: 2, md: 3, lg: 4 };
	const maxNumColumns = useBreakpointValue(cols) || 1;
	const widthPercent = props.isLoading
		? 100
		: Math.min(100, 100 * (props.categories.length / maxNumColumns));

	return (
		<SimpleGrid
			columns={Math.min(props.categories.length, maxNumColumns)}
			overflow="hidden"
			width={`${widthPercent}%`}
		>
			{props.categories.map((category) => (
				<CategoryTile key={category.id} {...category} />
			))}
		</SimpleGrid>
	);
};
