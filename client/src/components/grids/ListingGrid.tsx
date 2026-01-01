import { SimpleGrid, Skeleton, useBreakpointValue } from '@chakra-ui/react';
import { ListingCardData } from '@common/types/ListingCardData';
import { STANDARD_CARD_COLUMNS, STANDARD_ELEMENT_GAP } from '../../constants';
import { ListingCard } from '../cards/ListingCard';

type Props = {
	listings: ListingCardData[];
	isLoading: boolean;
};

export const ListingGrid = (props: Props) => {
	const numColumns = useBreakpointValue(STANDARD_CARD_COLUMNS) || 1;

	return (
		<SimpleGrid gap={STANDARD_ELEMENT_GAP} columns={STANDARD_CARD_COLUMNS}>
			{props.isLoading &&
				Array.from({ length: numColumns * 2 }).map((_, index) => (
					<Skeleton key={index} height={200} />
				))}
			{props.listings.map((listing) => (
				<ListingCard key={listing.id} {...listing} />
			))}
		</SimpleGrid>
	);
};
