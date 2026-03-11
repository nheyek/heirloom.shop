import {
	Box,
	Button,
	GridItem,
	Heading,
	SimpleGrid,
	Stack,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { FaCheckCircle } from 'react-icons/fa';
import { FaCreditCard } from 'react-icons/fa6';
import { RxDotFilled } from 'react-icons/rx';
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
import { FONT_DECORATIVE } from '../theme';

export const CheckoutPage = () => {
	const navigate = useNavigate();
	const stripe = useStripe();
	const elements = useElements();
	const {
		itemQuantityTotal,
		itemPriceTotal,
		shippingTotal,
		validateShippingAddress,
	} = useShoppingCart();

	const handlePlaceOrder = async () => {
		const adddressIsValid = !validateShippingAddress();

		if (!stripe || !elements) return;
		const { error } = await elements.submit();

		if (error || !adddressIsValid) return;

		// TODO: confirm payment with stripe
	};

	const layout = useBreakpointValue({
		base: Layout.COMPACT,
		md: Layout.STANDARD,
	});

	if (itemQuantityTotal === 0) {
		return (
			<Box
				position="absolute"
				top={0}
				bottom={0}
				left={0}
				right={0}
			>
				<ShoppingCartEmptyMessage
					onClick={() => navigate('/')}
				/>
			</Box>
		);
	}

	if (layout === Layout.COMPACT) {
		return (
			<Stack gap={0}>
				<Stack
					p={5}
					gap={5}
				>
					<CheckoutShippingForm layout={layout} />
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
								itemPriceTotal + shippingTotal
							).toLocaleString()}
							.00
						</Heading>
					</Stack>
					<CheckoutPaymentForm />
					<Button
						size="2xl"
						width="full"
						fontSize={24}
						variant="outline"
						color="white"
						border="2px solid white"
						onClick={handlePlaceOrder}
					>
						<FaCheckCircle />
						Pay Now
					</Button>
				</Stack>
			</Stack>
		);
	}

	return (
		<Box
			maxWidth={{ lg: 1000 }}
			my={8}
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
						<CheckoutShippingForm layout={layout} />

						<Stack gap={3}>
							<CheckoutHeading
								Icon={() => (
									<FaCreditCard size={24} />
								)}
							>
								Payment
							</CheckoutHeading>
							<CheckoutPaymentForm />
						</Stack>
					</Stack>
				</GridItem>
				<GridItem colSpan={{ md: 2, lg: 1 }}>
					<Stack gap={4}>
						<CheckoutShoppingCart />
						<ShoppingCartSummary pendingMessage="Enter shipping address" />
						<Button
							size="xl"
							mb={10}
							fontSize={22}
							onClick={handlePlaceOrder}
						>
							<FaCheckCircle />
							Pay Now
							<RxDotFilled />
							<Text
								fontSize={26}
								fontWeight={600}
								fontFamily={FONT_DECORATIVE}
								paddingBottom={1}
							>
								{' '}
								$
								{(
									itemPriceTotal + shippingTotal
								).toLocaleString()}
								.00
							</Text>
						</Button>
					</Stack>
				</GridItem>
			</SimpleGrid>
		</Box>
	);
};
