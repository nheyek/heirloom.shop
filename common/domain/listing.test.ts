import { describe, expect, it } from '@jest/globals';
import {
	Combinations,
	Variations,
	getCombinationKey,
	getListingDisplayPrice,
} from './listing.js';

const makeVariation = (
	name: string,
	order: number,
	pricesVary: boolean,
	options: Record<string, { order: number; priceCents?: number | null }>,
) => ({
	name,
	order,
	pricesVary,
	options: Object.fromEntries(
		Object.entries(options).map(([id, o]) => [
			id,
			{
				name: id,
				order: o.order,
				priceCents: o.priceCents ?? null,
				imageUuid: null,
			},
		]),
	),
});

describe('getListingDisplayPrice', () => {
	it('returns the base price when there are no variations', () => {
		expect(getListingDisplayPrice({}, {}, 1500)).toEqual({
			priceCents: 1500,
			isMinimum: false,
		});
	});

	it('returns null when there are no variations and no base price', () => {
		expect(getListingDisplayPrice({}, {}, null)).toBeNull();
	});

	it('returns the base price when variations exist but none affect price', () => {
		const variations: Variations = {
			size: makeVariation('Size', 0, false, {
				s: { order: 0 },
				m: { order: 1 },
			}),
		};
		expect(getListingDisplayPrice(variations, {}, 2000)).toEqual({
			priceCents: 2000,
			isMinimum: false,
		});
	});

	it('returns the lowest option price as a minimum when prices vary', () => {
		const variations: Variations = {
			size: makeVariation('Size', 0, true, {
				s: { order: 0, priceCents: 1000 },
				m: { order: 1, priceCents: 1500 },
			}),
		};
		expect(getListingDisplayPrice(variations, {}, null)).toEqual({
			priceCents: 1000,
			isMinimum: true,
		});
	});

	it('prefers combination-level prices over option prices', () => {
		const variations: Variations = {
			size: makeVariation('Size', 0, true, {
				s: { order: 0, priceCents: 1000 },
				m: { order: 1, priceCents: 1500 },
			}),
		};
		const combinations: Combinations = {
			[getCombinationKey({ size: 's' })]: {
				priceCents: 800,
				imageUuid: null,
				disabled: false,
			},
		};
		expect(
			getListingDisplayPrice(variations, combinations, null),
		).toEqual({ priceCents: 800, isMinimum: true });
	});

	it('ignores disabled combinations', () => {
		const variations: Variations = {
			size: makeVariation('Size', 0, true, {
				s: { order: 0, priceCents: 1000 },
				m: { order: 1, priceCents: 1500 },
			}),
		};
		const combinations: Combinations = {
			[getCombinationKey({ size: 's' })]: {
				priceCents: null,
				imageUuid: null,
				disabled: true,
			},
		};
		// Only one purchasable combination remains, so the price is exact.
		expect(
			getListingDisplayPrice(variations, combinations, null),
		).toEqual({ priceCents: 1500, isMinimum: false });
	});

	it('uses variation order for option price precedence', () => {
		// Both variations price-vary; the lower-order variation's option
		// price wins when a combination has no explicit price.
		const variations: Variations = {
			color: makeVariation('Color', 0, true, {
				red: { order: 0, priceCents: 3000 },
			}),
			size: makeVariation('Size', 1, true, {
				s: { order: 0, priceCents: 100 },
			}),
		};
		// A single combination exists, so the price is exact.
		expect(getListingDisplayPrice(variations, {}, null)).toEqual({
			priceCents: 3000,
			isMinimum: false,
		});
	});

	it('falls back to the base price for combinations with no resolvable price', () => {
		const variations: Variations = {
			size: makeVariation('Size', 0, true, {
				s: { order: 0 },
				m: { order: 1, priceCents: 1500 },
			}),
		};
		expect(getListingDisplayPrice(variations, {}, 900)).toEqual({
			priceCents: 900,
			isMinimum: true,
		});
	});

	it('returns null when prices vary but nothing resolves to a price', () => {
		const variations: Variations = {
			size: makeVariation('Size', 0, true, {
				s: { order: 0 },
			}),
		};
		expect(getListingDisplayPrice(variations, {}, null)).toBeNull();
	});

	it('raises the floor when a selection rules out cheaper combinations', () => {
		const variations: Variations = {
			size: makeVariation('Size', 0, true, {
				s: { order: 0, priceCents: 1000 },
				m: { order: 1, priceCents: 1500 },
			}),
			engraving: makeVariation('Engraving', 1, false, {
				yes: { order: 0 },
				no: { order: 1 },
			}),
		};
		expect(
			getListingDisplayPrice(variations, {}, null, { size: 'm' }),
		).toEqual({ priceCents: 1500, isMinimum: false });
	});

	it('returns an exact price once all price-sensitive variations are selected', () => {
		const variations: Variations = {
			size: makeVariation('Size', 0, true, {
				s: { order: 0, priceCents: 1000 },
				m: { order: 1, priceCents: 1500 },
			}),
			color: makeVariation('Color', 1, false, {
				red: { order: 0 },
				blue: { order: 1 },
			}),
		};
		expect(
			getListingDisplayPrice(variations, {}, null, { size: 's' }),
		).toEqual({ priceCents: 1000, isMinimum: false });
	});

	it('stays a minimum when a partial selection leaves multiple prices reachable', () => {
		const variations: Variations = {
			size: makeVariation('Size', 0, true, {
				s: { order: 0, priceCents: 1000 },
				m: { order: 1, priceCents: 1500 },
			}),
			color: makeVariation('Color', 1, false, {
				red: { order: 0 },
				blue: { order: 1 },
			}),
		};
		expect(
			getListingDisplayPrice(variations, {}, null, {
				color: 'red',
			}),
		).toEqual({ priceCents: 1000, isMinimum: true });
	});

	it('remains a minimum when combination overrides differ across a non-price variation', () => {
		const variations: Variations = {
			size: makeVariation('Size', 0, true, {
				s: { order: 0, priceCents: 1000 },
			}),
			color: makeVariation('Color', 1, false, {
				red: { order: 0 },
				blue: { order: 1 },
			}),
		};
		const combinations: Combinations = {
			[getCombinationKey({ size: 's', color: 'red' })]: {
				priceCents: 2000,
				imageUuid: null,
				disabled: false,
			},
		};
		expect(
			getListingDisplayPrice(variations, combinations, null, {
				size: 's',
			}),
		).toEqual({ priceCents: 1000, isMinimum: true });
	});

	it('excludes combinations disabled after selection from the floor', () => {
		const variations: Variations = {
			size: makeVariation('Size', 0, true, {
				s: { order: 0, priceCents: 1000 },
				m: { order: 1, priceCents: 1500 },
			}),
			color: makeVariation('Color', 1, false, {
				red: { order: 0 },
				blue: { order: 1 },
			}),
		};
		const combinations: Combinations = {
			[getCombinationKey({ size: 's', color: 'red' })]: {
				priceCents: null,
				imageUuid: null,
				disabled: true,
			},
		};
		expect(
			getListingDisplayPrice(variations, combinations, null, {
				color: 'red',
			}),
		).toEqual({ priceCents: 1500, isMinimum: false });
	});
});
