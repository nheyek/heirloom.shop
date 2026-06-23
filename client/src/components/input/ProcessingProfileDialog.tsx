import {
	Button,
	CloseButton,
	Dialog,
	HStack,
	Input,
	Stack,
	Text,
} from '@chakra-ui/react';
import {
	FormField,
	FormInput,
} from '@client/components/input/FormField';
import { FONT_DEFAULT } from '@client/theme';
import { useEffect, useState } from 'react';
import { FaMinus } from 'react-icons/fa6';

type DayInputProps = {
	value: string;
	onChange: (value: string) => void;
};

const DayInput = ({ value, onChange }: DayInputProps) => (
	<Input
		size="lg"
		w={16}
		fontSize={16}
		fontFamily={FONT_DEFAULT}
		value={value}
		onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))}
	/>
);

export type NewProcessingProfile = {
	name: string;
	minDays: number;
	maxDays: number;
};

type Props = {
	open: boolean;
	onClose: () => void;
	onConfirm: (profile: NewProcessingProfile) => void;
};

export const ProcessingProfileDialog = ({
	open,
	onClose,
	onConfirm,
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
		} else {
			setNameError(null);
		}
		const min = parseInt(minDays, 10);
		const max = parseInt(maxDays, 10);
		if (
			!minDays ||
			!maxDays ||
			isNaN(min) ||
			isNaN(max) ||
			min < 1 ||
			max < min
		) {
			setDaysError(
				'Enter a valid range (min ≤ max, both ≥ 1).',
			);
			valid = false;
		} else {
			setDaysError(null);
		}
		if (!valid) return;
		onConfirm({ name: trimmedName, minDays: min, maxDays: max });
		onClose();
	};

	return (
		<Dialog.Root
			open={open}
			onInteractOutside={onClose}
			onEscapeKeyDown={onClose}
			size="sm"
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
								<HStack
									gap={3}
									align="center"
								>
									<DayInput
										value={minDays}
										onChange={(v) => { setMinDays(v); setDaysError(null); }}
									/>
									<FaMinus />
									<DayInput
										value={maxDays}
										onChange={(v) => { setMaxDays(v); setDaysError(null); }}
									/>
									<Text fontSize={18}>Days</Text>
								</HStack>
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
