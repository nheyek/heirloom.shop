import {
	GridItem,
	Heading,
	SimpleGrid,
	Stack,
	useBreakpointValue,
} from '@chakra-ui/react';
import { CheckoutOrderSummary } from '../components/checkout/CheckoutOrderSummary';
import { CheckoutShippingForm } from '../components/checkout/CheckoutShippingForm';
import { ShoppingCartBreakdown } from '../components/shoppingCart/ShoppingCartBreakdown';
import { Layout } from '../constants';
import { useShoppingCart } from '../providers/ShoppingCartProvider';

export const CheckoutPage = () => {
	const shoppingCart = useShoppingCart();
	const layout = useBreakpointValue({
		base: Layout.SINGLE_COLUMN,
		md: Layout.MULTI_COLUMN,
	});

	const renderShoppingCartSection = () => {
		const invertColors = layout === Layout.SINGLE_COLUMN;

		return (
			<Stack gap={4}>
				<CheckoutOrderSummary layout={layout} />
				<Stack
					gap={2}
					background={invertColors ? 'brand' : 'none'}
					py={5}
					px={
						layout === Layout.SINGLE_COLUMN
							? 5
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
							shoppingCart.itemTotal +
							shoppingCart.shippingTotal
						).toLocaleString()}
						.00
					</Heading>
				</Stack>
			</Stack>
		);
	};

	return (
		<Stack
			maxWidth={1100}
			mt={{ base: 5, md: 10 }}
			mx="auto"
		>
			<SimpleGrid
				columns={{ base: 1, md: 5, lg: 3 }}
				gap={4}
			>
				<GridItem
					colSpan={{ base: 1, md: 3, lg: 2 }}
					mx={5}
				>
					<CheckoutShippingForm />
				</GridItem>
				<GridItem colSpan={{ base: 1, md: 2, lg: 1 }}>
					{renderShoppingCartSection()}
				</GridItem>
			</SimpleGrid>
		</Stack>
	);
};
