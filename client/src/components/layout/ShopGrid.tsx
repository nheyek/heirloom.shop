import {
	HStack,
	SimpleGrid,
	Skeleton,
	useBreakpointValue,
} from '@chakra-ui/react';
import { ShopCardData } from '@common/types/ShopCardData';
import {
	STANDARD_GRID_COLUMNS,
	STANDARD_GRID_GAP,
} from '../../constants';
import { ShopCard } from '../itemDisplay/ShopCard';

type Props = {
	isLoading: boolean;
	shops: ShopCardData[];
	numPlaceholders?: number;
};

export const ShopGrid = (props: Props) => {
	const numColumns = useBreakpointValue(STANDARD_GRID_COLUMNS) || 1;

	if (numColumns === 1) {
		return (
			<HStack
				overflowX="scroll"
				gap={STANDARD_GRID_GAP}
				p={5}
				m={-5}
				scrollbarWidth="none"
			>
				{props.isLoading && (
					<>
						<Skeleton
							width={300}
							height={325}
						/>
						<Skeleton
							width={300}
							height={325}
						/>
					</>
				)}
				{props.shops.map((cardData) => (
					<ShopCard
						key={cardData.id}
						{...cardData}
						width={300}
					/>
				))}
			</HStack>
		);
	}

	return (
		<SimpleGrid
			gap={STANDARD_GRID_GAP}
			columns={STANDARD_GRID_COLUMNS}
		>
			{props.isLoading &&
				Array.from({
					length: props.numPlaceholders || numColumns * 2,
				}).map((_, index) => (
					<Skeleton
						key={index}
						height={250}
					/>
				))}
			{props.shops.map((cardData) => (
				<ShopCard
					key={cardData.id}
					{...cardData}
				/>
			))}
		</SimpleGrid>
	);
};
