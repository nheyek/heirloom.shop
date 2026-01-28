import { Box, SimpleGrid, Skeleton, useBreakpointValue } from '@chakra-ui/react';
import { CategoryTileData } from '@common/types/CategoryTileData';
import { motion } from 'framer-motion';
import { STANDARD_IMAGE_ASPECT_RATIO } from '../../constants';
import { CategoryTile } from '../CategoryTile';

const NUM_DEFAULT_PLACEHOLDERS = 4;

type Props = {
	isLoading: boolean;
	categories: CategoryTileData[];
	numPlaceholders?: number;
};

const MotionBox = motion.create(Box);

export const CategoryGrid = (props: Props) => {
	const maxNumColumns = useBreakpointValue({ base: 2, md: 3, lg: 4 }) || 2;
	const numColumns = Math.min(props.categories.length, maxNumColumns);

	const widthPercent = Math.min(100, 100 * (numColumns / maxNumColumns));

	const numPlaceholderRows = Math.floor(NUM_DEFAULT_PLACEHOLDERS / maxNumColumns);

	return props.isLoading ? (
		<Skeleton
			width="100%"
			aspectRatio={STANDARD_IMAGE_ASPECT_RATIO * (maxNumColumns / numPlaceholderRows)}
			borderRadius={0}
		/>
	) : (
		<MotionBox
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1, ease: 'easeInOut' }}
		>
			<SimpleGrid columns={numColumns} overflow="hidden" width={`${widthPercent}%`}>
				{props.categories.map((category) => (
					<CategoryTile key={category.id} {...category} />
				))}
			</SimpleGrid>
		</MotionBox>
	);
};
