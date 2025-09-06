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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Product } from '../models/Product';
import { getProtectedResource, getPublicResource } from '../utils/api-utils';
import { useAuth0 } from '@auth0/auth0-react';
import { LoginButton } from '../components/LoginButton';

const CARD_MAX_WIDTH = 250;
const CARD_GAP = 20;
const MAX_CARDS_PER_ROW = 5;

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
		<Box m={10}>
			<Wrap
				gap={CARD_GAP + 'px'}
				mx="auto"
				maxWidth={(CARD_MAX_WIDTH + CARD_GAP) * MAX_CARDS_PER_ROW}
			>
				{products.map((product) => (
					<Card.Root
						width={{ base: 200, md: CARD_MAX_WIDTH }}
						key={product.id}
						flexShrink={0}
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
								<Text textStyle="2xl" fontWeight="medium" letterSpacing="tight">
									$450
								</Text>
								<Button variant="solid" size="xs">
									Buy now
								</Button>
							</Box>
						</Card.Footer>
					</Card.Root>
				))}
			</Wrap>
		</Box>
	);
};
