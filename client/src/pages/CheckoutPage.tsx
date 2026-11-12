import { useAuth0 } from '@auth0/auth0-react';
import {
	Box,
	Button,
	GridItem,
	Heading,
	HStack,
	SimpleGrid,
	Skeleton,
	Stack,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { CheckoutContactForm } from '@client/components/checkout/CheckoutContactForm';
import { CheckoutHeading } from '@client/components/checkout/CheckoutHeading';
import {
	CHECKOUT_BUTTON_MARGIN_BOTTOM,
	CHECKOUT_FIELD_GAP,
	CHECKOUT_GAP,
	SUMMARY_ROW_GAP,
	SUMMARY_ROW_HEIGHT,
	SUMMARY_TOTAL_GAP,
} from '@client/components/checkout/checkoutLayout';
import { CheckoutPaymentForm } from '@client/components/checkout/CheckoutPaymentForm';
import { CheckoutShippingForm } from '@client/components/checkout/CheckoutShippingForm';
import { CheckoutShoppingCart } from '@client/components/checkout/CheckoutShoppingCart';
import { CheckoutShoppingCartCompact } from '@client/components/checkout/CheckoutShoppingCartCompact';
import { ShoppingCartEmptyMessage } from '@client/components/shoppingCart/ShoppingCartEmptyMessage';
import { ShoppingCartSummary } from '@client/components/shoppingCart/ShoppingCartSummary';
import { Layout } from '@client/constants';
import { simplifyCartItems } from '@client/domain/checkout';
import { useApiClient } from '@client/hooks/useApiClient';
import { useOrderStatusPoll } from '@client/hooks/useOrderStatusPoll';
import {
	CheckoutType,
	useCheckoutStatus,
} from '@client/providers/CheckoutStatusProvider';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';
import { toastError } from '@client/toaster';
import { callApi } from '@client/utils/apiUtils';
import { getOrderPath } from '@client/utils/orderUtils';
import { formatCentsAsDollars } from '@heirloom/common/utils/priceDisplay';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useRef } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { RxDotFilled } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';

const SummarySkeleton = () => (
	<Stack gap={SUMMARY_ROW_GAP}>
		<Skeleton height={SUMMARY_ROW_HEIGHT} />
		<Skeleton height={SUMMARY_ROW_HEIGHT} />
		<Skeleton height={SUMMARY_ROW_HEIGHT} />
	</Stack>
);

