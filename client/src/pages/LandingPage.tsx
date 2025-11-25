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
import { ShopCardData } from '@common/types/ShopCardData';

const BREAKPOINT_VALUES = { base: 2, md: 3, lg: 4 };

export const LandingPage = () => {
	const [categories, setCategories] = useState<CategoryCardData[]>([]);
	const [shops, setShops] = useState<ShopCardData[]>([]);
	const [listings, setProducts] = useState<ListingCardData[]>([]);
	const { getPublicResource } = useApi();

	const loadTopLevelCategories = async () => {
		getPublicResource('categories/topLevel').then((categories) => {
			setCategories(categories.data);
		});
	};

	const loadShops = async () => {
		getPublicResource('shops').then((shops) => {
			setShops(shops.data);
		});
	};

	const loadProducts = async () => {
		getPublicResource('listings').then((products) => {
			setProducts(products.data);
		});
	};

	useEffect(() => {
		loadTopLevelCategories();
		loadShops();
		loadProducts();
	}, []);

	const numColumns = useBreakpointValue(BREAKPOINT_VALUES) || 1;

	return (
		<Box m={5}>
			<Box mx="auto" maxWidth="1200px">
				<Box mx="auto" textAlign="center" mt="30px">
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

				<SimpleGrid gap={BREAKPOINT_VALUES} columns={BREAKPOINT_VALUES} mt="30px">
					{categories.map((category) => (
						<CategoryCard key={category.id} {...category} />
					))}
				</SimpleGrid>

				<Heading size="3xl" mt="50px" mb={2}>
					Makers
				</Heading>
				<SimpleGrid gap={BREAKPOINT_VALUES} columns={BREAKPOINT_VALUES}>
					{shops.map((cardData) => (
						<ShopCard key={cardData.id} {...cardData} />
					))}
				</SimpleGrid>

				<Heading size="3xl" mt="50px" mb={2}>
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
