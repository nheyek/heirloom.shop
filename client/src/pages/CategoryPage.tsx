import { Box, Link, Stack } from '@chakra-ui/react';
import { CategoryGrid } from '@client/components/collections/CategoryGrid';
import { ShopGrid } from '@client/components/collections/ShopGrid';
import { SortableListingGrid } from '@client/components/collections/SortableListingGrid';
import { AppError } from '@client/components/feedback/AppError';
import { CategoryBreadcrumb } from '@client/components/navigation/CategoryBreadcrumb';
import { SectionTitle } from '@client/components/textDisplay/SectionTitle';
import {
	GRID_CONTENT_MAX_WIDTH,
	GRID_PAGE_PADDING_Y,
	SECTION_TITLE_GAP,
	STANDARD_GRID_GAP,
} from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { useListingView } from '@client/hooks/useListingView';
import { useMinDuration } from '@client/hooks/useMinDuration';
import { useCategories } from '@client/providers/CategoriesProvider';
import { callApi } from '@client/utils/apiUtils';
import {
	ListingCardData,
	ShopCardData,
} from '@heirloom/common/contract';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SECTION_GAP = 7;

export const CategoryPage = () => {
	const navigate = useNavigate();
	const { id: idParam } = useParams<{ id: string }>();
	if (!idParam) {
		navigate('/');
	}
	const id = idParam!;

	const apiClient = useApiClient();

	const { getChildCategories, categoriesLoading, categoriesError } =
		useCategories();
	const subcategories = getChildCategories(id);

	const [listings, setListings] = useState<ListingCardData[]>([]);
	const [shops, setShops] = useState<ShopCardData[]>([]);
	const [listingsLoading, setListingsLoading] = useState(true);
	const [listingsError, setListingsError] = useState<string | null>(
		null,
	);
	const listingView = useListingView(listings);

	const isLoading = useMinDuration(
		listingsLoading || categoriesLoading,
	);

	const loadListings = async () => {
		const result = await callApi(
			apiClient.categories.getListings({ params: { id } }),
		);
		if (result.error !== null) {
			setListingsError(result.error);
		} else {
			setListings(result.data.listings);
			setShops(result.data.shops);
		}

		setListingsLoading(false);
	};

	useEffect(() => {
		setListingsLoading(true);
		setListingsError(null);
		setListings([]);
		setShops([]);

		loadListings();
	}, [id]);

	if (categoriesError) {
		return (
			<AppError
				title={'Failed to load categories'}
				content={
					<>
						Click{' '}
						<Link
							onClick={() => navigate('/')}
							style={{
								textDecoration: 'underline',
							}}
						>
							here
						</Link>{' '}
						to return to the homepage.
					</>
				}
			/>
		);
	}

	const breadcrumb = <CategoryBreadcrumb categoryId={id} />;

	return (
		<Stack
			py={GRID_PAGE_PADDING_Y}
			px={STANDARD_GRID_GAP}
			gap={SECTION_GAP}
			width="100%"
			maxW={GRID_CONTENT_MAX_WIDTH}
			mx="auto"
		>
			<CategoryGrid
				center
				header={
					<Box
						{...(subcategories.length > 0 && {
							mb: SECTION_GAP - SECTION_TITLE_GAP,
						})}
					>
						{breadcrumb}
					</Box>
				}
				categories={subcategories}
				isLoading={isLoading && subcategories.length > 0}
			/>

			{!listingsError && (isLoading || shops.length > 0) && (
				<ShopGrid
					center
					header={<SectionTitle>Makers</SectionTitle>}
					shops={shops}
					isLoading={isLoading}
				/>
			)}

			{listingsError ? (
				<AppError title={listingsError} />
			) : (
				<SortableListingGrid
					center
					view={listingView}
					heading={<SectionTitle>Items</SectionTitle>}
					isLoading={isLoading}
					shops={shops}
				/>
			)}
		</Stack>
	);
};
