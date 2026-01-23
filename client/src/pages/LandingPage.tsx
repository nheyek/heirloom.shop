import { Box, Button, Heading, Stack } from '@chakra-ui/react';
import { ListingCardData } from '@common/types/ListingCardData';
import { ShopCardData } from '@common/types/ShopCardData';
import { useEffect, useState } from 'react';
import { CategoryGrid } from '../components/grids/CategoryGrid';
import { ListingGrid } from '../components/grids/ListingGrid';
import { ShopGrid } from '../components/grids/ShopGrid';
import { AppError } from '../components/misc/AppError';
import { Logo } from '../components/misc/Logo';
import { NUM_TOP_LEVEL_CATEGORIES, STANDARD_GRID_GAP } from '../constants';
import useApi from '../hooks/useApi';
import { useCategories } from '../providers/CategoriesProvider';

export const LandingPage = () => {
	const [shops, setShops] = useState<ShopCardData[]>([]);
	const [shopsLoading, setShopsLoading] = useState<boolean>(false);
	const [shopsError, setShopsError] = useState<string | null>(null);

	const [listings, setListings] = useState<ListingCardData[]>([]);
	const [listingsLoading, setListingsLoading] = useState<boolean>(false);
	const [listingsError, setListingsError] = useState<string | null>(null);

	const { getChildCategories, categoriesLoading, categoriesError } = useCategories();

	const isLoading = shopsLoading || listingsLoading || categoriesLoading;

	const { getPublicResource } = useApi();

	const loadShopData = async () => {
		const shopResponse = await getPublicResource('shops');
		if (shopResponse.error) {
			setShopsError('Failed to load makers');
		} else {
			setShops(shopResponse.data);
		}
		setShopsLoading(false);
	};

	const loadListings = async () => {
		const listingsResponse = await getPublicResource('listings');
		if (listingsResponse.error) {
			setListingsError('Failed to load listings');
		} else {
			setListings(listingsResponse.data);
		}
		setListingsLoading(false);
	};

	useEffect(() => {
		setShopsLoading(true);
		setShopsError(null);
		setTimeout(() => {
			loadShopData();
			loadListings();
		}, 500);
	}, []);

	return (
		<Box px={STANDARD_GRID_GAP}>
			<Box mx="auto" textAlign="center" my={10}>
				<Box mx="auto" display="flex" alignItems="center" w="fit-content" flexWrap="nowrap">
					<Heading fontSize={28} pr="5px" flexShrink={0}>
						Welcome to
					</Heading>
					<Box width={120} flexShrink={0} mt={1}>
						<Logo fill="#000000" />
					</Box>
				</Box>

				<Box minW={300} fontSize={20} mt={1} mb={3}>
					<span>An exhibition of American and </span>
					<Box display="inline-block">European craftsmanship.</Box>
				</Box>

				<Button size="sm">Learn more</Button>
			</Box>
			<Stack gap={10} my={5} mx="auto" maxWidth={2000}>
				{categoriesError ? (
					<AppError title="Failed to load categories" />
				) : (
					<CategoryGrid
						isLoading={isLoading}
						categories={getChildCategories(null)}
						numPlaceholders={NUM_TOP_LEVEL_CATEGORIES}
					/>
				)}

				<Box>
					<Heading size="3xl" mb={2}>
						Makers
					</Heading>
					{shopsError ? (
						<AppError title="Failed to load makers" />
					) : (
						<ShopGrid shops={shops} isLoading={isLoading} />
					)}
				</Box>

				<Box>
					<Heading size="3xl" mb={2}>
						Featured
					</Heading>
					{listingsError ? (
						<AppError title="Failed to load featured listings" />
					) : (
						<ListingGrid listings={listings} isLoading={isLoading} />
					)}
				</Box>
			</Stack>
		</Box>
	);
};
