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
import { ShoppingCartEmptyMessage } from '../components/shoppingCart/ShoppingCartEmptyMessage';
import { ShoppingCartSummary } from '../components/shoppingCart/ShoppingCartSummary';
import { Layout } from '../constants';
import { useShoppingCart } from '../providers/ShoppingCartProvider';

export const CheckoutPage = () => {
	const shoppingCart = useShoppingCart();
	const layout = useBreakpointValue({
		base: Layout.SINGLE_COLUMN,
		md: Layout.MULTI_COLUMN,
	});
	const invertColors = layout === Layout.SINGLE_COLUMN;

	const navigate = useNavigate();

	const renderShoppingCartSection = () => {
		return (
			<Stack gap={4}>
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
					<ShoppingCartSummary
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
			mt={{ base: 4, md: 8 }}
			mx="auto"
			px={4}
		>
			<SimpleGrid
				columns={{ base: 1, md: 5, lg: 3 }}
				gapX={{ base: 4, lg: 8 }}
				gapY={6}
			>
				<GridItem colSpan={{ base: 1, md: 3, lg: 2 }}>
					<Stack gap={6}>
						<CheckoutShippingForm />
						{layout === Layout.MULTI_COLUMN && (
							<>
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
								<Button
									size="xl"
									mb={10}
									fontSize={22}
								>
									<FaCheckCircle />
									Place Order
								</Button>
							</>
						)}
					</Stack>
				</GridItem>
				<GridItem colSpan={{ base: 1, md: 2, lg: 1 }}>
					{layout === Layout.MULTI_COLUMN &&
						renderShoppingCartSection()}
					{layout === Layout.SINGLE_COLUMN && (
						<Stack gap={2}>
							<CheckoutShoppingCart layout={layout} />
							<Stack
								gap={5}
								background={
									invertColors ? 'brand' : 'none'
								}
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
								<Stack gap={2}>
									<ShoppingCartSummary
										textColor={
											invertColors
												? 'white'
												: 'black'
										}
										pendingLineItemMessage="Enter shipping address"
									/>

									<Heading
										size="3xl"
										fontWeight="semibold"
										color={
											invertColors
												? 'white'
												: 'black'
										}
									>
										$
										{(
											shoppingCart.itemPriceTotal +
											shoppingCart.shippingTotal
										).toLocaleString()}
										.00
									</Heading>
								</Stack>

								<CheckoutPaymentForm invertColors />
								<Button
									size="xl"
									width="full"
									fontSize={22}
									variant="outline"
									color="white"
									border="2px solid white"
								>
									<FaCheckCircle />
									Place Order
								</Button>
							</Stack>
						</Stack>
					)}
				</GridItem>
			</SimpleGrid>
		</Box>
	);
};
