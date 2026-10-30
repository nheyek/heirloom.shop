import {
	Box,
	Flex,
	HStack,
	SimpleGrid,
	Skeleton,
	Stack,
	useBreakpointValue,
} from '@chakra-ui/react';
import { GridPagination } from '@client/components/collections/GridPagination';
import {
	STANDARD_GRID_COLUMNS,
	STANDARD_GRID_GAP,
} from '@client/constants';
import { animationName, scrollTargetOffset } from '@client/theme';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ReactNode, useEffect, useRef, useState } from 'react';

const NUM_SKELETON_ROWS = 2;
const SPACING_UNIT_PX = 4;
const MOBILE_CARD_WIDTH = 275;
const MOBILE_OVERSCAN = 3;
const GRID_GAP_PX = STANDARD_GRID_GAP * SPACING_UNIT_PX;

type Props<T> = {
	items: T[];
	renderItem: (item: T, isMobile: boolean) => ReactNode;
	getItemKey: (item: T, index: number) => React.Key;
	isLoading: boolean;
	numPlaceholders?: number;
	columns?: Record<string, number>;
	maxItemWidth?: number;
	skeletonAspectRatio?: number;
	pageSize?: number;
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
	const numSkeletons =
		numPlaceholders ?? numColumns * NUM_SKELETON_ROWS;

	const minItemWidth = 275;
	const maxItemWidth = props.maxItemWidth ?? 400;

	const isMobile = maxNumColumns === 1;
	const scrollRef = useRef<HTMLDivElement>(null);
	const virtualizer = useVirtualizer({
		count: items.length,
		horizontal: true,
		enabled: isMobile,
		getScrollElement: () => scrollRef.current,
		estimateSize: () => MOBILE_CARD_WIDTH,
		gap: GRID_GAP_PX,
		overscan: MOBILE_OVERSCAN,
		initialRect: { width: window.innerWidth, height: 0 },
	});

	const [page, setPage] = useState(1);
	const gridRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		virtualizer.scrollToOffset(0);
		setPage(1);
	}, [items]);

	const onPageChange = (nextPage: number) => {
		setPage(nextPage);
		gridRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	const pagedItems = props.pageSize
		? items.slice(
				(page - 1) * props.pageSize,
				page * props.pageSize,
			)
		: items;
	const showPagination =
		!!props.pageSize &&
		!isLoading &&
		items.length > props.pageSize;

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

	if (isMobile) {
		const visibleItems = isLoading
			? []
			: virtualizer.getVirtualItems();
		const lastVisibleItem = visibleItems[visibleItems.length - 1];
		const paddingStart = visibleItems[0]?.start ?? 0;
		const paddingEnd = lastVisibleItem
			? virtualizer.getTotalSize() - lastVisibleItem.end
			: 0;

		return (
			<Box
				ref={scrollRef}
				overflowX="auto"
				p={5}
				m={-5}
				scrollbarWidth="none"
			>
				<HStack
					alignItems="start"
					width="max-content"
					gap={STANDARD_GRID_GAP}
					pl={`${paddingStart}px`}
					pr={`${paddingEnd}px`}
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
					{visibleItems.map((virtualItem) => (
						<Box
							key={getItemKey(
								items[virtualItem.index],
								virtualItem.index,
							)}
							width={MOBILE_CARD_WIDTH}
							flexShrink={0}
						>
							{renderItem(
								items[virtualItem.index],
								true,
							)}
						</Box>
					))}
				</HStack>
			</Box>
		);
	}

	return (
		<Stack
			ref={gridRef}
			width="100%"
			scrollMarginTop={scrollTargetOffset}
			gap={5}
		>
			<SimpleGrid
				gap={STANDARD_GRID_GAP}
				columns={numColumns}
				alignItems="start"
				width="100%"
			>
				{isLoading &&
					Array.from({ length: numSkeletons }).map(
						(_, i) => (
							<Skeleton
								key={i}
								width="100%"
								aspectRatio={skeletonAspectRatio}
							/>
						),
					)}
				{!isLoading &&
					pagedItems.map((item, index) =>
						animatedItem(
							renderItem(item, false),
							getItemKey(item, index),
						),
					)}
			</SimpleGrid>
			{showPagination && props.pageSize && (
				<Flex
					justifyContent="center"
					pt={STANDARD_GRID_GAP}
				>
					<GridPagination
						count={items.length}
						pageSize={props.pageSize}
						page={page}
						onPageChange={onPageChange}
					/>
				</Flex>
			)}
		</Stack>
	);
};
