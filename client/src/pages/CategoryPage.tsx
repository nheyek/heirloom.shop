import { Link, Stack } from '@chakra-ui/react';
import { CategoryGrid } from '@client/components/collections/CategoryGrid';
import { GridHeader } from '@client/components/collections/GridHeader';
import { ListingGrid } from '@client/components/collections/ListingGrid';
import { ShopGrid } from '@client/components/collections/ShopGrid';
import { AppError } from '@client/components/feedback/AppError';
import { SortFilterDrawer } from '@client/components/input/SortFilterDrawer';
import { CategoryBreadcrumb } from '@client/components/navigation/CategoryBreadcrumb';
import { SectionTitle } from '@client/components/textDisplay/SectionTitle';
import {
	GRID_PAGE_PADDING_Y,
	STANDARD_GRID_GAP,
} from '@client/constants';
import { LISTING_SORT_LABELS } from '@client/domain/listingSort';
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

	return (
		<Stack
			pt={GRID_PAGE_PADDING_Y}
			px={STANDARD_GRID_GAP}
			width="100%"
		>
			<Stack
				gap={SECTION_GAP}
				alignSelf="center"
			>
				<CategoryBreadcrumb categoryId={id} />
				{subcategories.length > 0 && (
					<CategoryGrid
						categories={subcategories}
						isLoading={
							isLoading && subcategories.length > 0
						}
					/>
				)}

				{!listingsError &&
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
					)}

				{listingsError ? (
					<AppError title={listingsError} />
				) : (
					<ListingGrid
						center
						listings={listingView.listings}
						isLoading={
							isLoading || listingView.isApplying
						}
						header={
							<GridHeader>
								<SectionTitle>Items</SectionTitle>
								{(isLoading ||
									listingView.listings.length >
										0) && (
									<SortFilterDrawer
										options={LISTING_SORT_LABELS}
										value={listingView.sort.value}
										onChange={
											listingView.sort.onChange
										}
										priceFilter={
											listingView.price
										}
									/>
								)}
							</GridHeader>
						}
						shops={shops}
					/>
				)}
			</Stack>
		</Stack>
	);
};
