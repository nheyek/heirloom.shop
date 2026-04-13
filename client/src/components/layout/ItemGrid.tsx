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

const STAGGER_INTERVAL = 0.06;

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
	const numColumns = isLoading || items.length === 0
		? maxNumColumns
		: Math.min(maxNumColumns, items.length);
	const placeholderCount = numPlaceholders ?? numColumns * 2;

	const animatedItem = (child: ReactNode, index: number, minWidth?: number) => (
		<MotionBox
			minWidth={minWidth}
			initial={{ opacity: 0, y: -16, rotateZ: -1 }}
			animate={{ opacity: 1, y: 0, rotateZ: 0 }}
			transition={{
				type: 'spring',
				stiffness: 300,
				damping: 24,
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
						<Skeleton width={300} height={300} />
						<Skeleton width={300} height={300} />
					</>
				)}
				{items.map((item, index) =>
					animatedItem(renderItem(item, true), index, 300),
				)}
			</HStack>
		);
	}

	return (
		<SimpleGrid
			gap={STANDARD_GRID_GAP}
			columns={numColumns}
			alignItems="start"
			width="fit-content"
		>
			{isLoading &&
				Array.from({ length: placeholderCount }).map((_, i) => (
					<Skeleton key={i} width={300} height={300} />
				))}
			{items.map((item, index) =>
				animatedItem(renderItem(item, false), index),
			)}
		</SimpleGrid>
	);
};
