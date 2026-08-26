import { PaymentDetails } from '@heirloom/common/contract';
import Stripe from 'stripe';

let _stripe: Stripe | null = null;
const getStripe = () => {
	if (!_stripe) _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: Stripe.API_VERSION });
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

export const retrievePaymentIntentCharge = async (
	paymentIntentId: string,
): Promise<Stripe.Charge | null> => {
	const paymentIntent = await getStripe().paymentIntents.retrieve(
		paymentIntentId,
		{ expand: ['latest_charge'] },
	);
	return (paymentIntent.latest_charge as Stripe.Charge | null) ?? null;
};

export const extractPaymentDetails = (
	charge: Stripe.Charge | null,
): PaymentDetails | null => {
	const card = charge?.payment_method_details?.card;
	if (!card?.brand || !card.last4) return null;

	return {
		cardBrand: card.brand,
		cardLast4: card.last4,
		walletType: card.wallet?.type ?? null,
		receiptUrl: charge?.receipt_url ?? null,
	};
};
