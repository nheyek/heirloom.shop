import {
	Button,
	Heading,
	Icon,
	Span,
	Stack,
	Text,
} from '@chakra-ui/react';
import { CategoryGrid } from '@client/components/collections/CategoryGrid';
import { GridHeader } from '@client/components/collections/GridHeader';
import { ListingGrid } from '@client/components/collections/ListingGrid';
import { ShopGrid } from '@client/components/collections/ShopGrid';
import { AppError } from '@client/components/feedback/AppError';
import { InfoPageDialog } from '@client/components/richText/InfoPageDialog';
import { SectionTitle } from '@client/components/textDisplay/SectionTitle';
import { InfoPageKey } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { useMinDuration } from '@client/hooks/useMinDuration';
import { useCategories } from '@client/providers/CategoriesProvider';
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
	const [listingShops, setListingShops] = useState<ShopCardData[]>(
		[],
	);
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

	const categories = getChildCategories(null);

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
			setListings(result.data.listings);
			setListingShops(result.data.shops);
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
			pt={10}
			px={5}
			width="100%"
		>
			<Stack
				gap={5}
				alignSelf="center"
				maxW="100%"
			>
				<Stack
					gap={10}
					alignItems="center"
				>
					<Stack gap={1}>
						<Heading
							size="md"
							fontWeight={400}
							flexShrink={0}
						>
							Welcome to
							<Span fontWeight={500}>
								{' '}
								Heirloom.shop
							</Span>
						</Heading>
						<Stack
							gap={3}
							alignItems="center"
						>
							<Text
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
									w={3.5}
									h={3.5}
								/>
								Learn More
							</Button>
						</Stack>
					</Stack>

					{categoriesError ? (
						<AppError title="Failed to load categories" />
					) : (
						(isLoading || categories.length > 0) && (
							<CategoryGrid
								center
								categories={categories}
								isLoading={isLoading}
							/>
						)
					)}
				</Stack>

				{shopsError ? (
					<AppError title="Failed to load makers" />
				) : (
					(isLoading || shops.length > 0) && (
						<ShopGrid
							center
							header={
								<GridHeader>
									<SectionTitle>
										Makers
									</SectionTitle>
								</GridHeader>
							}
							shops={shops}
							isLoading={isLoading}
						/>
					)
				)}

				{listingsError ? (
					<AppError title={listingsError} />
				) : (
					<ListingGrid
						center
						header={
							<GridHeader>
								<SectionTitle>Featured</SectionTitle>
							</GridHeader>
						}
						listings={listings}
						isLoading={isLoading}
						shops={listingShops}
					/>
				)}

				<InfoPageDialog
					infoPageKey={InfoPageKey.ABOUT}
					open={aboutOpen}
					onClose={() => setAboutOpen(false)}
				/>
			</Stack>
		</Stack>
	);
};
