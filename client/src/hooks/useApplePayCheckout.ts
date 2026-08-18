import { simplifyCartItems } from '@client/domain/checkout';
import { useApiClient } from '@client/hooks/useApiClient';
import { useOrderStatusPoll } from '@client/hooks/useOrderStatusPoll';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';
import { toastError } from '@client/toaster';
import { callApi } from '@client/utils/apiUtils';
import { ShippingAddress } from '@heirloom/common/contract';
import { useStripe } from '@stripe/react-stripe-js';
import {
	PaymentRequest,
	PaymentRequestItem,
	PaymentRequestShippingOption,
} from '@stripe/stripe-js';
import { useEffect, useRef, useState } from 'react';

const PAYMENT_REQUEST_LABEL = 'Heirloom';
const SHIPPING_OPTION_ID = 'standard';

const buildShippingOptions = (
	shippingTotal: number,
): PaymentRequestShippingOption[] => [
	{
		id: SHIPPING_OPTION_ID,
		label: 'Shipping',
		detail: '',
		amount: shippingTotal,
	},
];

const buildDisplayItems = (
	itemPriceTotal: number,
	taxCents: number,
): PaymentRequestItem[] => [
	{ label: 'Subtotal', amount: itemPriceTotal },
	{ label: 'Tax', amount: taxCents },
];

const splitRecipientName = (recipient: string | undefined) => {
	const [firstName = '', ...rest] = (recipient ?? '').trim().split(/\s+/);
	return { firstName, lastName: rest.join(' ') || firstName };
};

type CartSnapshot = {
	items: ReturnType<typeof simplifyCartItems>;
	itemPriceTotal: number;
	shippingTotal: number;
};

export const useApplePayCheckout = (onClose: () => void) => {
	const stripe = useStripe();
	const apiClient = useApiClient();
	const { pollUntilPaid } = useOrderStatusPoll();
	const { items, itemPriceTotal, shippingTotal } = useShoppingCart();

	const [paymentRequest, setPaymentRequest] =
		useState<PaymentRequest | null>(null);
	const [available, setAvailable] = useState(false);
	const [pending, setPending] = useState(false);

	const cartRef = useRef<CartSnapshot>({
		items: simplifyCartItems(items),
		itemPriceTotal,
		shippingTotal,
	});
	const taxCentsRef = useRef<number>(0);

	useEffect(() => {
		cartRef.current = {
			items: simplifyCartItems(items),
			itemPriceTotal,
			shippingTotal,
		};
	}, [items, itemPriceTotal, shippingTotal]);

	useEffect(() => {
		if (!stripe) return;

		const pr = stripe.paymentRequest({
			country: 'US',
			currency: 'usd',
			total: {
				label: PAYMENT_REQUEST_LABEL,
				amount: itemPriceTotal + shippingTotal,
			},
			displayItems: buildDisplayItems(itemPriceTotal, 0),
			shippingOptions: buildShippingOptions(shippingTotal),
			requestPayerName: true,
			requestPayerEmail: true,
			requestShipping: true,
			disableWallets: ['googlePay', 'link', 'browserCard'],
		});

		pr.canMakePayment().then((result) => {
			setAvailable(!!result?.applePay);
		});

		pr.on('shippingaddresschange', async (event) => {
			const shippingAddress: ShippingAddress = {
				firstName: '',
				lastName: '',
				line1: '',
				line2: '',
				city: event.shippingAddress.city ?? '',
				state: event.shippingAddress.region ?? '',
				zip: event.shippingAddress.postalCode ?? '',
			};

			const result = await callApi(
				apiClient.checkout.calculateTax({
					body: {
						items: cartRef.current.items,
						shippingAddress,
					},
				}),
			);

			if (result.error !== null) {
				event.updateWith({ status: 'fail' });
				return;
			}

			taxCentsRef.current = result.data.TaxTotalCents;
			const current = cartRef.current;

			event.updateWith({
				status: 'success',
				total: {
					label: PAYMENT_REQUEST_LABEL,
					amount:
						current.itemPriceTotal +
						current.shippingTotal +
						result.data.TaxTotalCents,
				},
				displayItems: buildDisplayItems(
					current.itemPriceTotal,
					result.data.TaxTotalCents,
				),
				shippingOptions: buildShippingOptions(
					current.shippingTotal,
				),
			});
		});

		pr.on('paymentmethod', async (event) => {
			setPending(true);

			try {
				const address = event.shippingAddress;
				const { firstName, lastName } = splitRecipientName(
					address?.recipient,
				);
				const shippingAddress: ShippingAddress = {
					firstName,
					lastName,
					line1: address?.addressLine?.[0] ?? '',
					line2: address?.addressLine?.[1] ?? '',
					city: address?.city ?? '',
					state: address?.region ?? '',
					zip: address?.postalCode ?? '',
				};

				const current = cartRef.current;
				const totalCents =
					current.itemPriceTotal +
					current.shippingTotal +
					taxCentsRef.current;

				const submitResult = await callApi(
					apiClient.checkout.submitOrder({
						body: {
							items: current.items,
							email: event.payerEmail ?? '',
							shippingAddress,
							totalCents,
						},
					}),
				);

				if (submitResult.status === 409) {
					event.complete('fail');
					setPending(false);
					toastError(
						'Prices have changed',
						'Please refresh the page and try again.',
					);
					return;
				}

				if (submitResult.error !== null) {
					event.complete('fail');
					setPending(false);
					toastError('Failed to submit order', submitResult.error);
					return;
				}

				const { clientSecret, orderShortId, accessKey } =
					submitResult.data;

				const { paymentIntent, error: confirmError } =
					await stripe.confirmCardPayment(
						clientSecret,
						{ payment_method: event.paymentMethod.id },
						{ handleActions: false },
					);

				if (confirmError) {
					event.complete('fail');
					setPending(false);
					toastError(
						'Payment failed',
						confirmError.message ??
							'Please check your payment details and try again.',
					);
					return;
				}

				event.complete('success');

				if (paymentIntent?.status === 'requires_action') {
					const { error: actionError } =
						await stripe.confirmCardPayment(clientSecret);
					if (actionError) {
						setPending(false);
						toastError(
							'Payment failed',
							actionError.message ??
								'Please check your payment details and try again.',
						);
						return;
					}
				}

				pollUntilPaid(orderShortId, accessKey, {
					onSuccess: onClose,
					onSettled: () => setPending(false),
				});
			} catch {
				event.complete('fail');
				setPending(false);
				toastError(
					'Failed to submit order',
					'Something went wrong processing your payment. Please try again.',
				);
			}
		});

		setPaymentRequest(pr);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stripe]);

	useEffect(() => {
		if (!paymentRequest) return;
		paymentRequest.update({
			total: {
				label: PAYMENT_REQUEST_LABEL,
				amount:
					itemPriceTotal + shippingTotal + taxCentsRef.current,
			},
			displayItems: buildDisplayItems(
				itemPriceTotal,
				taxCentsRef.current,
			),
			shippingOptions: buildShippingOptions(shippingTotal),
		});
	}, [paymentRequest, itemPriceTotal, shippingTotal]);

	return { paymentRequest, available, pending };
};
