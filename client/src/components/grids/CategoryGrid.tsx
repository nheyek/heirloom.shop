import { SimpleGrid, Skeleton, useBreakpointValue } from '@chakra-ui/react';
import { CategoryTileData } from '@common/types/CategoryTileData';
import { STANDARD_IMAGE_ASPECT_RATIO } from '../../constants';
import { CategoryTile } from '../CategoryTile';

const NUM_DEFAULT_PLACEHOLDERS = 4;

type Props = {
	isLoading: boolean;
	categories: CategoryTileData[];
	numPlaceholders?: number;
};

export const CategoryGrid = (props: Props) => {
	const maxNumColumns = useBreakpointValue({ base: 2, md: 3, lg: 4 }) || 2;
	const numColumns = Math.min(props.categories.length, maxNumColumns);

	const widthPercent = Math.min(100, 100 * (numColumns / maxNumColumns));

	const numPlaceholderRows = Math.floor(NUM_DEFAULT_PLACEHOLDERS / maxNumColumns);

	return (
		<Skeleton
			width="100%"
			aspectRatio={STANDARD_IMAGE_ASPECT_RATIO * (maxNumColumns / numPlaceholderRows)}
			borderRadius={0}
			loading={props.isLoading}
		>
			<SimpleGrid columns={numColumns} overflow="hidden" width={`${widthPercent}%`}>
				{props.categories.map((category) => (
					<CategoryTile key={category.id} {...category} />
				))}
			</SimpleGrid>
		</Skeleton>
	);
};
