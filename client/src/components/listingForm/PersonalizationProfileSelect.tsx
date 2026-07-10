import { PersonalizationProfileDialog } from '@client/components/listingForm/PersonalizationProfileDialog';
import { ProfileSelect } from '@client/components/listingForm/ProfileSelect';
import { useApiClient } from '@client/hooks/useApiClient';
import { PersonalizationProfile } from '@client/hooks/useListingForm';
import { toastError } from '@client/toaster';
import { callApi } from '@client/utils/apiUtils';
import { useState } from 'react';

type Props = {
	shopShortId: string;
	profiles: PersonalizationProfile[];
	onAddProfile: (profile: PersonalizationProfile) => void;
	value: string | null;
	onChange: (v: string | null) => void;
	disabled?: boolean;
};

export const PersonalizationProfileSelect = ({
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
			<PersonalizationProfileDialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				existingNames={profiles.map((p) => p.name)}
				saving={saving}
				onConfirm={async (p) => {
					setSaving(true);
					const result = await callApi(
						apiClient.shopManager.createPersonalizationProfile({
							params: { shopId: shopShortId },
							body: {
								name: p.name,
								costCents: p.costCents,
								helperText: p.helperText,
							},
						}),
					);
					setSaving(false);
					if (result.error !== null) {
						toastError(
							'Failed to create personalization profile.',
						);
						return;
					}
					const profile: PersonalizationProfile = {
						id: String(result.data.id),
						name: result.data.name,
						costCents: result.data.costCents,
						helperText: result.data.helperText,
					};
					onAddProfile(profile);
					onChange(profile.id);
					setDialogOpen(false);
				}}
			/>
		</>
	);
};
