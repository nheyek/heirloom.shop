import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { ListingCardData } from '@common/contract';
import { ShopCardData } from '@common/contract';
import { useEffect, useState } from 'react';
import { IntroCarousel } from '../components/branding/IntroCarousel';
import { Logo } from '../components/branding/Logo';
import { AppError } from '../components/feedback/AppError';
import { CategoryGrid } from '../components/layout/CategoryGrid';
import { ListingGrid } from '../components/layout/ListingGrid';
import { ShopGrid } from '../components/layout/ShopGrid';
import { NUM_TOP_LEVEL_CATEGORIES } from '../constants';
import { useApiClient } from '../hooks/useApiClient';
import { useCategories } from '../providers/CategoriesProvider';
import { FONT_DECORATIVE } from '../theme';
import { callApi } from '../utils/apiUtils';

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

	const apiClient = useApiClient();

	const loadShopData = async () => {
		const result = await callApi(apiClient.shops.getAll());
		if (result.error !== null) {
			setShopsError('Failed to load makers');
		} else {
			setShops(result.data);
		}
		setShopsLoading(false);
	};

	const loadListings = async () => {
		const result = await callApi(apiClient.listings.getAll());
		if (result.error !== null) {
			setListingsError('Failed to load listings');
		} else {
			setListings(result.data);
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
			<Stack
				gap={2}
				alignItems="center"
			>
				<Flex
					flexWrap="nowrap"
					alignItems="center"
				>
					<Text
						fontFamily={FONT_DECORATIVE}
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
			</Stack>

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
