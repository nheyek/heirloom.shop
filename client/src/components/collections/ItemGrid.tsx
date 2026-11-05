import {
	Box,
	Flex,
	HStack,
	SimpleGrid,
	Stack,
	useBreakpointValue,
} from '@chakra-ui/react';
import { CardSkeleton } from '@client/components/cards/CardSkeleton';
import { GridPagination } from '@client/components/collections/GridPagination';
import {
	CARD_WIDTH,
	SECTION_TITLE_GAP,
	STANDARD_GRID_GAP,
} from '@client/constants';
import {
	animationName,
	cardGridGapPx,
	scrollTargetOffset,
} from '@client/theme';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ReactNode, useEffect, useRef, useState } from 'react';

const NUM_SKELETON_ROWS = 2;
const MOBILE_OVERSCAN = 3;

type Props<T> = {
	items: T[];
	renderItem: (item: T, isMobile: boolean) => ReactNode;
	getItemKey: (item: T, index: number) => React.Key;
	isLoading: boolean;
	numPlaceholders?: number;
	columns: Record<string, number>;
	center?: boolean;
	header?: ReactNode;
	skeletonAspectRatio?: number;
	skeletonBodyHeight?: number;
	pageSize?: number;
};

export const ItemGrid = <T,>(props: Props<T>) => {
	const {
		items,
		renderItem,
		getItemKey,
		isLoading,
		numPlaceholders,
		columns,
		center,
		pageSize,
		skeletonAspectRatio = 1,
		skeletonBodyHeight,
	} = props;

	const numColumns = useBreakpointValue(columns) ?? 1;
	const numSkeletons =
		numPlaceholders ?? numColumns * NUM_SKELETON_ROWS;

	const isMobile = numColumns === 1;
	const scrollRef = useRef<HTMLDivElement>(null);
	const virtualizer = useVirtualizer({
		count: items.length,
		horizontal: true,
		enabled: isMobile,
		getScrollElement: () => scrollRef.current,
		estimateSize: () => CARD_WIDTH,
		gap: cardGridGapPx,
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

	const pagedItems = pageSize
		? items.slice((page - 1) * pageSize, page * pageSize)
		: items;
	const showPagination =
		!!pageSize && !isLoading && items.length > pageSize;

	const animatedItem = (child: ReactNode, key: React.Key) => (
		<Box
			key={key}
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

		const scroller = (
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
					{isLoading &&
						[0, 1].map((i) => (
							<CardSkeleton
								key={i}
								aspectRatio={skeletonAspectRatio}
								bodyHeight={skeletonBodyHeight}
							/>
						))}
					{visibleItems.map((virtualItem) => (
						<Box
							key={getItemKey(
								items[virtualItem.index],
								virtualItem.index,
							)}
							width={CARD_WIDTH}
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

		return (
			<Stack
				gap={SECTION_TITLE_GAP}
				width="100%"
				minW={0}
			>
				{props.header}
				{scroller}
			</Stack>
		);
	}

	return (
		<Stack
			ref={gridRef}
			width="fit-content"
			{...(center && { mx: 'auto' })}
			scrollMarginTop={scrollTargetOffset}
			gap={SECTION_TITLE_GAP}
		>
			{props.header}
			<Stack gap={5}>
				<SimpleGrid
					gap={STANDARD_GRID_GAP}
					templateColumns={`repeat(${numColumns}, ${CARD_WIDTH}px)`}
					alignItems="start"
				>
					{isLoading &&
						Array.from({ length: numSkeletons }).map(
							(_, i) => (
								<CardSkeleton
									key={i}
									aspectRatio={skeletonAspectRatio}
									bodyHeight={skeletonBodyHeight}
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
				{showPagination && pageSize && (
					<Flex
						justifyContent="center"
						pt={STANDARD_GRID_GAP}
					>
						<GridPagination
							count={items.length}
							pageSize={pageSize}
							page={page}
							onPageChange={onPageChange}
						/>
					</Flex>
				)}
			</Stack>
		</Stack>
	);
};
