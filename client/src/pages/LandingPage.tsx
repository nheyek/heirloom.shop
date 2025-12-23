import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import { ListingCardData } from '@common/types/ListingCardData';
import { ShopCardData } from '@common/types/ShopCardData';
import { useEffect, useState } from 'react';
import { CategoryGrid } from '../components/grids/CategoryGrid';
import { ListingGrid } from '../components/grids/ListingGrid';
import { ShopGrid } from '../components/grids/ShopGrid';
import { AppError } from '../components/misc/AppError';
import { Logo } from '../components/misc/Logo';
import { NUM_TOP_LEVEL_CATEGORIES } from '../constants';
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
	};

	const loadListings = async () => {
		const listingsResponse = await getPublicResource('listings');
		if (listingsResponse.error) {
			setListingsError('Failed to load listings');
		} else {
			setListings(listingsResponse.data);
		}
	};

	const loadPageData = async () => {
		await Promise.all([loadShopData(), loadListings()]);

		setShopsLoading(false);
		setListingsLoading(false);
	};

	useEffect(() => {
		setShopsLoading(true);
		setShopsError(null);
		setTimeout(loadPageData, 500);
	}, []);

	return (
		<>
			<Box mx="auto" textAlign="center" mt={10} mb={5}>
				<Box mx="auto" display="flex" alignItems="center" w="fit-content" flexWrap="nowrap">
					<Heading size="2xl" pr="5px" flexShrink={0}>
						Welcome to
					</Heading>
					<Box width={120} flexShrink={0} marginTop="3px">
						<Logo fill="#000000" />
					</Box>
				</Box>

				<Text fontSize={18} mt={1}>
					An exhibition of American and European craftsmanship.
				</Text>
				<Button size="sm" mt={2}>
					Learn more
				</Button>
			</Box>
			<Stack gap={10} p={5} mx="auto" maxWidth={1200}>
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
		</>
	);
};
