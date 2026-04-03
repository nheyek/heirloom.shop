import { CheckoutApiRequest } from '@common/types/apiRequest/CheckoutApiRequest';
import { PaymentIntentResponse } from '@common/types/PaymentIntentResponse';
import { TaxCalculationResponse } from '@common/types/TaxCalculationResponse';
import { Request, Response } from 'express';
import {
    calculateCheckoutTotals,
    createOrderItemSnapshots,
} from '../domain/checkout.domain';
import { loadCheckoutData } from '../services/checkout.service';
import {
    createOrder,
    updateOrderPaymentIntent,
} from '../services/order.service';
import { createPaymentIntent } from '../services/payment.service';
import { getTaxTotal } from '../services/tax.service';

export const calculateTax = async (
	request: Request<{}, {}, CheckoutApiRequest>,
	response: Response<TaxCalculationResponse>,
) => {
	// TODO: Address validation

	const queryData = await loadCheckoutData(request.body);
	const { subtotalCents, shippingCents: shippingCents } =
		calculateCheckoutTotals(request.body.items, queryData);

	response.json({
		TaxTotalCents: getTaxTotal(
			subtotalCents + shippingCents,
			request.body.shippingAddress,
		),
	});
};

export const submitOrder = async (
	request: Request<{}, {}, CheckoutApiRequest>,
	response: Response<PaymentIntentResponse>,
) => {
	const checkoutApiRequest = request.body;

	// Validate cart is not empty
	if (
		!checkoutApiRequest.items ||
		checkoutApiRequest.items.length === 0
	) {
		response.status(400).json({
			error: 'Cart cannot be empty',
		} as any);
		return;
	}

	const cartData = await loadCheckoutData(checkoutApiRequest);
	// TODO: Validate cart items have options selected for required variants

	const { subtotalCents, shippingCents: shippingCents } =
		calculateCheckoutTotals(checkoutApiRequest.items, cartData);
	const snapshots = createOrderItemSnapshots(
		checkoutApiRequest.items,
		cartData,
	);

	const preTaxTotal = subtotalCents + shippingCents;
	const taxTotal = getTaxTotal(
		preTaxTotal,
		checkoutApiRequest.shippingAddress,
	);

	const order = await createOrder(
		snapshots,
		checkoutApiRequest.shippingAddress,
		subtotalCents,
		shippingCents,
		taxTotal,
		checkoutApiRequest.email,
	);

	const paymentIntent = await createPaymentIntent(
		preTaxTotal + taxTotal,
		{
			orderId: order.id,
		},
	);
	await updateOrderPaymentIntent(order.id, paymentIntent.id);

	if (!paymentIntent.client_secret) {
		response.status(500);
		return;
	}

	response.json({
		orderShortId: order.shortId,
		clientSecret: paymentIntent.client_secret,
	});
};
