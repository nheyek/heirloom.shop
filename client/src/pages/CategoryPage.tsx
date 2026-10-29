import { Link, Stack } from '@chakra-ui/react';
import { ShopGrid } from '@client/components/collections/ShopGrid';
import { SortableListingGrid } from '@client/components/collections/SortableListingGrid';
import { AppError } from '@client/components/feedback/AppError';
import { SectionTitle } from '@client/components/textDisplay/SectionTitle';
import {
	GRID_CONTENT_MAX_WIDTH,
	STANDARD_GRID_GAP,
} from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { useMinDuration } from '@client/hooks/useMinDuration';
import { useCategories } from '@client/providers/CategoriesProvider';
import { callApi } from '@client/utils/apiUtils';
import {
	ListingCardData,
	ShopCardData,
} from '@heirloom/common/contract';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const CategoryPage = () => {
	const navigate = useNavigate();
	const { id: idParam } = useParams<{ id: string }>();
	if (!idParam) {
		navigate('/');
	}
	const id = idParam!;

	const apiClient = useApiClient();

	const { categoriesLoading, categoriesError } = useCategories();

	const [listings, setListings] = useState<ListingCardData[]>([]);
	const [shops, setShops] = useState<ShopCardData[]>([]);
	const [listingsLoading, setListingsLoading] = useState(true);
	const [listingsError, setListingsError] = useState<string | null>(
		null,
	);
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
		<>
			<Stack
				py={5}
				px={STANDARD_GRID_GAP}
				gap={10}
				width="100%"
				maxW={GRID_CONTENT_MAX_WIDTH}
				mx="auto"
			>
				{!listingsError &&
					(isLoading || shops.length > 0) && (
						<Stack gap={2}>
							<SectionTitle>Makers</SectionTitle>
							<ShopGrid
								shops={shops}
								isLoading={isLoading}
							/>
						</Stack>
					)}

				{listingsError ? (
					<AppError title={listingsError} />
				) : (
					<SortableListingGrid
						title="Items"
						listings={listings}
						isLoading={isLoading}
						shops={shops}
					/>
				)}
			</Stack>
		</>
	);
};
