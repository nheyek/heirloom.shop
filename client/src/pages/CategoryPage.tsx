import {
	Box,
	Breadcrumb,
	Link,
	Skeleton,
	Stack,
} from '@chakra-ui/react';
import { API_ROUTES } from '@common/constants';
import { ListingCardData } from '@common/types/ListingCardData';
import { Fragment, useEffect, useState } from 'react';
import { MdHome } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { AppError } from '../components/feedback/AppError';
import { CategoryGrid } from '../components/layout/CategoryGrid';
import { ListingGrid } from '../components/layout/ListingGrid';
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
	const [listingsError, setListingsError] = useState<string | null>(
		null,
	);
	const isLoading = listingsLoading || categoriesLoading;

	const { getPublicResource } = useApi();

	const navigate = useNavigate();

	const loadListings = async () => {
		const listingsResponse = await getPublicResource(
			`${API_ROUTES.categories.base}/${id}/${API_ROUTES.categories.listings}`,
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
			</Box>
		);
	}

	return (
		<Stack
			py={5}
			gap={5}
		>
			<Box px={5}>
				{isLoading && (
					<Skeleton
						height={35}
						width={300}
					/>
				)}
				{!isLoading && category && (
					<Breadcrumb.Root>
						<Breadcrumb.List
							fontSize={22}
							textStyle="ornamental"
							flexWrap="wrap"
							rowGap={3}
						>
							<Breadcrumb.Item>
								<Link
									onClick={() => navigate('/')}
									whiteSpace="nowrap"
								>
									<MdHome />
									Home
								</Link>
							</Breadcrumb.Item>
							<Breadcrumb.Separator />

							{ancestorCategories.map((ancestor) => (
								<Fragment key={ancestor.id}>
									<Breadcrumb.Item
										key={ancestor.id}
									>
										<Link
											whiteSpace="nowrap"
											onClick={() =>
												navigate(
													`/category/${ancestor.id.toLowerCase()}`,
												)
											}
										>
											{ancestor.title}
										</Link>
									</Breadcrumb.Item>
									<Breadcrumb.Separator />
								</Fragment>
							))}

							<Breadcrumb.Item>
								<Breadcrumb.CurrentLink
									fontWeight={600}
									whiteSpace="nowrap"
								>
									{category?.title}
								</Breadcrumb.CurrentLink>
							</Breadcrumb.Item>
						</Breadcrumb.List>
					</Breadcrumb.Root>
				)}
			</Box>

			<CategoryGrid
				isLoading={isLoading}
				categories={childCategories}
			/>

			<Box px={5}>
				{listingsError ? (
					<AppError title={listingsError} />
				) : (
					<ListingGrid
						listings={listings}
						isLoading={isLoading}
					/>
				)}
			</Box>
		</Stack>
	);
};
