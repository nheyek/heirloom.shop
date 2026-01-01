import { Box, Breadcrumb, Link, Skeleton, Stack } from '@chakra-ui/react';
import { ListingCardData } from '@common/types/ListingCardData';
import { useEffect, useState } from 'react';
import { MdHome } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryGrid } from '../components/grids/CategoryGrid';
import { ListingGrid } from '../components/grids/ListingGrid';
import { AppError } from '../components/misc/AppError';
import { STANDARD_HORIZONTAL_PAGE_PADDING } from '../constants';
import useApi from '../hooks/useApi';
import { useCategories } from '../providers/CategoriesProvider';

export const CategoryPage = () => {
	const { id } = useParams<{ id: string }>();

	const {
		getCategory,
		getChildCategories,
		getAncestorCategories,
		categoriesLoading,
		categoriesError,
	} = useCategories();

	const category = id ? getCategory(id?.toUpperCase()) : null;
	const childCategories = id ? getChildCategories(id) : [];
	const ancestorCategories = id ? getAncestorCategories(id) : [];

	const [listings, setListings] = useState<ListingCardData[]>([]);
	const [listingsLoading, setListingsLoading] = useState(true);
	const [listingsError, setListingsError] = useState<string | null>(null);
	const isLoading = listingsLoading || categoriesLoading;

	const { getPublicResource } = useApi();

	const navigate = useNavigate();

	const loadListings = async () => {
		const listingsResponse = await getPublicResource(`categories/${id}/listings`);
		if (listingsResponse.error) {
			setListingsError('Failed to load listings');
		} else {
			setListings(listingsResponse.data);
		}

		setListingsLoading(false);
	};

	useEffect(() => {
		setListingsLoading(true);
		setListingsError(null);
		setListings([]);

		setTimeout(loadListings, 500);
	}, [id]);

	if (categoriesError) {
		return (
			<Box m={5}>
				<AppError
					title={'Failed to load categories'}
					content={
						<>
							Click{' '}
							<Link
								onClick={() => navigate('/')}
								style={{ textDecoration: 'underline' }}
							>
								here
							</Link>{' '}
							to return to the homepage.
						</>
					}
				/>
			</Box>
		);
	}

	return (
		<Stack px={STANDARD_HORIZONTAL_PAGE_PADDING} py={7} gap={7}>
			{isLoading && <Skeleton height={35} width={300} />}
			{!isLoading && category && (
				<Breadcrumb.Root>
					<Breadcrumb.List fontSize={22} fontFamily="Alegreya" flexWrap="wrap" rowGap={3}>
						<Breadcrumb.Item>
							<Link onClick={() => navigate('/')} whiteSpace="nowrap">
								<MdHome />
								Home
							</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator />

						{ancestorCategories.map((ancestor) => (
							<>
								<Breadcrumb.Item key={ancestor.id}>
									<Breadcrumb.Link
										onClick={() =>
											navigate(`/category/${ancestor.id.toLowerCase()}`)
										}
									>
										<Link whiteSpace="nowrap">{ancestor.title}</Link>
									</Breadcrumb.Link>
								</Breadcrumb.Item>
								<Breadcrumb.Separator />
							</>
						))}

						<Breadcrumb.Item>
							<Breadcrumb.CurrentLink fontWeight={600} whiteSpace="nowrap">
								{category?.title}
							</Breadcrumb.CurrentLink>
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>
			)}

			{childCategories.length > 0 && (
				<CategoryGrid isLoading={isLoading} categories={childCategories} />
			)}

			{listingsError ? (
				<AppError title={listingsError} />
			) : (
				<ListingGrid listings={listings} isLoading={isLoading} />
			)}
		</Stack>
	);
};
