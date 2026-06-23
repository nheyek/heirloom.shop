import {
	Box,
	Button,
	CloseButton,
	Dialog,
	HStack,
	RadioCard,
	Stack,
} from '@chakra-ui/react';
import {
	DayRangeInput,
	validateDayRange,
} from '@client/components/input/DayRangeInput';
import {
	FormField,
	FormInput,
} from '@client/components/input/FormField';
import { PriceInput } from '@client/components/input/PriceInput';
import { InputSize } from '@client/constants';
import { useEffect, useState } from 'react';

export enum ShippingCostType {
	Free = 'free',
	FlatRate = 'flat_rate',
}

export type NewShippingProfile = {
	name: string;
	originZip: string;
	cost:
		| { type: ShippingCostType.Free }
		| { type: ShippingCostType.FlatRate; cents: number };
	minDays: number;
	maxDays: number;
};

type Props = {
	open: boolean;
	onClose: () => void;
	onConfirm: (profile: NewShippingProfile) => void;
};

export const ShippingProfileDialog = ({
	open,
	onClose,
	onConfirm,
}: Props) => {
	const [name, setName] = useState('');
	const [nameError, setNameError] = useState<string | null>(null);
	const [originZip, setOriginZip] = useState('');
	const [zipError, setZipError] = useState<string | null>(null);
	const [costType, setCostType] = useState(ShippingCostType.Free);
	const [flatRateCents, setFlatRateCents] = useState<number | null>(
		null,
	);
	const [minDays, setMinDays] = useState('');
	const [maxDays, setMaxDays] = useState('');
	const [daysError, setDaysError] = useState<string | null>(null);

	useEffect(() => {
		if (!open) {
			setName('');
			setNameError(null);
			setOriginZip('');
			setZipError(null);
			setCostType(ShippingCostType.Free);
			setFlatRateCents(null);
			setMinDays('');
			setMaxDays('');
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
		const trimmedZip = originZip.trim();
		if (!trimmedZip) {
			setZipError('Origin zip code is required.');
			valid = false;
		} else {
			setZipError(null);
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
		const cost =
			costType === ShippingCostType.Free
				? ({ type: ShippingCostType.Free } as const)
				: ({
						type: ShippingCostType.FlatRate,
						cents: flatRateCents ?? 0,
					} as const);
		onConfirm({
			name: trimmedName,
			originZip: trimmedZip,
			cost,
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
							New Shipping Profile
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
									placeholder="e.g. Standard Domestic"
								/>
							</FormField>
							<FormField
								label="Origin zip code"
								error={zipError}
							>
								<FormInput
									w={32}
									value={originZip}
									onChange={(e) => {
										const digits = e.target.value
											.replace(/\D/g, '')
											.slice(0, 5);
										setOriginZip(digits);
										if (digits) setZipError(null);
									}}
									placeholder="e.g. 90210"
									inputMode="numeric"
								/>
							</FormField>
							<FormField label="Cost">
								<RadioCard.Root
									value={costType}
									onValueChange={(e) =>
										setCostType(
											e.value as ShippingCostType,
										)
									}
									size="sm"
								>
									<HStack
										gap={3}
										align="start"
									>
										<RadioCard.Item
											value={
												ShippingCostType.Free
											}
											width={100}
										>
											<RadioCard.ItemHiddenInput />
											<RadioCard.ItemControl alignItems="center">
												<RadioCard.ItemText
													fontSize={16}
												>
													Free
												</RadioCard.ItemText>
												<RadioCard.ItemIndicator />
											</RadioCard.ItemControl>
										</RadioCard.Item>
										<RadioCard.Item
											value={
												ShippingCostType.FlatRate
											}
											width={175}
										>
											<RadioCard.ItemHiddenInput />
											<RadioCard.ItemControl>
												<Stack
													width="100%"
													gap={3}
												>
													<HStack
														alignItems="center"
														justifyContent="space-between"
													>
														<RadioCard.ItemText
															fontSize={
																16
															}
														>
															Flat rate
														</RadioCard.ItemText>
														<RadioCard.ItemIndicator />
													</HStack>
													{costType ===
														ShippingCostType.FlatRate && (
														<Box
															onPointerDown={(e) => e.stopPropagation()}
															onClick={(e) => e.stopPropagation()}
														>
															<PriceInput
																size={InputSize.Md}
																value={flatRateCents}
																onChange={setFlatRateCents}
															/>
														</Box>
													)}
												</Stack>
											</RadioCard.ItemControl>
										</RadioCard.Item>
									</HStack>
								</RadioCard.Root>
							</FormField>
							<FormField
								label="Delivery"
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
