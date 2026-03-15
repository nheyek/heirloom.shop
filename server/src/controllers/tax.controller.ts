import { CheckoutData } from '@common/types/CheckoutData';
import { Request, Response } from 'express';
import { calculateCheckoutTotals } from '../services/checkout.service';

export const calculateTax = async (
	request: Request<{}, {}, CheckoutData>,
	response: Response,
) => {
	// TODO: Address validation

	const preTaxTotal = await calculateCheckoutTotals(request.body);
	const illinoisSalesTaxRate = 0.0625; // TODO: Replace with Stripe sales tax calculation

	let taxTotal = 0;
	const zipCodeNumeric = Number(request.body.shippingAddress.zip);
	if (zipCodeNumeric >= 60001 && zipCodeNumeric <= 62999) {
		taxTotal = Math.ceil(illinoisSalesTaxRate * preTaxTotal * 100) / 100;
	}

	response.json(taxTotal);
};
