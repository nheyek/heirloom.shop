import { STANDARD_RETURN_POLICY_HTML } from '@client/constants';
import {
	DELIVERY_ESTIMATE_UNAVAILABLE_TEXT,
	ReturnPolicyType,
} from '@heirloom/common/constants';
import { ListingFulfillmentProfiles } from '@heirloom/common/contract';
import { HEIRLOOM_LISTING_PROFILES } from '@heirloom/common/domain/listing';
import { calculateDeliveryEstimate } from '@heirloom/common/utils/dateUtils';

export type ReturnPolicyDisplay = {
	text: string;
	descriptionHtml: string | null;
};

export const getReturnPolicyDisplay = (
	returnPolicy: ListingFulfillmentProfiles['returns'],
): ReturnPolicyDisplay => {
	let text = returnPolicy
		? 'No returns'
		: 'Returns info unavailable';
	if (
		returnPolicy &&
		returnPolicy.policyType !== ReturnPolicyType.NO_RETURNS &&
		(returnPolicy.returnWindowDays ?? 0) > 0
	) {
		text = `Returns accepted within ${returnPolicy.returnWindowDays} days`;
	}
	const descriptionHtml =
		returnPolicy?.policyType === ReturnPolicyType.STANDARD
			? STANDARD_RETURN_POLICY_HTML
			: returnPolicy?.policyType === ReturnPolicyType.CUSTOM
				? (returnPolicy.policyDescrRichText ?? null)
				: null;
	return { text, descriptionHtml };
};

// Shared between ListingPage and the cart mapper so both agree on which
// profiles apply — previously duplicated and diverged on the
// directFulfillment + null-profiles case (see mappers.ts).
export const resolveEffectiveProfiles = (listing: {
	directFulfillment: boolean;
	profiles: ListingFulfillmentProfiles | null;
}): ListingFulfillmentProfiles | null =>
	listing.directFulfillment
		? listing.profiles
		: HEIRLOOM_LISTING_PROFILES;

export const getDeliveryEstimateDisplay = (
	profiles: ListingFulfillmentProfiles | null,
): string =>
	profiles?.processing && profiles?.shipping
		? calculateDeliveryEstimate(profiles.processing, profiles.shipping)
		: DELIVERY_ESTIMATE_UNAVAILABLE_TEXT;
