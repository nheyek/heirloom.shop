import {
	getShippingAddressFieldErrors,
	getEmailFieldError,
	getSimpleCartItems,
} from './checkout';
import { ShippingAddress } from '@common/contract';
import { ShoppingCartItem } from '@common/types/ShoppingCartItem';

const validAddress: ShippingAddress = {
	firstName: 'John',
	lastName: 'Doe',
	line1: '123 Main St',
	line2: '',
	city: 'Springfield',
	state: 'IL',
	zip: '62701',
};

describe('getShippingAddressFieldErrors', () => {
	it('returns no errors for a valid address', () => {
		expect(getShippingAddressFieldErrors(validAddress)).toEqual({});
	});

	it('requires last name', () => {
		const errors = getShippingAddressFieldErrors({ ...validAddress, lastName: '   ' });
		expect(errors.lastName).toBe('Last name is required.');
	});

	it('requires address line 1', () => {
		const errors = getShippingAddressFieldErrors({ ...validAddress, line1: '' });
		expect(errors.line1).toBe('Address is required.');
	});

	it('requires city', () => {
		const errors = getShippingAddressFieldErrors({ ...validAddress, city: '' });
		expect(errors.city).toBe('City is required.');
	});

	it('requires state', () => {
		const errors = getShippingAddressFieldErrors({ ...validAddress, state: '  ' });
		expect(errors.state).toBe('State is required.');
	});

	it('requires zip', () => {
		const errors = getShippingAddressFieldErrors({ ...validAddress, zip: '' });
		expect(errors.zip).toBe('Zip code is required.');
	});

	it('rejects an invalid zip format', () => {
		const errors = getShippingAddressFieldErrors({ ...validAddress, zip: '1234' });
		expect(errors.zip).toBe('Invalid zip code.');
	});

	it('accepts a zip+4 format', () => {
		const errors = getShippingAddressFieldErrors({ ...validAddress, zip: '62701-1234' });
		expect(errors.zip).toBeUndefined();
	});

	it('can return multiple errors at once', () => {
		const errors = getShippingAddressFieldErrors({
			...validAddress,
			lastName: '',
			city: '',
		});
		expect(errors.lastName).toBeDefined();
		expect(errors.city).toBeDefined();
	});
});

describe('getEmailFieldError', () => {
	it('returns null for a valid email', () => {
		expect(getEmailFieldError('user@example.com')).toBeNull();
	});

	it('requires email', () => {
		expect(getEmailFieldError('')).toBe('Email is required.');
		expect(getEmailFieldError('   ')).toBe('Email is required.');
	});

	it('rejects an email without @', () => {
		expect(getEmailFieldError('notanemail')).toBe('Email format is invalid.');
	});

	it('rejects an email without a domain', () => {
		expect(getEmailFieldError('user@')).toBe('Email format is invalid.');
	});

	it('rejects an email without a TLD', () => {
		expect(getEmailFieldError('user@example')).toBe('Email format is invalid.');
	});
});

describe('getSimpleCartItems', () => {
	const makeItem = (shortId: string, quantity: number): ShoppingCartItem => ({
		listingData: {
			id: 1,
			shortId,
			title: 'Test',
			subtitle: '',
			categoryId: 'cat1',
			priceCents: 1000,
			shopId: 1,
			shopShortId: 'shop1',
			shopTitle: 'Test Shop',
			imageUuids: [],
			variations: [],
			shippingPrice: 500,
		},
		selectedOptions: { 1: 2 },
		quantity,
		addedAt: Date.now(),
	});

	it('maps items to simple cart items', () => {
		const result = getSimpleCartItems([makeItem('abc', 2), makeItem('xyz', 1)]);
		expect(result).toEqual([
			{ listingShortId: 'abc', selectedOptions: { 1: 2 }, quantity: 2 },
			{ listingShortId: 'xyz', selectedOptions: { 1: 2 }, quantity: 1 },
		]);
	});

	it('returns an empty array for an empty cart', () => {
		expect(getSimpleCartItems([])).toEqual([]);
	});
});
