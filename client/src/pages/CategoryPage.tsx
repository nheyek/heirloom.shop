import { Box, Heading, SimpleGrid, Skeleton, Text, useBreakpointValue } from '@chakra-ui/react';
import { CategoryCardData } from '@common/types/CategoryCardData';
import { ListingCardData } from '@common/types/ListingCardData';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CategoryCard } from '../components/landing-page/CategoryCard';
import { ListingCard } from '../components/ListingCard';
import useApi from '../hooks/useApi';

const NUM_COLUMNS = { base: 2, md: 3, lg: 4 };
const COLUMN_GAP = { base: 3, md: 4, lg: 5 };

export const CategoryPage = () => {
	const { id } = useParams<{ id: string }>();
	const [category, setCategory] = useState<CategoryCardData | null>(null);
	const [childCategories, setChildCategories] = useState<CategoryCardData[]>([]);
	const [listings, setListings] = useState<ListingCardData[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { getPublicResource } = useApi();

	const loadCategoryData = async () => {
		if (!id) return;

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

	const numColumns = useBreakpointValue(NUM_COLUMNS) || 1;

	if (error) {
		return (
			<Box m={5}>
				<Box mx="auto" maxWidth="1200px" textAlign="center" mt="36px">
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
				<Box mx="auto" textAlign="center" mt="36px">
					{isLoading ? (
						<Skeleton height="60px" width="300px" mx="auto" />
					) : (
						<Heading size="3xl">{category?.title}</Heading>
					)}
				</Box>

				{childCategories.length > 0 && (
					<SimpleGrid gap={COLUMN_GAP} columns={NUM_COLUMNS} mt="36px">
						{isLoading &&
							Array.from({ length: numColumns }).map((_, i) => (
								<Skeleton key={i} height={150} />
							))}
						{!isLoading &&
							childCategories.map((childCategory) => (
								<CategoryCard key={childCategory.id} {...childCategory} />
							))}
					</SimpleGrid>
				)}

				<Heading size="2xl" mt="48px" mb={2}>
					Featured
				</Heading>
				<SimpleGrid gap={COLUMN_GAP} columns={NUM_COLUMNS}>
					{isLoading &&
						Array.from({ length: numColumns * 2 }).map((_, i) => (
							<Skeleton key={i} height={200} />
						))}
					{!isLoading && listings.length === 0 && (
						<Text gridColumn="1 / -1" textAlign="center" py={8} color="gray.500">
							No products found in this category
						</Text>
					)}
					{!isLoading &&
						listings.map((listing) => (
							<ListingCard showMaker key={listing.id} {...listing} />
						))}
				</SimpleGrid>
			</Box>
		</Box>
	);
};
