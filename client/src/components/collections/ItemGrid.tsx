import {
	Box,
	HStack,
	SimpleGrid,
	Skeleton,
	useBreakpointValue,
} from '@chakra-ui/react';
import {
	STANDARD_GRID_COLUMNS,
	STANDARD_GRID_GAP,
} from '@client/constants';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const MotionBox = motion.create(Box);

const STAGGER_INTERVAL = 0;

type Props<T> = {
	items: T[];
	renderItem: (item: T, isMobile: boolean) => ReactNode;
	getItemKey: (item: T, index: number) => React.Key;
	isLoading: boolean;
	numPlaceholders?: number;
	columns?: Record<string, number>;
	maxItemWidth?: number;
};

export const ItemGrid = <T,>(props: Props<T>) => {
	const {
		items,
		renderItem,
		getItemKey,
		isLoading,
		numPlaceholders,
		columns = STANDARD_GRID_COLUMNS,
	} = props;

	const maxNumColumns = useBreakpointValue(columns) ?? 1;
	const numColumns = maxNumColumns;
	const numSkeletons = numPlaceholders ?? numColumns;

	const minItemWidth = 275;
	const maxItemWidth = props.maxItemWidth ?? 400;

	const animatedItem = (
		child: ReactNode,
		key: React.Key,
		index: number,
	) => (
		<MotionBox
			key={key}
			minWidth={minItemWidth}
			maxWidth={maxItemWidth}
			initial={{ y: -10, scale: 0.95 }}
			animate={{ y: 0, scale: 1 }}
			transition={{
				duration: 0.25,
				ease: 'easeOut',
				delay: index * STAGGER_INTERVAL,
			}}
		>
			{child}
		</MotionBox>
	);

	if (maxNumColumns === 1) {
		return (
			<HStack
				overflow="visible"
				gap={STANDARD_GRID_GAP}
				p={5}
				m={-5}
				scrollbarWidth="none"
			>
				{isLoading && (
					<>
						<Skeleton
							width={minItemWidth}
							height={minItemWidth}
						/>
						<Skeleton
							width={minItemWidth}
							height={minItemWidth}
						/>
					</>
				)}
				{items.map((item, index) =>
					animatedItem(
						renderItem(item, true),
						getItemKey(item, index),
						index,
					),
				)}
			</HStack>
		);
	}

	return (
		<SimpleGrid
			gap={STANDARD_GRID_GAP}
			columns={numColumns}
			alignItems="start"
			width={isLoading ? '100%' : 'fit-content'}
		>
			{isLoading &&
				Array.from({ length: numSkeletons }).map((_, i) => (
					<Skeleton
						key={i}
						width="100%"
						aspectRatio={1}
					/>
				))}
			{!isLoading &&
				items.map((item, index) =>
					animatedItem(
						renderItem(item, false),
						getItemKey(item, index),
						index,
					),
				)}
		</SimpleGrid>
	);
};
