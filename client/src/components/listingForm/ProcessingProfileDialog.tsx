import { Stack } from '@chakra-ui/react';
import {
	FormField,
	FormInput,
} from '@client/components/input/FormField';
import {
	DayRangeInput,
	validateDayRange,
} from '@client/components/listingForm/DayRangeInput';
import { AppDialog } from '@client/components/misc/AppDialog';
import { DialogConfirmFooter } from '@client/components/misc/DialogConfirmFooter';
import { validateProcessingProfileInput } from '@heirloom/common/validation/profiles';
import {
	ValidationField,
	ValidationFieldKey,
} from '@heirloom/common/validation/shared';
import { useEffect, useState } from 'react';

export type NewProcessingProfile = {
	name: string;
	minDays: number;
	maxDays: number;
};

type Props = {
	open: boolean;
	onClose: () => void;
	onConfirm: (profile: NewProcessingProfile) => Promise<void>;
	existingNames?: string[];
	saving?: boolean;
};

export const ProcessingProfileDialog = ({
	open,
	onClose,
	onConfirm,
	existingNames = [],
	saving = false,
}: Props) => {
	const [name, setName] = useState('');
	const [nameError, setNameError] = useState<string | null>(null);
	const [minDays, setMinDays] = useState('');
	const [maxDays, setMaxDays] = useState('');
	const [daysError, setDaysError] = useState<string | null>(null);

	useEffect(() => {
		if (!open) {
			setName('');
			setMinDays('');
			setMaxDays('');
			setNameError(null);
			setDaysError(null);
		}
	}, [open]);

	const isDirty = () => !!name || !!minDays || !!maxDays;

	const handleClose = () => {
		if (isDirty()) {
			if (!window.confirm('Discard changes?')) return;
		}
		onClose();
	};

	const handleConfirm = () => {
		const errors = validateProcessingProfileInput({
			name,
			existingNames,
			minDays,
			maxDays,
		});
		const findError = (field: ValidationFieldKey) =>
			errors.find((e) => e.field === field)?.message ?? null;

		setNameError(findError(ValidationField.Name));
		setDaysError(findError(ValidationField.Days));

		if (errors.length > 0) return;

		const days = validateDayRange(minDays, maxDays)!;
		void onConfirm({
			name: name.trim(),
			minDays: days.min,
			maxDays: days.max,
		});
	};

	return (
		<AppDialog
			title="New Processing Profile"
			open={open}
			onCancel={handleClose}
			pending={saving}
			size="xs"
			footer={
				<DialogConfirmFooter
					onCancel={handleClose}
					onConfirm={handleConfirm}
					confirmLabel="Create"
					pending={saving}
				/>
			}
		>
			<Stack gap={4}>
				<FormField
					label="Name"
					error={nameError}
					required
				>
					<FormInput
						value={name}
						onChange={(e) => {
							setName(e.target.value);
							if (e.target.value.trim())
								setNameError(null);
						}}
						placeholder="e.g. Default"
						disabled={saving}
					/>
				</FormField>
				<FormField
					label="Lead Time"
					error={daysError}
					required
				>
					<DayRangeInput
						minDays={minDays}
						maxDays={maxDays}
						onChangeMin={(v) => {
							setMinDays(v);
							setDaysError(null);
						}}
						onChangeMax={(v) => {
							setMaxDays(v);
							setDaysError(null);
						}}
						disabled={saving}
					/>
				</FormField>
			</Stack>
		</AppDialog>
	);
};
