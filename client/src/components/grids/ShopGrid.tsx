import { SimpleGrid, Skeleton, useBreakpointValue } from '@chakra-ui/react';
import { ShopCardData } from '@common/types/ShopCardData';
import { STANDARD_CARD_COLUMNS, STANDARD_ELEMENT_GAP } from '../../constants';
import { ShopCard } from '../cards/ShopCard';

type Props = {
	isLoading: boolean;
	shops: ShopCardData[];
	numPlaceholders?: number;
};

export const ShopGrid = (props: Props) => {
	const numColumns = useBreakpointValue(STANDARD_CARD_COLUMNS) || 1;
	return (
		<SimpleGrid gap={STANDARD_ELEMENT_GAP} columns={STANDARD_CARD_COLUMNS}>
			{props.isLoading &&
				Array.from({ length: props.numPlaceholders || numColumns * 2 }).map((_, index) => (
					<Skeleton key={index} height={250} />
				))}
			{props.shops.map((cardData) => (
				<ShopCard key={cardData.id} {...cardData} />
			))}
		</SimpleGrid>
	);
};
