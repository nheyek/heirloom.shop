import { CheckoutData } from '@common/types/CheckoutData';
import { Request, Response } from 'express';
import { calculateCheckoutTotals } from '../services/checkout.service';

export const calculateTax = async (
	request: Request<{}, {}, CheckoutData>,
	response: Response,
) => {
	const totals = await calculateCheckoutTotals(request.body);
	const subTotal = totals.subtotalDollars;
	// TODO: calculate tax using subTotal and request.body.shippingAddress
};
