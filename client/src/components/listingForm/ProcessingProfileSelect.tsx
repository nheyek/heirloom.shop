import { ProcessingProfileDialog } from '@client/components/listingForm/ProcessingProfileDialog';
import { ProfileSelect } from '@client/components/listingForm/ProfileSelect';
import { useApiClient } from '@client/hooks/useApiClient';
import { ProcessingProfile } from '@client/hooks/useListingForm';
import { toastError } from '@client/toaster';
import { callApi } from '@client/utils/apiUtils';
import { useState } from 'react';

type Props = {
	shopShortId: string;
	profiles: ProcessingProfile[];
	onAddProfile: (profile: ProcessingProfile) => void;
	value: string | null;
	onChange: (v: string | null) => void;
	disabled?: boolean;
};

export const ProcessingProfileSelect = ({
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
			<ProcessingProfileDialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				existingNames={profiles.map((p) => p.name)}
				saving={saving}
				onConfirm={async (p) => {
					setSaving(true);
					const result = await callApi(
						apiClient.shopManager.createProcessingProfile(
							{
								params: { shopId: shopShortId },
								body: {
									name: p.name,
									minDays: p.minDays,
									maxDays: p.maxDays,
								},
							},
						),
					);
					setSaving(false);
					if (result.error !== null) {
						toastError(
							'Failed to create processing profile.',
						);
						return;
					}
					const profile: ProcessingProfile = {
						id: String(result.data.id),
						name: result.data.name,
						minDays: result.data.minDays,
						maxDays: result.data.maxDays,
					};
					onAddProfile(profile);
					onChange(profile.id);
					setDialogOpen(false);
				}}
			/>
		</>
	);
};
