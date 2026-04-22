import Stripe from 'stripe';

let _stripe: Stripe | null = null;
const getStripe = () => {
	if (!_stripe) _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
	return _stripe;
};

export const createPaymentIntent = async (
	amountCents: number,
	metadata: any,
) => {
	const paymentIntent = await getStripe().paymentIntents.create({
		amount: amountCents,
		currency: 'usd',
		automatic_payment_methods: { enabled: true },
		metadata,
	});

	return paymentIntent;
};
