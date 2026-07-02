import { ProfileSelect } from '@client/components/listingForm/ProfileSelect';
import { ReturnProfileDialog } from '@client/components/listingForm/ReturnProfileDialog';
import { useApiClient } from '@client/hooks/useApiClient';
import { ReturnProfile } from '@client/hooks/useListingForm';
import { toastError } from '@client/toaster';
import { callApi } from '@client/utils/apiUtils';
import { ReturnPolicyType } from '@heirloom/common/constants';
import { useState } from 'react';

type Props = {
	shopShortId: string;
	profiles: ReturnProfile[];
	onAddProfile: (profile: ReturnProfile) => void;
	value: string | null;
	onChange: (v: string | null) => void;
	disabled?: boolean;
};

export const ReturnProfileSelect = ({
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
			<ReturnProfileDialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				existingNames={profiles.map((p) => p.name)}
				saving={saving}
				onConfirm={async (p) => {
					setSaving(true);
					const result = await callApi(
						apiClient.shopManager.createReturnProfile({
							params: { shopId: shopShortId },
							body: {
								name: p.name,
								policyType: p.policy.type,
								returnWindowDays: p.windowDays ?? null,
								policyDescrRichText:
									p.policy.type === ReturnPolicyType.CUSTOM ? p.policy.text : null,
							},
						}),
					);
					setSaving(false);
					if (result.error !== null) {
						toastError('Failed to create return profile.');
						return;
					}
					const d = result.data;
					const profile: ReturnProfile = {
						id: String(d.id),
						name: d.name,
						windowDays: d.returnWindowDays ?? undefined,
						policy:
							d.policyType === ReturnPolicyType.CUSTOM
								? { type: ReturnPolicyType.CUSTOM, text: d.policyDescrRichText ?? '' }
								: d.policyType === ReturnPolicyType.NO_RETURNS
									? { type: ReturnPolicyType.NO_RETURNS }
									: { type: ReturnPolicyType.STANDARD },
					};
					onAddProfile(profile);
					onChange(profile.id);
					setDialogOpen(false);
				}}
			/>
		</>
	);
};
