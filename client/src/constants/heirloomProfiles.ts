import { ReturnPolicyType } from '@heirloom/common/constants';
import { ListingFulfillmentProfiles } from '@heirloom/common/contract';

export const HEIRLOOM_LISTING_PROFILES: ListingFulfillmentProfiles = {
	processing: {
		minDays: 1,
		maxDays: 3,
	},
	shipping: {
		originZip: '60622',
		shippingDaysMin: 3,
		shippingDaysMax: 5,
		shippingRate: 0,
	},
	returns: {
		policyType: ReturnPolicyType.STANDARD,
		returnWindowDays: 30,
	},
};
