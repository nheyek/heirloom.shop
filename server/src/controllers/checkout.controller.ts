import { CheckoutData } from '@common/types/CheckoutData';
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
	request: Request<{}, {}, CheckoutData>,
	response: Response<TaxCalculationResponse>,
) => {
	// TODO: Address validation

	const queryData = await loadCheckoutData(request.body);
	const { subtotalCents, shippingTotalCents: shippingCents } =
		calculateCheckoutTotals(request.body.items, queryData);

	response.json({
		TaxTotalCents: getTaxTotal(
			subtotalCents + shippingCents,
			request.body.shippingAddress,
		),
	});
};

export const submitOrder = async (
	request: Request<{}, {}, CheckoutData>,
	response: Response<PaymentIntentResponse>,
) => {
	const checkoutData = request.body;

	const queryData = await loadCheckoutData(checkoutData);
	const { subtotalCents, shippingTotalCents: shippingCents } =
		calculateCheckoutTotals(checkoutData.items, queryData);
	const snapshots = createOrderItemSnapshots(
		checkoutData.items,
		queryData,
	);

	const preTaxTotal = subtotalCents + shippingCents;
	const taxTotal = getTaxTotal(
		preTaxTotal,
		checkoutData.shippingAddress,
	);

	const order = await createOrder(
		snapshots,
		checkoutData.shippingAddress,
		subtotalCents,
		shippingCents,
		taxTotal,
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
