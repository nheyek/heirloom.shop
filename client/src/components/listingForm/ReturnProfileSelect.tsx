import { ProfileSelect } from '@client/components/listingForm/ProfileSelect';
import { ReturnProfileDialog } from '@client/components/listingForm/ReturnProfileDialog';
import { InputSize } from '@client/constants';
import { ReturnProfile } from '@client/hooks/useListingForm';
import { useState } from 'react';

type Props = {
	profiles: ReturnProfile[];
	onAddProfile: (profile: ReturnProfile) => void;
	value: string | null;
	onChange: (v: string | null) => void;
	disabled?: boolean;
	size?: InputSize;
};

export const ReturnProfileSelect = ({
	profiles,
	onAddProfile,
	value,
	onChange,
	disabled,
	size,
}: Props) => {
	const [dialogOpen, setDialogOpen] = useState(false);

	return (
		<>
			<ProfileSelect
				items={profiles.map((p) => ({
					value: p.id,
					label: p.name,
				}))}
				value={value}
				onChange={onChange}
				onClickAdd={() => setDialogOpen(true)}
				disabled={disabled}
				size={size}
			/>
			<ReturnProfileDialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				existingNames={profiles.map((p) => p.name)}
				onConfirm={(p) => {
					const profile = { id: crypto.randomUUID(), ...p };
					onAddProfile(profile);
					onChange(profile.id);
				}}
			/>
		</>
	);
};
