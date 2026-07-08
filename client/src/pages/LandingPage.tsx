import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { IntroCarousel } from '@client/components/branding/IntroCarousel';
import { Logo } from '@client/components/branding/Logo';
import { CategoryGrid } from '@client/components/collections/CategoryGrid';
import { ListingGrid } from '@client/components/collections/ListingGrid';
import { ShopGrid } from '@client/components/collections/ShopGrid';
import { AppError } from '@client/components/feedback/AppError';
import { NUM_TOP_LEVEL_CATEGORIES } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { useCategories } from '@client/providers/CategoriesProvider';
import { FONT_DECORATIVE } from '@client/theme';
import { callApi } from '@client/utils/apiUtils';
import {
	ListingCardData,
	ShopCardData,
} from '@heirloom/common/contract';
import { useEffect, useState } from 'react';

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
		loadShopData();
		loadListings();
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
						fontSize={36}
						fontWeight={400}
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
					<Heading fontSize={36}>Shops</Heading>

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
						showShopTitle
					/>
				</Stack>
			)}
		</Stack>
	);
};
