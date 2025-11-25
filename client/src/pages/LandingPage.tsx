import {
	Box,
	Card,
	SimpleGrid,
	Image,
	Text,
	Button,
	AspectRatio,
	GridItem,
	Stack,
	HStack,
	Wrap,
	Heading,
	Skeleton,
	useBreakpointValue,
	Center,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';
import { motion } from 'framer-motion';
import { Logo } from '../components/Logo';
import { MdAdd } from 'react-icons/md';
import { ListingCardData } from '@common/types/ListingCardData';
import { ListingCard } from '../components/ListingCard';
import { CategoryCard } from '../components/CategoryCard';
import { ShopCard } from '../components/ShopCard';
import { CategoryCardData } from '@common/types/CategoryCardData';

const BREAKPOINT_VALUES = { base: 2, md: 3, lg: 4 };

export const LandingPage = () => {
	const [categories, setCategories] = useState<CategoryCardData[]>([
		{
			id: 'LEATHERWORK',
			title: 'Leatherwork',
			imageUuid: 'EC0DF0BF-2CC9-4F0F-90BA-9E25A092FE7C',
		},
		{
			id: 'JEWELRY',
			title: 'Jewelry',
			imageUuid: 'FC6E4450-CC01-4562-AB3E-AC6939632101',
		},
		{
			id: 'FURNITURE',
			title: 'Furniture',
			imageUuid: 'A001F100-46F9-4ECC-9A11-9CCDCA15F7F8',
		},
	]);
	const [shops, setShops] = useState([
		{
			id: 1,
			title: 'Studebaker Metals',
			location: 'Pittsburgh, PA',
			categoryIds: ['JEWELRY'],
			profileImageUuid: '231210EF-D8F8-4A33-96E0-2F8FBACD43AB',
		},
	]);
	const [listings, setProducts] = useState<ListingCardData[]>([]);
	const { getPublicResource } = useApi();

	const loadProducts = async () => {
		getPublicResource('listings').then((products) => {
			setProducts(products.data);
		});
	};

	useEffect(() => {
		loadProducts();
	}, []);

	const numColumns = useBreakpointValue(BREAKPOINT_VALUES) || 1;

	return (
		<Box m={5}>
			<Box mx="auto" maxWidth="1200px">
				<Box mx="auto" textAlign="center" mt="40px">
					<Box
						mx="auto"
						display="flex"
						alignItems="center"
						w="fit-content"
						flexWrap="nowrap"
					>
						<Heading size="2xl" pr="7px" flexShrink={0}>
							Welcome to
						</Heading>
						<Box width={120} flexShrink={0} marginTop="3px">
							<Logo fill="#000000" />
						</Box>
					</Box>

					<Text fontSize={18} mt="5px">
						An exhibition of American and European craftsmanship.
					</Text>
					<Button size="sm" mt="10px">
						Learn more
					</Button>
				</Box>

				<SimpleGrid gap={BREAKPOINT_VALUES} columns={BREAKPOINT_VALUES} mt="40px">
					{categories.map((category) => (
						<CategoryCard key={category.id} {...category} />
					))}
				</SimpleGrid>

				<Heading size="3xl" mt={6} mb={2}>
					Makers
				</Heading>
				<SimpleGrid gap={BREAKPOINT_VALUES} columns={BREAKPOINT_VALUES}>
					{shops.map((cardData) => (
						<ShopCard
							key={cardData.id}
							{...cardData}
							categoryTitles={cardData.categoryIds.map(
								(id) => categories.find((category) => category.id === id)?.title,
							)}
						/>
					))}
				</SimpleGrid>

				<Heading size="3xl" mt={6} mb={2}>
					Featured
				</Heading>
				<SimpleGrid gap={BREAKPOINT_VALUES} columns={BREAKPOINT_VALUES}>
					{listings.length === 0 &&
						Array.from({ length: numColumns * 2 }).map(() => <Skeleton height={200} />)}
					{listings.map((listing) => (
						<ListingCard showMaker key={listing.id} {...listing} />
					))}
				</SimpleGrid>
			</Box>
		</Box>
	);
};
