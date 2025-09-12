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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Product } from '../models/Product';
import { getProtectedResource, getPublicResource } from '../utils/api-utils';
import { useAuth0 } from '@auth0/auth0-react';
import { LoginButton } from '../components/LoginButton';
import { CgDetailsMore } from 'react-icons/cg';

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

	return (
		<Box m={5}>
			<Box mx="auto" maxWidth="1200px">
				<Heading size="3xl" mt={6} mb={3}>
					All Products
				</Heading>
				<SimpleGrid
					gap={{ base: 2, md: 3, lg: 4, xl: 5 }}
					columns={{ base: 2, md: 3, lg: 4, xl: 5 }}
				>
					{products.map((product) => (
						<Card.Root key={product.id} flexShrink={0}>
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
						</Card.Root>
					))}
				</SimpleGrid>
			</Box>
		</Box>
	);
};
