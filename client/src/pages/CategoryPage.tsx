import { Alert, Box, Breadcrumb, Heading, Link, Skeleton } from '@chakra-ui/react';
import { ListingCardData } from '@common/types/ListingCardData';
import { useEffect, useState } from 'react';
import { FaHouse } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryGrid } from '../components/grids/CategoryGrid';
import { ListingGrid } from '../components/grids/ListingGrid';
import { OrnamentalDivider } from '../components/misc/OrnamentalDivider';
import useApi from '../hooks/useApi';
import { useCategories } from '../providers/CategoriesProvider';

export const CategoryPage = () => {
	const { id } = useParams<{ id: string }>();

	const { getCategory, getChildCategories, getAncestorCategories, categoriesLoading } =
		useCategories();

	const category = id ? getCategory(id?.toUpperCase()) : null;
	const childCategories = id ? getChildCategories(id) : [];
	const ancestorCategories = id ? getAncestorCategories(id) : [];

	const [listings, setListings] = useState<ListingCardData[]>([]);
	const [listingsLoading, setListingsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const isLoading = listingsLoading || categoriesLoading;

	const { getPublicResource } = useApi();
	const navigate = useNavigate();

	const loadListings = async () => {
		setListingsLoading(true);
		setError(null);

		try {
			const listingsResponse = await getPublicResource(`categories/${id}/listings`);
			setListings(listingsResponse.data || []);
		} catch (err) {
			setError('Failed to load listings');
		} finally {
			setListingsLoading(false);
		}
	};

	useEffect(() => {});

	useEffect(() => {
		setListingsLoading(true);
		setListings([]);
		setTimeout(loadListings, 500);
	}, [id]);

	if (error) {
		return (
			<Box m="16px">
				<Alert.Root status="error">
					<Alert.Indicator />
					<Alert.Content>
						<Alert.Title>{error}</Alert.Title>
						<Alert.Description>
							Click{' '}
							<Link
								onClick={() => navigate('/')}
								style={{ textDecoration: 'underline' }}
							>
								here
							</Link>{' '}
							to return to the homepage.
						</Alert.Description>
					</Alert.Content>
				</Alert.Root>
			</Box>
		);
	}

	return (
		<Box m={5}>
			<Box mx="auto" maxWidth="1200px">
				<Box my="24px">
					{isLoading && <Skeleton height="50px" width="300px" />}
					{!isLoading && category && (
						<Breadcrumb.Root>
							<Breadcrumb.List fontSize="16px">
								<Breadcrumb.Item>
									<Link onClick={() => navigate('/')}>
										<FaHouse />
										<Heading>Home</Heading>
									</Link>
								</Breadcrumb.Item>
								<Breadcrumb.Separator />

								{ancestorCategories.map((ancestor) => (
									<>
										<Breadcrumb.Item key={ancestor.id}>
											<Breadcrumb.Link
												onClick={() =>
													navigate(
														`/category/${ancestor.id.toLowerCase()}`,
													)
												}
											>
												<Link>
													<Heading>{ancestor.title}</Heading>
												</Link>
											</Breadcrumb.Link>
										</Breadcrumb.Item>
										<Breadcrumb.Separator />
									</>
								))}

								<Breadcrumb.Item>
									<Breadcrumb.CurrentLink>
										<Heading>{category?.title}</Heading>
									</Breadcrumb.CurrentLink>
								</Breadcrumb.Item>
							</Breadcrumb.List>
						</Breadcrumb.Root>
					)}
				</Box>

				{childCategories.length > 0 && (
					<>
						<CategoryGrid isLoading={isLoading} categories={childCategories} />
						<OrnamentalDivider />
					</>
				)}

				<ListingGrid listings={listings} isLoading={isLoading} />
			</Box>
		</Box>
	);
};
