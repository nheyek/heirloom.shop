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
	const numColumns = isLoading
		? maxNumColumns
		: Math.min(maxNumColumns, items.length);
	const numSkeletons = numPlaceholders ?? numColumns * 2;

	const animatedItem = (
		child: ReactNode,
		key: React.Key,
		index: number,
	) => (
		<MotionBox
			key={key}
			minWidth={300}
			maxWidth={400}
			initial={{ opacity: 0, y: -10, scale: 0.95 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
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
				overflowX="scroll"
				gap={STANDARD_GRID_GAP}
				p={5}
				m={-5}
				scrollbarWidth="none"
			>
				{isLoading && (
					<>
						<Skeleton
							width={300}
							height={300}
						/>
						<Skeleton
							width={300}
							height={300}
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
						minWidth={300}
						maxWidth={400}
						height={300}
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
