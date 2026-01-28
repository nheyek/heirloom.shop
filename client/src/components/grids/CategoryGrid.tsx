import { SimpleGrid, Skeleton, useBreakpointValue } from '@chakra-ui/react';
import { CategoryTileData } from '@common/types/CategoryTileData';
import { STANDARD_IMAGE_ASPECT_RATIO } from '../../constants';
import { CategoryTile } from '../CategoryTile';

const DEFAULT_NUM_PLACEHOLDERS = 4;

type Props = {
	isLoading: boolean;
	categories: CategoryTileData[];
	numPlaceholders?: number;
};

export const CategoryGrid = (props: Props) => {
	const cols = { base: 2, md: 3, lg: 4 };
	const maxNumColumns = useBreakpointValue(cols) || 2;

	const numSkeletons = props.numPlaceholders || DEFAULT_NUM_PLACEHOLDERS;

	const numTiles = props.isLoading ? numSkeletons : props.categories.length;
	const widthPercent = Math.min(100, 100 * (numTiles / maxNumColumns));

	return (
		<SimpleGrid
			columns={Math.min(props.categories.length, maxNumColumns)}
			overflow="hidden"
			width={`${widthPercent}%`}
		>
			{props.isLoading
				? Array.from({ length: numSkeletons }).map((_, index) => (
						<Skeleton
							width="100%"
							aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
							borderRadius={0}
						/>
					))
				: props.categories.map((category) => (
						<CategoryTile key={category.id} {...category} />
					))}
		</SimpleGrid>
	);
};
