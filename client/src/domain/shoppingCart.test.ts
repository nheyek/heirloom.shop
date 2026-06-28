import { CartItemData } from '@heirloom/common/contract';
import { combinationKey } from '@heirloom/common/domain/listing';
import { calculateItemPrice } from './shoppingCart';

const baseListingData: CartItemData = {
	id: 1,
	shortId: 'abc123',
	title: 'Test Listing',
	subtitle: '',
	categoryId: 'cat1',
	priceCents: 1000,
	shopId: 1,
	shopShortId: 'shop1',
	shopTitle: 'Test Shop',
	imageUuids: [],
	variations: {},
	combinations: {},
	shippingPrice: 500,
};

describe('calculateItemPrice', () => {
	it('returns the base price when there are no selected options', () => {
		expect(calculateItemPrice(baseListingData, {})).toBe(1000);
	});

	it('returns the combination price when a matching combination exists', () => {
		const varId = 'var-uuid-1';
		const optId = 'opt-uuid-2';
		const key = combinationKey({ [varId]: optId });
		const listingData: CartItemData = {
			...baseListingData,
			combinations: {
				[key]: { priceCents: 1500, imageUuid: null, disabled: false },
			},
		};

		expect(calculateItemPrice(listingData, { [varId]: optId })).toBe(1500);
	});

	it('falls back to base priceCents when no matching combination exists', () => {
		expect(calculateItemPrice(baseListingData, { 'var-uuid-1': 'opt-uuid-x' })).toBe(1000);
	});

	it('falls back to base priceCents when combination priceCents is null', () => {
		const varId = 'var-uuid-1';
		const optId = 'opt-uuid-2';
		const key = combinationKey({ [varId]: optId });
		const listingData: CartItemData = {
			...baseListingData,
			combinations: {
				[key]: { priceCents: null, imageUuid: null, disabled: false },
			},
		};

		expect(calculateItemPrice(listingData, { [varId]: optId })).toBe(1000);
	});

	it('resolves the correct combination across multiple variations', () => {
		const varId1 = 'var-uuid-size';
		const varId2 = 'var-uuid-material';
		const optId1 = 'opt-uuid-large';
		const optId2 = 'opt-uuid-gold';
		const key = combinationKey({ [varId1]: optId1, [varId2]: optId2 });
		const listingData: CartItemData = {
			...baseListingData,
			combinations: {
				[key]: { priceCents: 3500, imageUuid: null, disabled: false },
			},
		};

		expect(calculateItemPrice(listingData, { [varId1]: optId1, [varId2]: optId2 })).toBe(3500);
	});
});
