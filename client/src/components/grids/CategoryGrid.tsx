import { SimpleGrid, Skeleton, useBreakpointValue } from '@chakra-ui/react';
import { CategoryCardData } from '@common/types/CategoryCardData';
import { CategoryCard } from '../cards/CategoryCard';

type Props = {
	isLoading: boolean;
	categories: CategoryCardData[];
	numPlaceholders?: number;
};

export const CategoryGrid = (props: Props) => {
	const cols = { base: 2, md: 4 };
	const numColumns = useBreakpointValue(cols) || 1;
	return (
		<SimpleGrid gap={{ base: 2, sm: 3, md: 4, lg: 5 }} columns={cols}>
			{props.isLoading &&
				Array.from({ length: props.numPlaceholders || numColumns }).map((_, i) => (
					<Skeleton key={i} height={200} />
				))}
			{!props.isLoading &&
				props.categories.map((category) => (
					<CategoryCard key={category.id} {...category} />
				))}
		</SimpleGrid>
	);
};
