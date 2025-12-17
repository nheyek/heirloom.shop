import { Box, Heading, Skeleton, useBreakpointValue } from '@chakra-ui/react';
import { CategoryCardData } from '@common/types/CategoryCardData';
import { ListingCardData } from '@common/types/ListingCardData';
import { useEffect, useState } from 'react';
import { IoArrowBackCircle } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryGrid } from '../components/grids/CategoryGrid';
import { ListingGrid } from '../components/grids/ListingGrid';
import { OrnamentalDivider } from '../components/misc/OrnamentalDivider';
import { STANDARD_NUM_COLUMNS } from '../constants';
import useApi from '../hooks/useApi';

export const CategoryPage = () => {
	const { id } = useParams<{ id: string }>();
	const [category, setCategory] = useState<CategoryCardData | null>(null);
	const [childCategories, setChildCategories] = useState<CategoryCardData[]>([]);
	const [listings, setListings] = useState<ListingCardData[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { getPublicResource } = useApi();
	const navigate = useNavigate();

	const loadCategoryData = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const [categoryResponse, childrenResponse, listingsResponse] = await Promise.all([
				getPublicResource(`categories/${id}`),
				getPublicResource(`categories/${id}/children`),
				getPublicResource(`categories/${id}/listings`),
			]);

			if (categoryResponse.error) {
				setError('Category not found');
				return;
			}

			setCategory(categoryResponse.data);
			setChildCategories(childrenResponse.data || []);
			setListings(listingsResponse.data || []);
		} catch (err) {
			setError('Failed to load category data');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		loadCategoryData();
	}, [id]);

	const numColumns = useBreakpointValue(STANDARD_NUM_COLUMNS) || 1;

	if (error) {
		return (
			<Box m={5}>
				<Box mx="auto" maxWidth="1200px" textAlign="center" mt="24px">
					<Heading size="2xl" color="red.500">
						{error}
					</Heading>
				</Box>
			</Box>
		);
	}

	return (
		<Box m={5}>
			<Box mx="auto" maxWidth="1200px">
				<Box my="24px">
					{isLoading ? (
						<Skeleton height="60px" width="300px" mx="auto" />
					) : (
						<Box display="flex" alignItems="center" gap="8px">
							<IoArrowBackCircle
								size="28px"
								cursor="pointer"
								onClick={() => navigate('/')}
							/>
							<Heading size="3xl">{category?.title}</Heading>
						</Box>
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
