import { SimpleGrid, Skeleton, useBreakpointValue } from '@chakra-ui/react';
import { CategoryCardData } from '@common/types/CategoryCardData';
import { STANDARD_COLUMN_GAP, STANDARD_NUM_COLUMNS } from '../constants';
import { CategoryCard } from './landing-page/CategoryCard';

type Props = {
	isLoading: boolean;
	categories: CategoryCardData[];
};

export const CategoryGrid = (props: Props) => {
	const numColumns = useBreakpointValue(STANDARD_NUM_COLUMNS) || 1;

	return (
		<SimpleGrid gap={STANDARD_COLUMN_GAP} columns={STANDARD_NUM_COLUMNS} mt="18px" mb="18px">
			{props.isLoading &&
				Array.from({ length: numColumns }).map((_, i) => <Skeleton key={i} height={150} />)}
			{!props.isLoading &&
				props.categories.map((category) => (
					<CategoryCard key={category.id} {...category} />
				))}
		</SimpleGrid>
	);
};
