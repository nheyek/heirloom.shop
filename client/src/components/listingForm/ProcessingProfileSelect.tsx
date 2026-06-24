import { ProcessingProfileDialog } from '@client/components/listingForm/ProcessingProfileDialog';
import { ProfileSelect } from '@client/components/listingForm/ProfileSelect';
import { InputSize } from '@client/constants';
import { ProcessingProfile } from '@client/hooks/useListingForm';
import { useState } from 'react';

type Props = {
	profiles: ProcessingProfile[];
	onAddProfile: (profile: ProcessingProfile) => void;
	value: string | null;
	onChange: (v: string | null) => void;
	disabled?: boolean;
	size?: InputSize;
};

export const ProcessingProfileSelect = ({
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
			<ProcessingProfileDialog
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
