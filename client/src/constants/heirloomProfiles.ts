import { ShippingCostType } from '@client/components/listingForm/ShippingProfileDialog';
import {
	ProcessingProfile,
	ReturnProfile,
	ShippingProfile,
} from '@client/hooks/useListingForm';
import { ReturnPolicyType } from '@heirloom/common/constants';

export const HEIRLOOM_PROCESSING_PROFILE: ProcessingProfile = {
	id: 'heirloom',
	name: 'Heirloom',
	minDays: 1,
	maxDays: 3,
};

export const HEIRLOOM_SHIPPING_PROFILE: ShippingProfile = {
	id: 'heirloom',
	name: 'Heirloom',
	originZip: '60622',
	cost: { type: ShippingCostType.Free },
	minDays: 3,
	maxDays: 5,
};

export const HEIRLOOM_RETURN_PROFILE: ReturnProfile = {
	id: 'heirloom',
	name: 'Heirloom',
	windowDays: 30,
	policy: { type: ReturnPolicyType.STANDARD },
};
