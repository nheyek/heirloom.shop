import {
	Box,
	Button,
	GridItem,
	Heading,
	HStack,
	SimpleGrid,
	Stack,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { CheckoutHeading } from '@client/components/checkout/CheckoutHeading';
import { CheckoutPaymentForm } from '@client/components/checkout/CheckoutPaymentForm';
import { CheckoutShippingForm } from '@client/components/checkout/CheckoutShippingForm';
import { CheckoutShoppingCart } from '@client/components/checkout/CheckoutShoppingCart';
import { CheckoutShoppingCartCompact } from '@client/components/checkout/CheckoutShoppingCartCompact';
import { ShoppingCartEmptyMessage } from '@client/components/shoppingCart/ShoppingCartEmptyMessage';
import { ShoppingCartSummary } from '@client/components/shoppingCart/ShoppingCartSummary';
import { CLIENT_ROUTES, Layout } from '@client/constants';
import { simplifyCartItems } from '@client/domain/checkout';
import { useApiClient } from '@client/hooks/useApiClient';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';
import { displayFontFamily } from '@client/theme';
import { toastError } from '@client/toaster';
import { callApi } from '@client/utils/apiUtils';
import { OrderStatus } from '@heirloom/common/constants';
import { formatCentsAsDollars } from '@heirloom/common/utils/priceDisplay';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useRef, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FaCreditCard } from 'react-icons/fa6';
import { RxDotFilled } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';

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
	const {
		items,
		itemQuantityTotal,
		itemPriceTotal,
		shippingTotal,
		taxTotal,
		taxCalcLoading,
		checkoutEmail,
		shippingAddress,
		validateLocalCheckoutFields,
		validateAddressDeliverable,
		hydrateCart,
		clearCart,
	} = useShoppingCart();

	const [pendingSubmit, setPendingSubmit] = useState(false);
	const shippingFormRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		hydrateCart();
	}, []);

	useEffect(() => {
		return () => {
			if (pollIntervalRef.current)
				clearInterval(pollIntervalRef.current);
		};
	}, []);

	const orderTotal =
		itemPriceTotal + shippingTotal + (taxTotal || 0);

	const startPollingOrderStatus = (
		shortId: string,
		accessKey: string,
	) => {
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
				navigate(`/${CLIENT_ROUTES.orderConfirmed}`, {
					state: { shortId, accessKey },
				});
			} else if (attempts >= POLL_MAX_ATTEMPTS) {
				clearInterval(pollIntervalRef.current!);
				setPendingSubmit(false);
			}
		}, POLL_INTERVAL_MS);
	};

	const handleConfirmation = async () => {
		const scrollToShippingForm = () => {
			if (
				layout === Layout.COMPACT &&
				shippingFormRef.current
			) {
				const top =
					shippingFormRef.current.getBoundingClientRect()
						.top;
				window.scrollTo({ top, behavior: 'smooth' });
			}
		};

		if (!validateLocalCheckoutFields()) {
			scrollToShippingForm();
			return;
		}
		if (!stripe || !elements) return;

		setPendingSubmit(true);

		if (!(await validateAddressDeliverable())) {
			setPendingSubmit(false);
			scrollToShippingForm();
			return;
		}

		const { error } = await elements.submit();
		if (error) {
			setPendingSubmit(false);
			return;
		}

		const intentResult = await callApi(
			apiClient.checkout.submitOrder({
				body: {
					items: simplifyCartItems(items),
					email: checkoutEmail,
					shippingAddress,
					totalCents: orderTotal,
				},
			}),
		);

		if (intentResult.status === 409) {
			setPendingSubmit(false);
			toastError(
				'Prices have changed',
				'Please refresh the page and try again.',
			);
			return;
		}

		if (intentResult.error !== null) {
			setPendingSubmit(false);
			return;
		}

		const { clientSecret, orderShortId, accessKey } =
			intentResult.data;
		const { error: confirmError } = await stripe.confirmPayment({
			elements,
			clientSecret,
			confirmParams: {
				return_url: `${window.location.origin}/${CLIENT_ROUTES.orderConfirmed}`,
			},
			redirect: 'if_required',
		});

		if (confirmError) {
			setPendingSubmit(false);
		} else {
			startPollingOrderStatus(orderShortId, accessKey);
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
					ref={shippingFormRef}
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
						disabled={pendingSubmit || taxCalcLoading}
						loading={pendingSubmit}
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
							width="100%"
							mb={10}
							fontSize={24}
							onClick={handleConfirmation}
							disabled={pendingSubmit || taxCalcLoading}
							loading={pendingSubmit}
						>
							<HStack gap={3}>
								<FaCheckCircle />
								Pay Now
							</HStack>

							<RxDotFilled />
							<Text
								fontSize={28}
								fontWeight={600}
								fontFamily={displayFontFamily}
								paddingBottom={1}
							>
								{formatCentsAsDollars(orderTotal)}
							</Text>
						</Button>
					</Stack>
				</GridItem>
			</SimpleGrid>
		</Box>
	);
};