export const CheckoutPage = () => {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth0();
	const stripe = useStripe();
	const elements = useElements();
	const apiClient = useApiClient();
	const { pollUntilPaid } = useOrderStatusPoll();
	const {
		items,
		itemQuantityTotal,
		itemPriceTotal,
		shippingTotal,
		taxTotal,
		taxCalcLoading,
		cartLoading,
		checkoutEmail,
		shippingAddress,
		validateLocalCheckoutFields,
		validateAddressDeliverable,
		hydrateCart,
	} = useShoppingCart();

	const {
		pendingCheckout,
		pendingSubmission,
		startSubmitting,
		startConfirming,
		settle,
		triggerTimeout,
	} = useCheckoutStatus();
	const shippingFormRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		hydrateCart();
	}, []);

	const orderTotal =
		itemPriceTotal + shippingTotal + (taxTotal || 0);

	const handleConfirmation = async () => {
		const scrollToShippingForm = () => {
			if (layout === Layout.MOBILE && shippingFormRef.current) {
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

		startSubmitting(CheckoutType.StandardCheckout);

		if (!(await validateAddressDeliverable())) {
			settle();
			scrollToShippingForm();
			return;
		}

		const { error } = await elements.submit();
		if (error) {
			settle();
			toastError(
				'Invalid payment details',
				error.message ??
					'Please check your payment details and try again.',
			);
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
			settle();
			toastError(
				'Prices have changed',
				'Please refresh the page and try again.',
			);
			return;
		}

		if (intentResult.error !== null) {
			settle();
			toastError('Failed to submit order', intentResult.error);
			return;
		}

		const { clientSecret, orderShortId, accessKey } =
			intentResult.data;
		const { error: confirmError } = await stripe.confirmPayment({
			elements,
			clientSecret,
			confirmParams: {
				return_url: `${window.location.origin}${getOrderPath(orderShortId, accessKey, isAuthenticated)}`,
			},
			redirect: 'if_required',
		});

		if (confirmError) {
			settle();
			toastError(
				'Payment failed',
				confirmError.message ??
					'Please check your payment details and try again.',
			);
		} else {
			startConfirming();
			pollUntilPaid(orderShortId, accessKey, {
				onSuccess: settle,
				onTimeout: triggerTimeout,
			});
		}
	};

	const layout = useBreakpointValue({
		base: Layout.MOBILE,
		md: Layout.DESKTOP,
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

	if (layout === Layout.MOBILE) {
		return (
			<Stack gap={0}>
				<Stack
					p={CHECKOUT_GAP}
					gap={CHECKOUT_GAP}
					ref={shippingFormRef}
				>
					<Heading>Complete Your Order</Heading>
					<CheckoutContactForm disabled={pendingCheckout} />
					<CheckoutShippingForm
						layout={layout}
						disabled={pendingCheckout}
					/>
					<CheckoutShoppingCartCompact />
				</Stack>

				<Stack
					p={CHECKOUT_GAP}
					gap={CHECKOUT_GAP}
					background="brand"
				>
					<Stack gap={SUMMARY_TOTAL_GAP}>
						{cartLoading ? (
							<>
								<SummarySkeleton />
								<Skeleton height={50} />
							</>
						) : (
							<>
								<ShoppingCartSummary
									textColor={'white'}
									pendingMessage="Enter shipping address"
								/>

								<Text
									fontSize={32}
									fontWeight={600}
									color="white"
								>
									{formatCentsAsDollars(orderTotal)}
								</Text>
							</>
						)}
						<CheckoutPaymentForm
							disabled={pendingCheckout}
						/>
					</Stack>
					{cartLoading ? (
						<Skeleton height={16} />
					) : (
						<Button
							size="2xl"
							width="full"
							fontSize={24}
							variant="outline"
							color="white"
							border="2px solid white"
							onClick={handleConfirmation}
							disabled={
								pendingCheckout || taxCalcLoading
							}
							loading={
								pendingSubmission ===
								CheckoutType.StandardCheckout
							}
						>
							<FaCheckCircle />
							Pay Now
						</Button>
					)}
				</Stack>
			</Stack>
		);
	}

	return (
		<Stack
			gap={CHECKOUT_GAP}
			mt={7}
			px={CHECKOUT_GAP}
			mx="auto"
			maxWidth={{ lg: 1000 }}
		>
			<Heading>Complete Your Order</Heading>
			<SimpleGrid
				columns={{ md: 5, lg: 3 }}
				gapX={10}
				gapY={CHECKOUT_GAP}
			>
				<GridItem colSpan={{ md: 3, lg: 2 }}>
					<Stack gap={7}>
						<CheckoutContactForm
							disabled={pendingCheckout}
						/>
						<CheckoutShippingForm
							layout={layout}
							disabled={pendingCheckout}
						/>

						<Stack gap={CHECKOUT_FIELD_GAP}>
							<CheckoutHeading>Payment</CheckoutHeading>
							<CheckoutPaymentForm
								disabled={pendingCheckout}
							/>
						</Stack>
					</Stack>
				</GridItem>
				<GridItem colSpan={{ md: 2, lg: 1 }}>
					<Stack gap={CHECKOUT_GAP}>
						<CheckoutShoppingCart />
						{cartLoading ? (
							<>
								<SummarySkeleton />
								<Skeleton
									height={50}
									mb={CHECKOUT_BUTTON_MARGIN_BOTTOM}
								/>
							</>
						) : (
							<>
								<ShoppingCartSummary pendingMessage="Enter shipping address" />
								<Button
									size="xl"
									width="100%"
									mb={CHECKOUT_BUTTON_MARGIN_BOTTOM}
									fontSize={24}
									onClick={handleConfirmation}
									disabled={
										pendingCheckout ||
										taxCalcLoading
									}
									loading={
										pendingSubmission ===
										CheckoutType.StandardCheckout
									}
								>
									<HStack gap={3}>
										<FaCheckCircle />
										Pay Now
									</HStack>

									<RxDotFilled />
									<Text
										fontSize={28}
										fontWeight={600}
										paddingBottom={0.5}
									>
										{formatCentsAsDollars(
											orderTotal,
										)}
									</Text>
								</Button>
							</>
						)}
					</Stack>
				</GridItem>
			</SimpleGrid>
		</Stack>
	);
};
