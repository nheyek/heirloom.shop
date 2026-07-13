import { STANDARD_RETURN_POLICY_HTML } from '@client/constants';
import { HEIRLOOM_LISTING_PROFILES } from '@client/constants/heirloomProfiles';
import { ReturnPolicyType } from '@heirloom/common/constants';
import { ListingFulfillmentProfiles } from '@heirloom/common/contract';
import { calculateDeliveryEstimate } from '@heirloom/common/utils/dateUtils';
import {
	getDeliveryEstimateDisplay,
	getReturnPolicyDisplay,
	resolveEffectiveProfiles,
} from './listingPage';

describe('getReturnPolicyDisplay', () => {
	it('shows unavailable text when there is no return policy', () => {
		expect(getReturnPolicyDisplay(undefined)).toEqual({
			text: 'Returns info unavailable',
			descriptionHtml: null,
		});
	});

	it('shows "No returns" for a no-returns policy', () => {
		expect(
			getReturnPolicyDisplay({
				policyType: ReturnPolicyType.NO_RETURNS,
				returnWindowDays: 0,
			}),
		).toEqual({ text: 'No returns', descriptionHtml: null });
	});

	it('shows the return window and standard html for a standard policy', () => {
		expect(
			getReturnPolicyDisplay({
				policyType: ReturnPolicyType.STANDARD,
				returnWindowDays: 30,
			}),
		).toEqual({
			text: 'Returns accepted within 30 days',
			descriptionHtml: STANDARD_RETURN_POLICY_HTML,
		});
	});

	it('shows the return window and custom html for a custom policy', () => {
		expect(
			getReturnPolicyDisplay({
				policyType: ReturnPolicyType.CUSTOM,
				returnWindowDays: 14,
				policyDescrRichText: '<p>Custom policy</p>',
			}),
		).toEqual({
			text: 'Returns accepted within 14 days',
			descriptionHtml: '<p>Custom policy</p>',
		});
	});

	it('falls back to "No returns" text while still showing custom html when window days is falsy', () => {
		expect(
			getReturnPolicyDisplay({
				policyType: ReturnPolicyType.CUSTOM,
				returnWindowDays: 0,
				policyDescrRichText: '<p>Custom policy</p>',
			}),
		).toEqual({
			text: 'No returns',
			descriptionHtml: '<p>Custom policy</p>',
		});
	});
});

describe('resolveEffectiveProfiles', () => {
	const ownProfiles: ListingFulfillmentProfiles = {
		processing: { minDays: 2, maxDays: 4 },
	};

	it('uses the listing profiles when direct fulfillment is enabled', () => {
		expect(
			resolveEffectiveProfiles({
				directFulfillment: true,
				profiles: ownProfiles,
			}),
		).toBe(ownProfiles);
	});

	it('returns null when direct fulfillment is enabled but profiles are missing', () => {
		expect(
			resolveEffectiveProfiles({
				directFulfillment: true,
				profiles: null,
			}),
		).toBeNull();
	});

	it('always uses the Heirloom default profiles when direct fulfillment is disabled', () => {
		expect(
			resolveEffectiveProfiles({
				directFulfillment: false,
				profiles: ownProfiles,
			}),
		).toBe(HEIRLOOM_LISTING_PROFILES);
		expect(
			resolveEffectiveProfiles({
				directFulfillment: false,
				profiles: null,
			}),
		).toBe(HEIRLOOM_LISTING_PROFILES);
	});
});

describe('getDeliveryEstimateDisplay', () => {
	it('shows the fallback message when profiles are null', () => {
		expect(getDeliveryEstimateDisplay(null)).toBe(
			'Delivery estimate unavailable',
		);
	});

	it('shows the fallback message when processing or shipping is missing', () => {
		expect(
			getDeliveryEstimateDisplay({
				shipping: {
					originZip: '60622',
					shippingDaysMin: 3,
					shippingDaysMax: 5,
					shippingRate: 0,
				},
			}),
		).toBe('Delivery estimate unavailable');
	});

	it('delegates to calculateDeliveryEstimate when both profiles are present', () => {
		const processing = { minDays: 1, maxDays: 3 };
		const shipping = {
			originZip: '60622',
			shippingDaysMin: 3,
			shippingDaysMax: 5,
			shippingRate: 0,
		};
		expect(
			getDeliveryEstimateDisplay({ processing, shipping }),
		).toBe(calculateDeliveryEstimate(processing, shipping));
	});
});
