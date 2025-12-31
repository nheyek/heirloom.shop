import { SimpleGrid, Skeleton, useBreakpointValue } from '@chakra-ui/react';
import { CategoryCardData } from '@common/types/CategoryCardData';
import { STANDARD_COLUMN_GAP } from '../../constants';
import { CategoryCard } from '../cards/CategoryCard';

type Props = {
	isLoading: boolean;
	categories: CategoryCardData[];
	numPlaceholders?: number;
};

export const CategoryGrid = (props: Props) => {
	const cols = { base: 2, lg: 4 };
	const numColumns = useBreakpointValue(cols) || 1;
	return (
		<SimpleGrid gap={STANDARD_COLUMN_GAP} columns={cols}>
			{props.isLoading &&
				Array.from({ length: props.numPlaceholders || numColumns }).map((_, i) => (
					<Skeleton key={i} height={150} />
				))}
			{!props.isLoading &&
				props.categories.map((category) => (
					<CategoryCard key={category.id} {...category} />
				))}
		</SimpleGrid>
	);
};
