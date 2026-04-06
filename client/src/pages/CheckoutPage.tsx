import {
	Box,
	Button,
	GridItem,
	Heading,
	SimpleGrid,
	Spinner,
	Stack,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { OrderStatus } from '@common/enums/OrderStatus';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useRef, useState } from 'react';
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
import { CLIENT_ROUTES, Layout } from '../constants';
import { simplifyCartItems } from '../domain/checkout';
import { useApiClient } from '../hooks/useApiClient';
import { useShoppingCart } from '../providers/ShoppingCartProvider';
import { FONT_DECORATIVE } from '../theme';
import { callApi } from '../utils/apiUtils';
import { formatCentsAsDollars } from '../utils/priceDisplay';

const POLL_INTERVAL_MS = 2000;
const POLL_MAX_ATTEMPTS = 30;

export const CheckoutPage = () => {
	const navigate = useNavigate();
	const stripe = useStripe();
	const elements = useElements();
	const apiClient = useApiClient();
	const pollIntervalRef = useRef<ReturnType<
		typeof setInterval
	> | null>(null);
	const submittingRef = useRef(false);
	const {
		items,
		itemQuantityTotal,
		itemPriceTotal,
		shippingTotal,
		taxTotal,
		checkoutEmail,
		shippingAddress,
		validateCheckoutFields,
		clearCart,
	} = useShoppingCart();
	const [pendingSubmit, setPendingSubmit] = useState(false);

	useEffect(() => {
		return () => {
			if (pollIntervalRef.current)
				clearInterval(pollIntervalRef.current);
		};
	}, []);

	const orderTotal =
		itemPriceTotal + shippingTotal + (taxTotal || 0);

	const startPollingOrderStatus = (shortId: string) => {
		let attempts = 0;
		pollIntervalRef.current = setInterval(async () => {
			attempts++;
			const result = await callApi(
				apiClient.orders.getStatus({ params: { shortId } }),
			);
			if (
				result.error === null &&
				result.data.orderStatus ===
					OrderStatus.PAYMENT_SUCCEEDED
			) {
				clearInterval(pollIntervalRef.current!);
				clearCart();
				navigate(`/${CLIENT_ROUTES.orderSuccess}`);
			} else if (attempts >= POLL_MAX_ATTEMPTS) {
				clearInterval(pollIntervalRef.current!);
				setPendingSubmit(false);
			}
		}, POLL_INTERVAL_MS);
	};

	const handleConfirmation = async () => {
		if (submittingRef.current) return;
		submittingRef.current = true;

		const failedValidation = !(await validateCheckoutFields());
		if (failedValidation || !stripe || !elements) {
			submittingRef.current = false;
			return;
		}

		const { error } = await elements.submit();
		if (error) {
			submittingRef.current = false;
			return;
		}

		setPendingSubmit(true);

		const intentResult = await callApi(
			apiClient.checkout.submitOrder({
				body: {
					items: simplifyCartItems(items),
					email: checkoutEmail,
					shippingAddress,
				},
			}),
		);

		if (intentResult.error !== null) {
			submittingRef.current = false;
			setPendingSubmit(false);
			return;
		}

		const { clientSecret, orderShortId } = intentResult.data;
		const { error: confirmError } = await stripe.confirmPayment({
			elements,
			clientSecret,
			confirmParams: {
				return_url: `${window.location.origin}/${CLIENT_ROUTES.orderSuccess}`,
			},
			redirect: 'if_required',
		});

		if (confirmError) {
			submittingRef.current = false;
			setPendingSubmit(false);
		} else {
			startPollingOrderStatus(orderShortId);
		}
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
					<CheckoutShippingForm
						layout={layout}
						disabled={pendingSubmit}
					/>
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
							{formatCentsAsDollars(orderTotal)}
						</Heading>
					</Stack>
					<CheckoutPaymentForm disabled={pendingSubmit} />
					<Button
						size="2xl"
						width="full"
						fontSize={24}
						variant="outline"
						color="white"
						border="2px solid white"
						onClick={handleConfirmation}
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
						<CheckoutShippingForm
							layout={layout}
							disabled={pendingSubmit}
						/>

						<Stack gap={3}>
							<CheckoutHeading
								Icon={() => (
									<FaCreditCard size={24} />
								)}
							>
								Payment
							</CheckoutHeading>
							<CheckoutPaymentForm
								disabled={pendingSubmit}
							/>
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
							onClick={handleConfirmation}
							disabled={pendingSubmit}
						>
							{pendingSubmit ? (
								<Spinner
									size="md"
									color="white"
									borderWidth={3}
								/>
							) : (
								<>
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
										{formatCentsAsDollars(
											orderTotal,
										)}
									</Text>
								</>
							)}
						</Button>
					</Stack>
				</GridItem>
			</SimpleGrid>
		</Box>
	);
};
