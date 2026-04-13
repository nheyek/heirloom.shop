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
import { ReactNode } from 'react';

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
	const numColumns = Math.min(maxNumColumns, items.length || 1);
	const placeholderCount = numPlaceholders ?? numColumns * 2;

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
				{items.map((item, index) => (
					<Box
						minWidth={300}
						key={getItemKey(item, index)}
					>
						{renderItem(item, true)}
					</Box>
				))}
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
				Array.from({ length: placeholderCount }).map(
					(_, i) => (
						<Skeleton
							key={i}
							height={300}
						/>
					),
				)}
			{items.map((item, index) => (
				<Box key={getItemKey(item, index)}>
					{renderItem(item, false)}
				</Box>
			))}
		</SimpleGrid>
	);
};
