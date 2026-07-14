import { Stack } from '@chakra-ui/react';
import {
	FormField,
	FormInput,
} from '@client/components/input/FormField';
import { PriceInput } from '@client/components/input/PriceInput';
import { AppDialog } from '@client/components/util/AppDialog';
import { DialogConfirmFooter } from '@client/components/util/DialogConfirmFooter';
import { LISTING_LIMITS } from '@heirloom/common/constants';
import { useEffect, useState } from 'react';

export type NewPersonalizationProfile = {
	name: string;
	costCents: number;
	helperText: string | null;
};

type Props = {
	open: boolean;
	onClose: () => void;
	onConfirm: (profile: NewPersonalizationProfile) => Promise<void>;
	existingNames?: string[];
	saving?: boolean;
};

export const PersonalizationProfileDialog = ({
	open,
	onClose,
	onConfirm,
	existingNames = [],
	saving = false,
}: Props) => {
	const [name, setName] = useState('');
	const [nameError, setNameError] = useState<string | null>(null);
	const [costCents, setCostCents] = useState<number | null>(null);
	const [costError, setCostError] = useState<string | null>(null);
	const [helperText, setHelperText] = useState('');
	const [helperTextError, setHelperTextError] = useState<
		string | null
	>(null);

	useEffect(() => {
		if (!open) {
			setName('');
			setNameError(null);
			setCostCents(null);
			setCostError(null);
			setHelperText('');
			setHelperTextError(null);
		}
	}, [open]);

	const isDirty = () => !!name || costCents !== null || !!helperText;

	const handleClose = () => {
		if (isDirty()) {
			if (!window.confirm('Discard changes?')) return;
		}
		onClose();
	};

	const handleConfirm = () => {
		let valid = true;
		const trimmedName = name.trim();
		if (!trimmedName) {
			setNameError('Name is required.');
			valid = false;
		} else if (
			trimmedName.length > LISTING_LIMITS.maxProfileNameLength
		) {
			setNameError(
				`Name must be ${LISTING_LIMITS.maxProfileNameLength} characters or fewer.`,
			);
			valid = false;
		} else if (
			existingNames.some(
				(n) => n.toLowerCase() === trimmedName.toLowerCase(),
			)
		) {
			setNameError('A profile with this name already exists.');
			valid = false;
		} else {
			setNameError(null);
		}
		if (costCents === null || costCents <= 0) {
			setCostError('Cost is required.');
			valid = false;
		} else {
			setCostError(null);
		}
		const trimmedHelperText = helperText.trim();
		if (
			trimmedHelperText.length >
			LISTING_LIMITS.maxPersonalizationHelperTextLength
		) {
			setHelperTextError(
				`Helper text must be ${LISTING_LIMITS.maxPersonalizationHelperTextLength} characters or fewer.`,
			);
			valid = false;
		} else {
			setHelperTextError(null);
		}
		if (!valid) return;
		void onConfirm({
			name: trimmedName,
			costCents: costCents!,
			helperText: trimmedHelperText || null,
		});
	};

	return (
		<AppDialog
			title="New Personalization Profile"
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
						placeholder="e.g. Engraving"
						disabled={saving}
					/>
				</FormField>
				<FormField
					label="Cost"
					error={costError}
					required
				>
					<PriceInput
						value={costCents}
						onChange={(v) => {
							setCostCents(v);
							if (v && v > 0) setCostError(null);
						}}
						invalid={!!costError}
						disabled={saving}
					/>
				</FormField>
				<FormField
					label="Helper text"
					error={helperTextError}
				>
					<FormInput
						value={helperText}
						onChange={(e) => {
							setHelperText(e.target.value);
							if (
								e.target.value.trim().length <=
								LISTING_LIMITS.maxPersonalizationHelperTextLength
							)
								setHelperTextError(null);
						}}
						placeholder="e.g. Add up to 20 characters."
						disabled={saving}
					/>
				</FormField>
			</Stack>
		</AppDialog>
	);
};
