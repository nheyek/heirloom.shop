import {
	SimpleGrid,
	Skeleton,
	useBreakpointValue,
} from '@chakra-ui/react';
import { CategoryTileData } from '@common/types/CategoryTileData';
import { STANDARD_IMAGE_ASPECT_RATIO } from '../../constants';
import { CategoryTile } from '../itemDisplay/CategoryTile';

const NUM_DEFAULT_PLACEHOLDERS = 4;

type Props = {
	isLoading: boolean;
	categories: CategoryTileData[];
	numPlaceholders?: number;
};

export const CategoryGrid = (props: Props) => {
	if (!props.isLoading && props.categories.length === 0) {
		return null;
	}

	const maxNumColumns =
		useBreakpointValue({ base: 2, md: 3, lg: 4 }) || 2;
	const numColumns = Math.min(
		props.categories.length,
		maxNumColumns,
	);

	const widthPercent = Math.min(
		100,
		100 * (numColumns / maxNumColumns),
	);
	const numPlaceholderRows = Math.floor(
		NUM_DEFAULT_PLACEHOLDERS / maxNumColumns,
	);

	const skeletonAspectRatio =
		STANDARD_IMAGE_ASPECT_RATIO *
		(maxNumColumns / numPlaceholderRows);

	return (
		<Skeleton
			width="100%"
			aspectRatio={
				props.isLoading ? skeletonAspectRatio : undefined
			}
			borderRadius={0}
			loading={props.isLoading}
		>
			<SimpleGrid
				columns={numColumns}
				width={`${widthPercent}%`}
			>
				{props.categories.map((category) => (
					<CategoryTile
						key={category.id}
						{...category}
					/>
				))}
			</SimpleGrid>
		</Skeleton>
	);
};
