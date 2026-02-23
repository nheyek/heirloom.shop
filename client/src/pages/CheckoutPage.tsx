import {
	Box,
	GridItem,
	Heading,
	SimpleGrid,
	Stack,
	useBreakpointValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { CheckoutShippingForm } from '../components/checkout/CheckoutShippingForm';
import { CheckoutShoppingCart } from '../components/checkout/CheckoutShoppingCart';
import { ShoppingCartBreakdown } from '../components/shoppingCart/ShoppingCartBreakdown';
import { ShoppingCartEmptyMessage } from '../components/shoppingCart/ShoppingCartEmptyMessage';
import { Layout } from '../constants';
import { useShoppingCart } from '../providers/ShoppingCartProvider';

export const CheckoutPage = () => {
	const shoppingCart = useShoppingCart();
	const layout = useBreakpointValue({
		base: Layout.SINGLE_COLUMN,
		md: Layout.MULTI_COLUMN,
	});
	const navigate = useNavigate();

	const renderShoppingCartSection = () => {
		const invertColors = layout === Layout.SINGLE_COLUMN;

		return (
			<Stack gap={5}>
				<CheckoutShoppingCart layout={layout} />
				<Stack
					gap={2}
					background={invertColors ? 'brand' : 'none'}
					p={
						layout === Layout.SINGLE_COLUMN
							? 5
							: undefined
					}
					mx={
						layout === Layout.SINGLE_COLUMN
							? -5
							: undefined
					}
				>
					<ShoppingCartBreakdown
						textColor={invertColors ? 'white' : 'black'}
						pendingLineItemMessage="Enter shipping address"
					/>

					<Heading
						size="3xl"
						fontWeight="semibold"
						color={invertColors ? 'white' : 'black'}
					>
						$
						{(
							shoppingCart.itemPriceTotal +
							shoppingCart.shippingTotal
						).toLocaleString()}
						.00
					</Heading>
				</Stack>
			</Stack>
		);
	};

	if (shoppingCart.itemQuantityTotal === 0) {
		return (
			<Box height={300}>
				<ShoppingCartEmptyMessage
					onClick={() => navigate('/')}
				/>
			</Box>
		);
	}

	return (
		<Box
			maxWidth={{ lg: 1000 }}
			mt={{ base: 5, md: 10 }}
			mx="auto"
			px={5}
		>
			<SimpleGrid
				columns={{ base: 1, md: 5, lg: 3 }}
				gapX={{ base: 5, lg: 10 }}
				gapY={5}
			>
				<GridItem colSpan={{ base: 1, md: 3, lg: 2 }}>
					<CheckoutShippingForm />
				</GridItem>
				<GridItem colSpan={{ base: 1, md: 2, lg: 1 }}>
					{renderShoppingCartSection()}
				</GridItem>
			</SimpleGrid>
		</Box>
	);
};
