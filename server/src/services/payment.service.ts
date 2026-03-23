import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export const createPaymentIntent = async (
	amountCents: number,
	metadata: any,
) => {
	const paymentIntent = await stripe.paymentIntents.create({
		amount: amountCents,
		currency: 'usd',
		automatic_payment_methods: { enabled: true },
		metadata,
	});

	return paymentIntent;
};
