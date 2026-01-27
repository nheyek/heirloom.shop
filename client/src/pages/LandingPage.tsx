import { Box, Flex, Heading, Stack } from '@chakra-ui/react';
import { API_ROUTES } from '@common/constants';
import { ListingCardData } from '@common/types/ListingCardData';
import { ShopCardData } from '@common/types/ShopCardData';
import { useEffect, useState } from 'react';
import { CategoryGrid } from '../components/grids/CategoryGrid';
import { ListingGrid } from '../components/grids/ListingGrid';
import { ShopGrid } from '../components/grids/ShopGrid';
import { AppError } from '../components/misc/AppError';
import { IntroCarousel } from '../components/misc/IntroCarousel';
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
		const shopResponse = await getPublicResource(API_ROUTES.shops.base);
		if (shopResponse.error) {
			setShopsError('Failed to load makers');
		} else {
			setShops(shopResponse.data);
		}
		setShopsLoading(false);
	};

	const loadListings = async () => {
		const listingsResponse = await getPublicResource(API_ROUTES.listings);
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

	const renderLandingPageTitle = (title: string) => (
		<Heading fontSize={{ base: 32, lg: 36 }} mb={3}>
			{title}
		</Heading>
	);

	return (
		<Stack gap={10} mt={8}>
			<Flex gap={2} flexDir="column" alignItems="center">
				<Flex flexWrap="nowrap" alignItems="center">
					<Heading
						fontSize={{ base: 32, lg: 36 }}
						fontWeight="normal"
						pr="7px"
						flexShrink={0}
					>
						Welcome to
					</Heading>
					<Box width={{ base: 120, lg: 150 }} flexShrink={0} ml={0.5} mt={1.5}>
						<Logo fill="#000000" />
					</Box>
				</Flex>

				<IntroCarousel />
			</Flex>

			{categoriesError ? (
				<AppError title="Failed to load categories" />
			) : (
				<CategoryGrid
					isLoading={isLoading}
					categories={getChildCategories(null)}
					numPlaceholders={NUM_TOP_LEVEL_CATEGORIES}
				/>
			)}

			<Box px={5}>
				{renderLandingPageTitle('Makers')}
				{shopsError ? (
					<AppError title="Failed to load makers" />
				) : (
					<ShopGrid shops={shops} isLoading={isLoading} />
				)}
			</Box>

			<Box px={5} pb={5}>
				{renderLandingPageTitle('Featured')}
				{listingsError ? (
					<AppError title="Failed to load featured listings" />
				) : (
					<ListingGrid listings={listings} isLoading={isLoading} />
				)}
			</Box>
		</Stack>
	);
};
