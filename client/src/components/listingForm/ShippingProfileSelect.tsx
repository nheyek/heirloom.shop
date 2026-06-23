import { ProfileSelect } from '@client/components/listingForm/ProfileSelect';
import { ShippingProfileDialog } from '@client/components/listingForm/ShippingProfileDialog';
import { InputSize } from '@client/constants';
import { ShippingProfile } from '@client/hooks/useListingForm';
import { useState } from 'react';

type Props = {
	profiles: ShippingProfile[];
	onAddProfile: (profile: ShippingProfile) => void;
	value: string | null;
	onChange: (v: string | null) => void;
	disabled?: boolean;
	size?: InputSize;
};

export const ShippingProfileSelect = ({
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
			<ShippingProfileDialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				onConfirm={(p) => {
					const profile = { id: crypto.randomUUID(), ...p };
					onAddProfile(profile);
					onChange(profile.id);
				}}
			/>
		</>
	);
};
