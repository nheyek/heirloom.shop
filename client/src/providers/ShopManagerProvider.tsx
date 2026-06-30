import { ShippingCostType } from '@client/components/listingForm/ShippingProfileDialog';
import { useApiClient } from '@client/hooks/useApiClient';
import {
	ProcessingProfile,
	ReturnProfile,
	ShippingProfile,
} from '@client/hooks/useListingForm';
import { callApi } from '@client/utils/apiUtils';
import { ReturnPolicyType } from '@heirloom/common/constants';
import { ShopManagerReturnProfile, ShopManagerShippingProfile } from '@heirloom/common/contract';
import { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type ShopManagerContextValue = {
	directFulfillment: boolean;
	setDirectFulfillment: (directFulfillment: boolean) => void;
	processingProfiles: ProcessingProfile[];
	shippingProfiles: ShippingProfile[];
	returnProfiles: ReturnProfile[];
	profilesLoading: boolean;
};

const ShopManagerContext = createContext<ShopManagerContextValue | null>(null);

export const useShopManager = (): ShopManagerContextValue => {
	const ctx = useContext(ShopManagerContext);
	if (!ctx) throw new Error('useShopManager must be used inside ShopManagerProvider');
	return ctx;
};

const toFormShippingProfile = (p: ShopManagerShippingProfile): ShippingProfile => ({
	id: String(p.id),
	name: p.name,
	originZip: p.originZip,
	cost:
		p.flatShippingRateCents != null
			? { type: ShippingCostType.FlatRate, cents: p.flatShippingRateCents }
			: { type: ShippingCostType.Free },
	minDays: p.shippingDaysMin,
	maxDays: p.shippingDaysMax,
});

const toFormReturnProfile = (p: ShopManagerReturnProfile): ReturnProfile => {
	const base = { id: String(p.id), name: p.name };
	if (p.policyType === ReturnPolicyType.NO_RETURNS) {
		return { ...base, policy: { type: ReturnPolicyType.NO_RETURNS } };
	}
	return {
		...base,
		windowDays: p.returnWindowDays ?? undefined,
		policy: {
			type: p.policyType === ReturnPolicyType.CUSTOM
				? ReturnPolicyType.CUSTOM
				: ReturnPolicyType.STANDARD,
			text: p.policyDescrRichText ?? '',
		},
	};
};

export const ShopManagerProvider = ({ children }: { children: React.ReactNode }) => {
	const { shortId: shopShortId } = useParams<{ shortId: string }>();
	const apiClient = useApiClient();

	const [directFulfillment, setDirectFulfillment] = useState(true);
	const [processingProfiles, setProcessingProfiles] = useState<ProcessingProfile[]>([]);
	const [shippingProfiles, setShippingProfiles] = useState<ShippingProfile[]>([]);
	const [returnProfiles, setReturnProfiles] = useState<ReturnProfile[]>([]);
	const [profilesLoading, setProfilesLoading] = useState(true);

	useEffect(() => {
		if (!shopShortId) return;
		setProfilesLoading(true);

		callApi(
			apiClient.shopManager.getProfiles({ params: { shopId: shopShortId } }),
		).then((result) => {
			if (result.error === null) {
				setDirectFulfillment(result.data.directFulfillment);
				setProcessingProfiles(
					result.data.processingProfiles.map((p) => ({
						id: String(p.id),
						name: p.name,
						minDays: p.minDays,
						maxDays: p.maxDays,
					})),
				);
				setShippingProfiles(result.data.shippingProfiles.map(toFormShippingProfile));
				setReturnProfiles(result.data.returnProfiles.map(toFormReturnProfile));
			}
			setProfilesLoading(false);
		});
	}, [shopShortId]);

	return (
		<ShopManagerContext.Provider
			value={{
				directFulfillment,
				setDirectFulfillment,
				processingProfiles,
				shippingProfiles,
				returnProfiles,
				profilesLoading,
			}}
		>
			{children}
		</ShopManagerContext.Provider>
	);
};
