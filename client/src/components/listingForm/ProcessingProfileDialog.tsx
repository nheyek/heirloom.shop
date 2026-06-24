import {
	Button,
	CloseButton,
	Dialog,
	HStack,
	Stack,
} from '@chakra-ui/react';
import {
	FormField,
	FormInput,
} from '@client/components/input/FormField';
import {
	DayRangeInput,
	validateDayRange,
} from '@client/components/listingForm/DayRangeInput';
import { LISTING_LIMITS } from '@heirloom/common/constants';
import { useEffect, useState } from 'react';

export type NewProcessingProfile = {
	name: string;
	minDays: number;
	maxDays: number;
};

type Props = {
	open: boolean;
	onClose: () => void;
	onConfirm: (profile: NewProcessingProfile) => void;
	existingNames?: string[];
};

export const ProcessingProfileDialog = ({
	open,
	onClose,
	onConfirm,
	existingNames = [],
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
		const days = validateDayRange(minDays, maxDays);
		if (!days) {
			setDaysError(
				'Enter a valid range (min ≤ max, both ≥ 1).',
			);
			valid = false;
		} else {
			setDaysError(null);
		}
		if (!valid) return;
		onConfirm({
			name: trimmedName,
			minDays: days!.min,
			maxDays: days!.max,
		});
		onClose();
	};

	return (
		<Dialog.Root
			open={open}
			onInteractOutside={onClose}
			onEscapeKeyDown={onClose}
			size="xs"
		>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title
							fontSize={22}
							fontWeight={500}
						>
							New Processing Profile
						</Dialog.Title>
						<CloseButton
							position="absolute"
							top={3}
							right={3}
							onClick={onClose}
						/>
					</Dialog.Header>
					<Dialog.Body
						pt={0}
						pb={3}
					>
						<Stack gap={4}>
							<FormField
								label="Name"
								error={nameError}
							>
								<FormInput
									value={name}
									onChange={(e) => {
										setName(e.target.value);
										if (e.target.value.trim())
											setNameError(null);
									}}
									placeholder="e.g. Default"
								/>
							</FormField>
							<FormField
								label="Lead Time"
								error={daysError}
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
								/>
							</FormField>
						</Stack>
					</Dialog.Body>
					<Dialog.Footer>
						<HStack gap={2}>
							<Button
								size="md"
								fontSize={18}
								variant="outline"
								onClick={onClose}
							>
								Cancel
							</Button>
							<Button
								size="md"
								fontSize={18}
								onClick={handleConfirm}
							>
								Create
							</Button>
						</HStack>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
};
