import {
	Button,
	CloseButton,
	Dialog,
	HStack,
	Input,
	RadioCard,
	Stack,
	Text,
} from '@chakra-ui/react';
import {
	FormField,
	FormInput,
} from '@client/components/input/FormField';
import { RichTextDisplay } from '@client/components/richText/RichTextDisplay';
import { RichTextEditor } from '@client/components/richText/RichTextEditor';
import { STANDARD_RETURN_POLICY_HTML } from '@client/constants';
import { FONT_GEOMETRIC } from '@client/theme';
import {
	LISTING_LIMITS,
	ReturnPolicyType,
} from '@heirloom/common/constants';
import { useEffect, useRef, useState } from 'react';

export type NewReturnProfile = {
	name: string;
	windowDays?: number;
	policy:
		| { type: ReturnPolicyType.STANDARD }
		| { type: ReturnPolicyType.CUSTOM; text: string }
		| { type: ReturnPolicyType.NO_RETURNS };
};

type Props = {
	open: boolean;
	onClose: () => void;
	onConfirm: (profile: NewReturnProfile) => Promise<void>;
	existingNames?: string[];
	saving?: boolean;
};

export const ReturnProfileDialog = ({
	open,
	onClose,
	onConfirm,
	existingNames = [],
	saving = false,
}: Props) => {
	const [name, setName] = useState('');
	const [nameError, setNameError] = useState<string | null>(null);
	const [windowDays, setWindowDays] = useState('');
	const [windowError, setWindowError] = useState<string | null>(
		null,
	);
	const [policyType, setPolicyType] = useState(
		ReturnPolicyType.STANDARD,
	);
	const customHtmlRef = useRef('');
	const [customTextError, setCustomTextError] = useState<
		string | null
	>(null);

	useEffect(() => {
		if (!open) {
			setName('');
			setNameError(null);
			setWindowDays('');
			setWindowError(null);
			setPolicyType(ReturnPolicyType.STANDARD);
			customHtmlRef.current = '';
			setCustomTextError(null);
		}
	}, [open]);

	const isDirty = () =>
		!!name ||
		!!windowDays ||
		policyType !== ReturnPolicyType.STANDARD ||
		!!customHtmlRef.current;

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
		let days: number | undefined;
		if (policyType !== ReturnPolicyType.NO_RETURNS) {
			const parsed = parseInt(windowDays, 10);
			if (!windowDays || isNaN(parsed) || parsed < 1) {
				setWindowError('Window is required.');
				valid = false;
			} else {
				setWindowError(null);
				days = parsed;
			}
		} else {
			setWindowError(null);
		}
		const strippedHtml = customHtmlRef.current
			.replace(/<[^>]*>/g, '')
			.trim();
		if (policyType === ReturnPolicyType.CUSTOM && !strippedHtml) {
			setCustomTextError('Policy details are required.');
			valid = false;
		} else if (
			policyType === ReturnPolicyType.CUSTOM &&
			strippedHtml.length > LISTING_LIMITS.maxReturnPolicyChars
		) {
			setCustomTextError(
				`Policy must be ${LISTING_LIMITS.maxReturnPolicyChars.toLocaleString()} characters or fewer.`,
			);
			valid = false;
		} else {
			setCustomTextError(null);
		}
		if (!valid) return;
		const policy =
			policyType === ReturnPolicyType.NO_RETURNS
				? ({ type: ReturnPolicyType.NO_RETURNS } as const)
				: policyType === ReturnPolicyType.STANDARD
					? ({ type: ReturnPolicyType.STANDARD } as const)
					: ({
							type: ReturnPolicyType.CUSTOM,
							text: customHtmlRef.current,
						} as const);
		void onConfirm({
			name: trimmedName,
			windowDays: days,
			policy,
		});
	};

	return (
		<Dialog.Root
			open={open}
			onInteractOutside={handleClose}
			onEscapeKeyDown={handleClose}
			size="md"
		>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title
							fontSize={22}
							fontWeight={500}
						>
							New Return Profile
						</Dialog.Title>
						<CloseButton
							position="absolute"
							top={3}
							right={3}
							onClick={handleClose}
							disabled={saving}
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
								required
							>
								<FormInput
									value={name}
									onChange={(e) => {
										setName(e.target.value);
										if (e.target.value.trim())
											setNameError(null);
									}}
									placeholder="e.g. Standard Returns"
									disabled={saving}
								/>
							</FormField>
							<HStack
								align="start"
								gap={0}
							>
								<FormField label="Policy">
									<RadioCard.Root
										value={policyType}
										onValueChange={(e) =>
											setPolicyType(
												e.value as ReturnPolicyType,
											)
										}
										size="sm"
										alignSelf="stretch"
										disabled={saving}
									>
										<HStack gap={3}>
											<RadioCard.Item
												value={
													ReturnPolicyType.STANDARD
												}
											>
												<RadioCard.ItemHiddenInput />
												<RadioCard.ItemControl alignItems="center">
													<RadioCard.ItemText
														fontSize={16}
													>
														Standard
													</RadioCard.ItemText>
													<RadioCard.ItemIndicator />
												</RadioCard.ItemControl>
											</RadioCard.Item>
											<RadioCard.Item
												value={
													ReturnPolicyType.CUSTOM
												}
											>
												<RadioCard.ItemHiddenInput />
												<RadioCard.ItemControl alignItems="center">
													<RadioCard.ItemText
														fontSize={16}
													>
														Custom
													</RadioCard.ItemText>
													<RadioCard.ItemIndicator />
												</RadioCard.ItemControl>
											</RadioCard.Item>
											<RadioCard.Item
												value={
													ReturnPolicyType.NO_RETURNS
												}
											>
												<RadioCard.ItemHiddenInput />
												<RadioCard.ItemControl alignItems="center">
													<RadioCard.ItemText
														fontSize={16}
													>
														No returns
													</RadioCard.ItemText>
													<RadioCard.ItemIndicator />
												</RadioCard.ItemControl>
											</RadioCard.Item>
										</HStack>
									</RadioCard.Root>
								</FormField>
							</HStack>
							{policyType !==
								ReturnPolicyType.NO_RETURNS && (
								<FormField
									label="Window"
									error={windowError}
									width={200}
									required
								>
									<HStack
										gap={3}
										align="center"
									>
										<Input
											size="lg"
											w={16}
											fontSize={16}
											fontFamily={
												FONT_GEOMETRIC
											}
											value={windowDays}
											onChange={(e) => {
												setWindowDays(
													e.target.value.replace(
														/\D/g,
														'',
													),
												);
												setWindowError(null);
											}}
											inputMode="numeric"
											placeholder="30"
											disabled={saving}
										/>
										<Text fontSize={18}>
											Days
										</Text>
									</HStack>
								</FormField>
							)}

							{policyType ===
								ReturnPolicyType.STANDARD && (
								<RichTextDisplay
									htmlString={
										STANDARD_RETURN_POLICY_HTML
									}
									fontSize={18}
								/>
							)}

							{policyType ===
								ReturnPolicyType.CUSTOM && (
								<FormField
									label="Details"
									required
								>
									<RichTextEditor
										onChange={(html) => {
											customHtmlRef.current =
												html;
											if (
												html
													.replace(
														/<[^>]*>/g,
														'',
													)
													.trim()
											)
												setCustomTextError(
													null,
												);
										}}
										invalid={!!customTextError}
										error={customTextError}
										maxHeight={150}
										disabled={saving}
									/>
								</FormField>
							)}
						</Stack>
					</Dialog.Body>
					<Dialog.Footer>
						<HStack gap={2}>
							<Button
								size="md"
								fontSize={18}
								variant="subtle"
								onClick={handleClose}
								disabled={saving}
							>
								Cancel
							</Button>
							<Button
								size="md"
								fontSize={18}
								onClick={handleConfirm}
								disabled={saving}
								loading={saving}
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
