import { Box, SimpleGrid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Product } from '../models/Product';
import { getProtectedResource } from '../utils/api-utils';
import { useAuth0 } from '@auth0/auth0-react';

export const LandingPage = () => {
	const [products, setProducts] = useState<Product[]>([]);

	const { getIdTokenClaims, isAuthenticated } = useAuth0();

	const loadProducts = async () => {
		const claims = await getIdTokenClaims();

		isAuthenticated &&
			getProtectedResource('products', claims?.__raw || null).then((products) => {
				setProducts(products.data);
			});
	};

	useEffect(() => {
		loadProducts();
	}, [isAuthenticated]);

	return (
		<SimpleGrid columns={2} gap="40px" style={{ margin: 25 }}>
			{products.map((product) => (
				<Box
					style={{
						padding: 10,
						border: '2px solid #000',
					}}
				>
					<b>{product.title}</b>
					<p>{product.descriptionText}</p>
				</Box>
			))}
		</SimpleGrid>
	);
};
