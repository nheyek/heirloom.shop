import {
	Box,
	Button,
	Heading,
	SimpleGrid,
	Skeleton,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { CategoryCardData } from '@common/types/CategoryCardData';
import { ListingCardData } from '@common/types/ListingCardData';
import { ShopCardData } from '@common/types/ShopCardData';
import { useEffect, useState } from 'react';
import { ShopCard } from '../components/cards/ShopCard';
import { CategoryGrid } from '../components/grids/CategoryGrid';
import { ListingGrid } from '../components/grids/ListingGrid';
import { Logo } from '../components/misc/Logo';
import useApi from '../hooks/useApi';

const NUM_COLUMNS = { base: 2, md: 3, lg: 4 };
const COLUMN_GAP = { base: 3, md: 4, lg: 5 };

export const LandingPage = () => {
	const [categories, setCategories] = useState<CategoryCardData[]>([]);
	const [shops, setShops] = useState<ShopCardData[]>([]);
	const [listings, setListings] = useState<ListingCardData[]>([]);
	const { getPublicResource } = useApi();

	const loadTopLevelCategories = async () => {
		getPublicResource('categories/topLevel').then((categories) => {
			setCategories(categories.data);
		});
	};

	const loadShops = async () => {
		getPublicResource('shops').then((shops) => {
			setShops(shops.data);
		});
	};

	const loadProducts = async () => {
		getPublicResource('listings').then((products) => {
			setListings(products.data);
		});
	};

	useEffect(() => {
		loadTopLevelCategories();
		loadShops();
		loadProducts();
	}, []);

	const numColumns = useBreakpointValue(NUM_COLUMNS) || 1;

	return (
		<Box m={5}>
			<Box mx="auto" maxWidth="1200px">
				<Box mx="auto" textAlign="center" mt="36px">
					<Box
						mx="auto"
						display="flex"
						alignItems="center"
						w="fit-content"
						flexWrap="nowrap"
					>
						<Heading size="2xl" pr="7px" flexShrink={0}>
							Welcome to
						</Heading>
						<Box width={120} flexShrink={0} marginTop="3px">
							<Logo fill="#000000" />
						</Box>
					</Box>

					<Text fontSize={18} mt="5px">
						An exhibition of American and European craftsmanship.
					</Text>
					<Button size="sm" mt="10px">
						Learn more
					</Button>
				</Box>

				<Box mt="36px">
					<CategoryGrid isLoading={categories.length === 0} categories={categories} />
				</Box>

				<Heading size="3xl" mt="36px" mb={2}>
					Makers
				</Heading>
				<SimpleGrid gap={COLUMN_GAP} columns={NUM_COLUMNS}>
					{shops.length === 0 &&
						Array.from({ length: numColumns * 2 }).map(() => <Skeleton height={250} />)}
					{shops.map((cardData) => (
						<ShopCard key={cardData.id} {...cardData} />
					))}
				</SimpleGrid>

				<Heading size="3xl" mt="36px" mb={2}>
					Featured
				</Heading>
				<ListingGrid listings={listings} isLoading={listings.length === 0} />
			</Box>
		</Box>
	);
};
