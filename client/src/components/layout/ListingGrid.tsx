import { HStack, SimpleGrid, Skeleton, useBreakpointValue } from '@chakra-ui/react';
import { ListingCardData } from '@common/types/ListingCardData';
import { STANDARD_GRID_COLUMNS, STANDARD_GRID_GAP } from '../../constants';
import { ListingCard } from '../itemDisplay/ListingCard';

type Props = {
	listings: ListingCardData[];
	isLoading: boolean;
};

export const ListingGrid = (props: Props) => {
	const numColumns = useBreakpointValue(STANDARD_GRID_COLUMNS) || 1;

	if (numColumns === 1) {
		return (
			<HStack overflowX="scroll" gap={STANDARD_GRID_GAP} p={5} m={-5} scrollbarWidth="none">
				{props.isLoading && (
					<>
						<Skeleton width={300} height={350} />
						<Skeleton width={300} height={350} />
					</>
				)}
				{props.listings.map((listing) => (
					<ListingCard key={listing.id} {...listing} width={300} />
				))}
			</HStack>
		);
	}

	return (
		<SimpleGrid gap={STANDARD_GRID_GAP} columns={STANDARD_GRID_COLUMNS}>
			{props.isLoading &&
				Array.from({ length: numColumns * 2 }).map((_, index) => (
					<Skeleton key={index} height={300} />
				))}
			{props.listings.map((listing) => (
				<ListingCard key={listing.id} {...listing} multiImage />
			))}
		</SimpleGrid>
	);
};
