import { PaymentIntent } from '@common/types/PaymentIntent';
import { Request, Response } from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export const createPaymentIntent = async (
	request: Request<PaymentIntent>,
	response: Response,
) => {
	const { amount } = request.body;

	const paymentIntent = await stripe.paymentIntents.create({
		amount,
		currency: 'usd',
		payment_method_types: ['card'],
	});

	response.json({ clientSecret: paymentIntent.client_secret });
};
