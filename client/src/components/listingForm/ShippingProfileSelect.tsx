import { ShippingCostType, ShippingProfileDialog } from '@client/components/listingForm/ShippingProfileDialog';
import { ProfileSelect } from '@client/components/listingForm/ProfileSelect';
import { ShippingProfile } from '@client/components/listingForm/useListingForm';
import { useApiClient } from '@client/hooks/useApiClient';
import { toastError } from '@client/toaster';
import { callApi } from '@client/utils/apiUtils';
import { useState } from 'react';

type Props = {
	shopShortId: string;
	profiles: ShippingProfile[];
	onAddProfile: (profile: ShippingProfile) => void;
	value: string | null;
	onChange: (v: string | null) => void;
	disabled?: boolean;
};

export const ShippingProfileSelect = ({
	shopShortId,
	profiles,
	onAddProfile,
	value,
	onChange,
	disabled,
}: Props) => {
	const apiClient = useApiClient();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [saving, setSaving] = useState(false);

	return (
		<>
			<ProfileSelect
				items={profiles.map((p) => ({
					value: String(p.id),
					label: p.name,
				}))}
				value={value}
				onChange={onChange}
				onClickAdd={() => setDialogOpen(true)}
				disabled={disabled}
			/>
			<ShippingProfileDialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				existingNames={profiles.map((p) => p.name)}
				saving={saving}
				onConfirm={async (p) => {
					setSaving(true);
					const flatRate = p.cost.type === ShippingCostType.FlatRate ? p.cost.cents : null;
					const result = await callApi(
						apiClient.shopManager.createShippingProfile({
							params: { shopId: shopShortId },
							body: {
								name: p.name,
								originZip: p.originZip,
								flatShippingRateCents: flatRate,
								shippingDaysMin: p.minDays,
								shippingDaysMax: p.maxDays,
							},
						}),
					);
					setSaving(false);
					if (result.error !== null) {
						toastError('Failed to create shipping profile.');
						return;
					}
					const profile: ShippingProfile = {
						id: String(result.data.id),
						name: result.data.name,
						originZip: result.data.originZip,
						cost: result.data.flatShippingRateCents != null
							? { type: ShippingCostType.FlatRate, cents: result.data.flatShippingRateCents }
							: { type: ShippingCostType.Free },
						minDays: result.data.shippingDaysMin,
						maxDays: result.data.shippingDaysMax,
					};
					onAddProfile(profile);
					onChange(profile.id);
					setDialogOpen(false);
				}}
			/>
		</>
	);
};
