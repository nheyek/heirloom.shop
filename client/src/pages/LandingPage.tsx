import {
	Alert,
	Box,
	Button,
	Heading,
	SimpleGrid,
	Skeleton,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { ListingCardData } from '@common/types/ListingCardData';
import { ShopCardData } from '@common/types/ShopCardData';
import { useEffect, useState } from 'react';
import { ShopCard } from '../components/cards/ShopCard';
import { CategoryGrid } from '../components/grids/CategoryGrid';
import { ListingGrid } from '../components/grids/ListingGrid';
import { Logo } from '../components/misc/Logo';
import { NUM_TOP_LEVEL_CATEGORIES } from '../constants';
import useApi from '../hooks/useApi';
import { useCategoryHierarchy } from '../providers/CategoriesProvider';

const NUM_COLUMNS = { base: 2, md: 3, lg: 4 };
const COLUMN_GAP = { base: 3, md: 4, lg: 5 };

export const LandingPage = () => {
	const { categories, categoriesLoading } = useCategoryHierarchy();

	const [shops, setShops] = useState<ShopCardData[]>([]);
	const [listings, setListings] = useState<ListingCardData[]>([]);
	const [error, setError] = useState<string | null>(null);

	const isLoading = shops.length === 0 || listings.length === 0 || categoriesLoading;

	const { getPublicResource } = useApi();

	const loadLandingPageData = async () => {
		try {
			const [shopsResponse, listingsResponse] = await Promise.all([
				getPublicResource('shops'),
				getPublicResource('listings'),
			]);

			setShops(shopsResponse.data);
			setListings(listingsResponse.data);
		} catch (err) {
			setError('Failed to load content');
		}
	};

	useEffect(() => {
		setTimeout(loadLandingPageData, 500);
	}, []);

	if (error) {
		return (
			<Box m="16px">
				<Alert.Root status="error">
					<Alert.Indicator />
					<Alert.Title>{error}</Alert.Title>
				</Alert.Root>
			</Box>
		);
	}

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
					<CategoryGrid
						isLoading={isLoading}
						categories={categories.filter((category) => !category.parentId)}
						numItems={NUM_TOP_LEVEL_CATEGORIES}
					/>
				</Box>

				<Heading size="3xl" mt="36px" mb={2}>
					Makers
				</Heading>
				<SimpleGrid gap={COLUMN_GAP} columns={NUM_COLUMNS}>
					{isLoading &&
						Array.from({ length: numColumns * 2 }).map(() => <Skeleton height={250} />)}
					{shops.map((cardData) => (
						<ShopCard key={cardData.id} {...cardData} />
					))}
				</SimpleGrid>

				<Heading size="3xl" mt="36px" mb={2}>
					Featured
				</Heading>
				<ListingGrid listings={listings} isLoading={isLoading} />
			</Box>
		</Box>
	);
};
