import {
	Button,
	Checkbox,
	CloseButton,
	Dialog,
	HStack,
	Stack,
} from '@chakra-ui/react';
import {
	FormField,
	FormInput,
} from '@client/components/input/FormField';
import { AddFieldButton } from '@client/components/listing/AddFieldButton';
import { useEffect, useState } from 'react';

type Props = {
	open: boolean;
	onClose: () => void;
};

export const VariationDialog = ({ open, onClose }: Props) => {
	const [name, setName] = useState('');
	const [pricesVary, setPricesVary] = useState(false);
	const [leadTimesVary, setLeadTimesVary] = useState(false);
	const [nameError, setNameError] = useState<string | null>(null);

	useEffect(() => {
		if (!open) {
			setName('');
			setPricesVary(false);
			setLeadTimesVary(false);
			setNameError(null);
		}
	}, [open]);

	return (
		<Dialog.Root
			open={open}
			onInteractOutside={(e) => {
				e.preventDefault();
				onClose();
			}}
			onEscapeKeyDown={(e) => {
				e.preventDefault();
				onClose();
			}}
			size="md"
		>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title
							fontSize={24}
							fontWeight={500}
						>
							Add Variation
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
						<Stack gap={5}>
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
									placeholder="e.g. Size"
								/>
							</FormField>
							<Checkbox.Root
								checked={pricesVary}
								onCheckedChange={(e) =>
									setPricesVary(!!e.checked)
								}
							>
								<Checkbox.HiddenInput />
								<Checkbox.Control />
								<Checkbox.Label fontSize={18}>
									Prices vary
								</Checkbox.Label>
							</Checkbox.Root>
							<Checkbox.Root
								checked={leadTimesVary}
								onCheckedChange={(e) =>
									setLeadTimesVary(!!e.checked)
								}
							>
								<Checkbox.HiddenInput />
								<Checkbox.Control />
								<Checkbox.Label fontSize={18}>
									Lead times vary
								</Checkbox.Label>
							</Checkbox.Root>
							<HStack>
								<AddFieldButton onClick={() => {}}>
									Add Options
								</AddFieldButton>
							</HStack>
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
								onClick={() => {}}
							>
								Add
							</Button>
						</HStack>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
};
