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

type Props<T> = {
	items: T[];
	renderItem: (item: T, isMobile: boolean) => ReactNode;
	getItemKey: (item: T, index: number) => React.Key;
	isLoading: boolean;
	numPlaceholders?: number;
	columns?: Record<string, number>;
	maxItemWidth?: number;
	skeletonAspectRatio?: number;
};

export const ItemGrid = <T,>(props: Props<T>) => {
	const {
		items,
		renderItem,
		getItemKey,
		isLoading,
		numPlaceholders,
		columns = STANDARD_GRID_COLUMNS,
		skeletonAspectRatio = 1,
	} = props;

	const maxNumColumns = useBreakpointValue(columns) ?? 1;
	const numColumns = maxNumColumns;
	const numSkeletons = numPlaceholders ?? numColumns;

	const minItemWidth = 275;
	const maxItemWidth = props.maxItemWidth ?? 400;

	const animatedItem = (child: ReactNode, key: React.Key) => (
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
				alignItems="start"
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
							aspectRatio={skeletonAspectRatio}
						/>
						<Skeleton
							width={minItemWidth}
							aspectRatio={skeletonAspectRatio}
						/>
					</>
				)}
				{items.map((item, index) =>
					animatedItem(
						renderItem(item, true),
						getItemKey(item, index),
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
			width="100%"
		>
			{isLoading &&
				Array.from({ length: numSkeletons }).map((_, i) => (
					<Skeleton
						key={i}
						width="100%"
						aspectRatio={skeletonAspectRatio}
					/>
				))}
			{!isLoading &&
				items.map((item, index) =>
					animatedItem(
						renderItem(item, false),
						getItemKey(item, index),
					),
				)}
		</SimpleGrid>
	);
};
