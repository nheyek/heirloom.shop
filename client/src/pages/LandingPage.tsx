import {
	Button,
	HStack,
	Icon,
	Span,
	Stack,
	Text,
} from '@chakra-ui/react';
import { ListingGrid } from '@client/components/collections/ListingGrid';
import { ShopGrid } from '@client/components/collections/ShopGrid';
import { AppError } from '@client/components/feedback/AppError';
import { InfoPageDialog } from '@client/components/richText/InfoPageDialog';
import { InfoPageKey } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { useMinDuration } from '@client/hooks/useMinDuration';
import { useCategories } from '@client/providers/CategoriesProvider';
import { displayFontFamily } from '@client/theme';
import { callApi } from '@client/utils/apiUtils';
import {
	ListingCardData,
	ShopCardData,
} from '@heirloom/common/contract';
import { useEffect, useState } from 'react';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

export const LandingPage = () => {
	const [aboutOpen, setAboutOpen] = useState<boolean>(false);

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

	const isLoading = useMinDuration(
		shopsLoading || listingsLoading || categoriesLoading,
	);
	const showCategoriesLoading = useMinDuration(categoriesLoading);

	const apiClient = useApiClient();

	const loadShopData = async () => {
		const result = await callApi(apiClient.shops.getFeatured());
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
			alignItems="center"
		>
			<Stack
				pt={10}
				alignItems="center"
				gap={1}
			>
				<HStack
					fontFamily={displayFontFamily}
					fontSize={30}
					fontWeight={400}
					flexShrink={0}
				>
					Welcome to
					<Span fontWeight={500}>Heirloom.shop</Span>
				</HStack>

				<Stack
					gap={4}
					alignItems="center"
				>
					<Text
						fontFamily={displayFontFamily}
						fontSize={24}
						textAlign="center"
					>
						An exhibition of craftsmanship
					</Text>
					<Button
						size="sm"
						fontSize={18}
						onClick={() => setAboutOpen(true)}
					>
						<Icon
							as={FaArrowUpRightFromSquare}
							w={15}
							h={15}
						/>
						Learn more
					</Button>
				</Stack>
			</Stack>

			<Stack
				px={5}
				pb={5}
				gap={8}
				width="100%"
				maxW={1600}
			>
				{shopsError ? (
					<AppError title="Failed to load makers" />
				) : (
					<Stack
						gap={2}
						width="100%"
					>
						<Text
							fontSize={30}
							fontWeight={600}
							fontFamily={displayFontFamily}
						>
							Featured Makers
						</Text>

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
						gap={2}
						width="100%"
					>
						<Text
							fontSize={30}
							fontWeight={600}
							fontFamily={displayFontFamily}
						>
							Featured Listings
						</Text>

						<ListingGrid
							listings={listings}
							isLoading={isLoading}
							showShopTitle
						/>
					</Stack>
				)}
			</Stack>

			<InfoPageDialog
				infoPageKey={InfoPageKey.ABOUT}
				open={aboutOpen}
				onClose={() => setAboutOpen(false)}
			/>
		</Stack>
	);
};
