import { SimpleGrid, Skeleton, useBreakpointValue } from '@chakra-ui/react';
import { ListingCardData } from '@common/types/ListingCardData';
import { STANDARD_COLUMN_GAP, STANDARD_NUM_COLUMNS } from '../../constants';
import { ListingCard } from '../cards/ListingCard';

type Props = {
	listings: ListingCardData[];
	isLoading: boolean;
};

export const ListingGrid = (props: Props) => {
	const numColumns = useBreakpointValue(STANDARD_NUM_COLUMNS) || 1;

	return (
		<SimpleGrid gap={STANDARD_COLUMN_GAP} columns={STANDARD_NUM_COLUMNS}>
			{props.listings.length === 0 &&
				Array.from({ length: numColumns * 2 }).map(() => <Skeleton height={200} />)}
			{props.listings.map((listing) => (
				<ListingCard key={listing.id} showMaker {...listing} />
			))}
		</SimpleGrid>
	);
};
