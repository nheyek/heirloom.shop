import { PaymentDetails } from '../contract.js';
import { capitalize } from './stringUtils.js';

export const CARD_BRAND_LABELS: Record<string, string> = {
	visa: 'Visa',
	mastercard: 'Mastercard',
	amex: 'American Express',
	discover: 'Discover',
	diners: 'Diners Club',
	jcb: 'JCB',
	unionpay: 'UnionPay',
};

export const WALLET_LABELS: Record<string, string> = {
	apple_pay: 'Apple Pay',
};

export const formatPaymentDetails = (
	paymentDetails: PaymentDetails,
): string => {
	const brandLabel =
		CARD_BRAND_LABELS[paymentDetails.cardBrand] ??
		capitalize(paymentDetails.cardBrand);
	const walletLabel = paymentDetails.walletType
		? (WALLET_LABELS[paymentDetails.walletType] ??
			capitalize(paymentDetails.walletType))
		: null;

	return `${brandLabel} •••• ${paymentDetails.cardLast4}${walletLabel ? ` via ${walletLabel}` : ''}`;
};
