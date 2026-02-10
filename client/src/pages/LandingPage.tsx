import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { API_ROUTES } from '@common/constants';
import { ListingCardData } from '@common/types/ListingCardData';
import { ShopCardData } from '@common/types/ShopCardData';
import { useEffect, useState } from 'react';
import { IntroCarousel } from '../components/branding/IntroCarousel';
import { Logo } from '../components/branding/Logo';
import { AppError } from '../components/feedback/AppError';
import { CategoryGrid } from '../components/layout/CategoryGrid';
import { ListingGrid } from '../components/layout/ListingGrid';
import { ShopGrid } from '../components/layout/ShopGrid';
import { NUM_TOP_LEVEL_CATEGORIES } from '../constants';
import useApi from '../hooks/useApi';
import { useCategories } from '../providers/CategoriesProvider';

export const LandingPage = () => {
	const [shops, setShops] = useState<ShopCardData[]>([]);
	const [shopsLoading, setShopsLoading] = useState<boolean>(false);
	const [shopsError, setShopsError] = useState<string | null>(null);

	const [listings, setListings] = useState<ListingCardData[]>([]);
	const [listingsLoading, setListingsLoading] =
		useState<boolean>(false);
	const [listingsError, setListingsError] = useState<string | null>(
		null,
	);

	const { getChildCategories, categoriesLoading, categoriesError } =
		useCategories();

	const isLoading =
		shopsLoading || listingsLoading || categoriesLoading;

	const { getPublicResource } = useApi();

	const loadShopData = async () => {
		const shopResponse = await getPublicResource(
			API_ROUTES.shops.base,
		);
		if (shopResponse.error) {
			setShopsError('Failed to load makers');
		} else {
			setShops(shopResponse.data);
		}
		setShopsLoading(false);
	};

	const loadListings = async () => {
		const listingsResponse = await getPublicResource(
			API_ROUTES.listings,
		);
		if (listingsResponse.error) {
			setListingsError('Failed to load listings');
		} else {
			setListings(listingsResponse.data);
		}
		setListingsLoading(false);
	};

	useEffect(() => {
		setListingsLoading(true);
		setShopsLoading(true);
		setShopsError(null);
		setListingsError(null);
		setTimeout(() => {
			loadShopData();
			loadListings();
		}, 500);
	}, []);

	return (
		<Stack
			gap={10}
			mt={8}
		>
			<Flex
				gap={3}
				flexDir="column"
				alignItems="center"
			>
				<Flex
					flexWrap="nowrap"
					alignItems="center"
				>
					<Text
						textStyle="ornamental"
						fontSize={{ base: 32, lg: 36 }}
						fontWeight="normal"
						pr="7px"
						flexShrink={0}
					>
						Welcome to
					</Text>
					<Box
						width={{ base: 120, lg: 150 }}
						flexShrink={0}
						ml={0.5}
						mt={1.5}
					>
						<Logo fill="#000000" />
					</Box>
				</Flex>

				<IntroCarousel />
			</Flex>

			{categoriesError ? (
				<AppError title="Failed to load categories" />
			) : (
				<CategoryGrid
					isLoading={categoriesLoading}
					categories={getChildCategories(null)}
					numPlaceholders={NUM_TOP_LEVEL_CATEGORIES}
				/>
			)}

			{shopsError ? (
				<AppError title="Failed to load makers" />
			) : (
				<Stack
					px={5}
					gap={3}
				>
					<Heading fontSize={36}>Makers</Heading>

					<ShopGrid
						shops={shops}
						isLoading={isLoading}
					/>
				</Stack>
			)}

			{listingsError ? (
				<AppError title={listingsError} />
			) : (
				<Stack
					px={5}
					pb={5}
					gap={3}
				>
					<Heading fontSize={36}>Featured Listings</Heading>

					<ListingGrid
						listings={listings}
						isLoading={isLoading}
					/>
				</Stack>
			)}
		</Stack>
	);
};
