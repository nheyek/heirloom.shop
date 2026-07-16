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
import { animationName } from '@client/theme';
import { ReactNode } from 'react';

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
		<Box
			key={key}
			minWidth={minItemWidth}
			maxWidth={maxItemWidth}
			animation={`${animationName.itemGridEnter} 0.25s ease-out`}
		>
			{child}
		</Box>
	);

	if (maxNumColumns === 1) {
		return (
			<HStack
				overflowX="auto"
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
