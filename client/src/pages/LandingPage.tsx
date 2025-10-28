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

const BREAKPOINT_VALUES = { base: 2, md: 3, lg: 4 };

const MotionCard = motion(Card.Root);

export const LandingPage = () => {
	const [products, setProducts] = useState<ListingCardData[]>([]);
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
				<Box mx="auto" textAlign="center" mt={10}>
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

					<Text fontSize={18} mt={2}>
						A curated marketplace for professionally handcrafted products.
					</Text>
					<Button size="sm" mt={4}>
						Learn more
					</Button>
				</Box>

				<Heading size="3xl" mt={6} mb={2}>
					All Products
				</Heading>
				<SimpleGrid gap={BREAKPOINT_VALUES} columns={BREAKPOINT_VALUES}>
					{products.length === 0 &&
						Array.from({ length: numColumns * 2 }).map(() => <Skeleton height={200} />)}
					{products.map((product) => (
						<MotionCard
							key={product.id}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 1, ease: 'easeInOut' }}
							overflow="hidden"
						>
							<AspectRatio ratio={1 / 1}>
								<Image
									style={{ cursor: 'pointer' }}
									src={`${process.env.LISTING_IMAGES_URL}/${product.primaryImageUuid}.jpg`}
								/>
							</AspectRatio>
							<Card.Body p={3}>
								<Card.Title truncate style={{ cursor: 'pointer' }}>
									{product.title}
								</Card.Title>
								<Card.Description lineClamp="2">
									{product.subtitle}
								</Card.Description>
							</Card.Body>
							<Card.Footer p={3}>
								<Box
									justifyContent="space-between"
									alignItems="center"
									display="flex"
									width="100%"
								>
									<Text textStyle="xl" fontWeight="medium" letterSpacing="tight">
										{`$${product.priceDollars.toLocaleString()}`}
									</Text>
									<Button variant="solid" size="xs" letterSpacing="tight">
										<MdAdd />
										Add to cart
									</Button>
								</Box>
							</Card.Footer>
						</MotionCard>
					))}
				</SimpleGrid>
			</Box>
		</Box>
	);
};
