import { ShippingCostType } from '@client/components/listingForm/ShippingProfileDialog';
import {
	PersonalizationProfile,
	ProcessingProfile,
	ReturnProfile,
	ShippingProfile,
} from '@client/components/listingForm/useListingForm';
import { useApiClient } from '@client/hooks/useApiClient';
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
	personalizationProfiles: PersonalizationProfile[];
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
	if (p.policyType === ReturnPolicyType.CUSTOM) {
		return {
			...base,
			windowDays: p.returnWindowDays ?? undefined,
			policy: { type: ReturnPolicyType.CUSTOM, text: p.policyDescrRichText ?? '' },
		};
	}
	return {
		...base,
		windowDays: p.returnWindowDays ?? undefined,
		policy: { type: ReturnPolicyType.STANDARD },
	};
};

export const ShopManagerProvider = ({ children }: { children: React.ReactNode }) => {
	const { shortId: shopShortId } = useParams<{ shortId: string }>();
	const apiClient = useApiClient();

	const [directFulfillment, setDirectFulfillment] = useState(true);
	const [processingProfiles, setProcessingProfiles] = useState<ProcessingProfile[]>([]);
	const [shippingProfiles, setShippingProfiles] = useState<ShippingProfile[]>([]);
	const [returnProfiles, setReturnProfiles] = useState<ReturnProfile[]>([]);
	const [personalizationProfiles, setPersonalizationProfiles] = useState<PersonalizationProfile[]>([]);
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
				setPersonalizationProfiles(
					result.data.personalizationProfiles.map((p) => ({
						id: String(p.id),
						name: p.name,
						costCents: p.costCents,
						helperText: p.helperText,
					})),
				);
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
				personalizationProfiles,
				profilesLoading,
			}}
		>
			{children}
		</ShopManagerContext.Provider>
	);
};
