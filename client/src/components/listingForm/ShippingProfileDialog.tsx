import { Box, HStack, RadioCard, Stack } from '@chakra-ui/react';
import { FieldError } from '@client/components/input/FieldError';
import {
	FormField,
	FormInput,
} from '@client/components/input/FormField';
import { PriceInput } from '@client/components/input/PriceInput';
import {
	DayRangeInput,
	validateDayRange,
} from '@client/components/listingForm/DayRangeInput';
import { AppDialog } from '@client/components/misc/AppDialog';
import { DialogConfirmFooter } from '@client/components/misc/DialogConfirmFooter';
import { InputSize } from '@client/constants';
import { LISTING_LIMITS } from '@heirloom/common/constants';
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
	onConfirm: (profile: NewShippingProfile) => Promise<void>;
	existingNames?: string[];
	saving?: boolean;
};

export const ShippingProfileDialog = ({
	open,
	onClose,
	onConfirm,
	existingNames = [],
	saving = false,
}: Props) => {
	const [name, setName] = useState('');
	const [nameError, setNameError] = useState<string | null>(null);
	const [originZip, setOriginZip] = useState('');
	const [zipError, setZipError] = useState<string | null>(null);
	const [costType, setCostType] = useState(ShippingCostType.Free);
	const [flatRateCents, setFlatRateCents] = useState<number | null>(
		null,
	);
	const [flatRateError, setFlatRateError] = useState<string | null>(
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
			setFlatRateError(null);
			setMinDays('');
			setMaxDays('');
			setDaysError(null);
		}
	}, [open]);

	const isDirty = () =>
		!!name ||
		!!originZip ||
		costType !== ShippingCostType.Free ||
		flatRateCents !== null ||
		!!minDays ||
		!!maxDays;

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
		const trimmedZip = originZip.trim();
		if (!trimmedZip) {
			setZipError('Origin zip code is required.');
			valid = false;
		} else {
			setZipError(null);
		}
		if (
			costType === ShippingCostType.FlatRate &&
			(flatRateCents === null || flatRateCents <= 0)
		) {
			setFlatRateError('Price is required.');
			valid = false;
		} else {
			setFlatRateError(null);
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
		void onConfirm({
			name: trimmedName,
			originZip: trimmedZip,
			cost,
			minDays: days!.min,
			maxDays: days!.max,
		});
	};

	return (
		<AppDialog
			title="New Shipping Profile"
			open={open}
			onCancel={handleClose}
			pending={saving}
			size="sm"
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
						placeholder="e.g. Standard Domestic"
						disabled={saving}
					/>
				</FormField>
				<FormField
					label="Origin zip code"
					error={zipError}
					required
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
						disabled={saving}
					/>
				</FormField>
				<FormField label="Cost">
					<RadioCard.Root
						value={costType}
						onValueChange={(e) =>
							setCostType(e.value as ShippingCostType)
						}
						size="sm"
						alignSelf="stretch"
						disabled={saving}
					>
						<HStack
							gap={3}
							align="start"
						>
							<RadioCard.Item
								value={ShippingCostType.Free}
							>
								<RadioCard.ItemHiddenInput />
								<RadioCard.ItemControl alignItems="center">
									<RadioCard.ItemText fontSize={16}>
										Free
									</RadioCard.ItemText>
									<RadioCard.ItemIndicator />
								</RadioCard.ItemControl>
							</RadioCard.Item>
							<RadioCard.Item
								value={ShippingCostType.FlatRate}
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
												fontSize={16}
											>
												Flat rate
											</RadioCard.ItemText>
											<RadioCard.ItemIndicator />
										</HStack>
										{costType ===
											ShippingCostType.FlatRate && (
											<Box
												onPointerDown={(e) =>
													e.stopPropagation()
												}
												onClick={(e) =>
													e.stopPropagation()
												}
											>
												<PriceInput
													size={
														InputSize.Md
													}
													value={
														flatRateCents
													}
													onChange={(v) => {
														setFlatRateCents(
															v,
														);
														if (
															v &&
															v > 0
														)
															setFlatRateError(
																null,
															);
													}}
													invalid={
														!!flatRateError
													}
													enclosed
												/>
												{flatRateError && (
													<FieldError>
														{
															flatRateError
														}
													</FieldError>
												)}
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
