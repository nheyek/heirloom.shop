import {
	Box,
	Button,
	GridItem,
	Heading,
	SimpleGrid,
	Stack,
	useBreakpointValue,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { FaCreditCard } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { CheckoutHeading } from '../components/checkout/CheckoutHeading';
import { CheckoutPaymentForm } from '../components/checkout/CheckoutPaymentForm';
import { CheckoutShippingForm } from '../components/checkout/CheckoutShippingForm';
import { CheckoutShoppingCart } from '../components/checkout/CheckoutShoppingCart';
import { CheckoutShoppingCartCompact } from '../components/checkout/CheckoutShoppingCartCompact';
import { ShoppingCartEmptyMessage } from '../components/shoppingCart/ShoppingCartEmptyMessage';
import { ShoppingCartSummary } from '../components/shoppingCart/ShoppingCartSummary';
import { Layout } from '../constants';
import { useShoppingCart } from '../providers/ShoppingCartProvider';

export const CheckoutPage = () => {
	const navigate = useNavigate();
	const shoppingCart = useShoppingCart();

	if (shoppingCart.itemQuantityTotal === 0) {
		return (
			<Box height={300}>
				<ShoppingCartEmptyMessage
					onClick={() => navigate('/')}
				/>
			</Box>
		);
	}

	const layout = useBreakpointValue({
		base: Layout.COMPACT,
		md: Layout.STANDARD,
	});

	if (layout === Layout.COMPACT) {
		return (
			<Stack gap={0}>
				<Stack
					p={5}
					gap={5}
				>
					<CheckoutShippingForm />
					<CheckoutShoppingCartCompact />
				</Stack>

				<Stack
					p={5}
					gap={5}
					background="brand"
				>
					<Stack gap={2}>
						<ShoppingCartSummary
							textColor={'white'}
							pendingMessage="Enter shipping address"
						/>

						<Heading
							size="3xl"
							fontWeight="semibold"
							color="white"
						>
							$
							{(
								shoppingCart.itemPriceTotal +
								shoppingCart.shippingTotal
							).toLocaleString()}
							.00
						</Heading>
					</Stack>
					<CheckoutPaymentForm layout={Layout.COMPACT} />
					<Button
						size="2xl"
						width="full"
						fontSize={24}
						variant="outline"
						color="white"
						border="2px solid white"
					>
						<FaCheckCircle />
						Place Order
					</Button>
				</Stack>
			</Stack>
		);
	}

	return (
		<Box
			maxWidth={{ lg: 1000 }}
			mt={8}
			px={4}
			mx="auto"
		>
			<SimpleGrid
				columns={{ md: 5, lg: 3 }}
				gapX={10}
				gapY={5}
			>
				<GridItem colSpan={{ md: 3, lg: 2 }}>
					<Stack gap={6}>
						<CheckoutShippingForm />
						<Stack gap={3}>
							<CheckoutHeading
								Icon={() => (
									<FaCreditCard size={24} />
								)}
							>
								Payment
							</CheckoutHeading>
							<CheckoutPaymentForm
								layout={Layout.STANDARD}
							/>
						</Stack>
						<Button
							size="xl"
							mb={10}
							fontSize={22}
						>
							<FaCheckCircle />
							Place Order
						</Button>
					</Stack>
				</GridItem>
				<GridItem colSpan={{ md: 2, lg: 1 }}>
					<CheckoutShoppingCart />
				</GridItem>
			</SimpleGrid>
		</Box>
	);
};
