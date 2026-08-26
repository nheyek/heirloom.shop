import { describe, expect, it } from '@jest/globals';
import { formatPaymentDetails } from './paymentDisplay.js';

describe('formatPaymentDetails', () => {
	it('formats a plain card', () => {
		expect(
			formatPaymentDetails({
				cardBrand: 'visa',
				cardLast4: '4242',
				walletType: null,
				receiptUrl: null,
			}),
		).toBe('Visa •••• 4242');
	});

	it('appends the wallet name when present', () => {
		expect(
			formatPaymentDetails({
				cardBrand: 'visa',
				cardLast4: '4242',
				walletType: 'apple_pay',
				receiptUrl: null,
			}),
		).toBe('Visa •••• 4242 via Apple Pay');
	});

	it('falls back to a capitalized brand for unrecognized brands', () => {
		expect(
			formatPaymentDetails({
				cardBrand: 'eftpos_au',
				cardLast4: '1234',
				walletType: null,
				receiptUrl: null,
			}),
		).toBe('Eftpos_au •••• 1234');
	});
});
