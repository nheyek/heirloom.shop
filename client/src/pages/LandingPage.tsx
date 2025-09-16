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
import { Product } from '../models/Product';
import { getProtectedResource, getPublicResource } from '../utils/api-utils';
import { useAuth0 } from '@auth0/auth0-react';
import { LoginButton } from '../components/LoginButton';
import { CgDetailsMore } from 'react-icons/cg';
import { motion } from 'framer-motion';
import { Logo } from '../components/Logo';

const BREAKPOINT_VALUES = { base: 2, md: 3, lg: 4, xl: 5 };

const MotionCard = motion(Card.Root);

export const LandingPage = () => {
	const [products, setProducts] = useState<Product[]>([]);

	const loadProducts = async () => {
		getPublicResource('products').then((products) => {
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
					<Box display="flex" justifyContent="center">
						<Heading size="2xl" pr={2} display="inline-flex" flexShrink={0}>
							Welcome to
						</Heading>
						<Box height={35} display="inline-flex" flexShrink={0}>
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
						>
							<AspectRatio ratio={1 / 1}>
								<Image
									src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
									alt="Green double couch with wooden legs"
								/>
							</AspectRatio>
							<Card.Body p={3}>
								<Card.Title>{product.title}</Card.Title>
								<Card.Description>{product.descriptionText}</Card.Description>
							</Card.Body>
							<Card.Footer p={3}>
								<Box
									justifyContent="space-between"
									alignItems="center"
									display="flex"
									width="100%"
								>
									<Text textStyle="xl" fontWeight="medium" letterSpacing="tight">
										$450
									</Text>
									<Button variant="solid" size="xs">
										Details
										<CgDetailsMore />
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
