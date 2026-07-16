import {
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
import { AppDialog } from '@client/components/misc/AppDialog';
import { DialogConfirmFooter } from '@client/components/misc/DialogConfirmFooter';
import { RichTextDisplay } from '@client/components/richText/RichTextDisplay';
import { RichTextEditor } from '@client/components/richText/RichTextEditor';
import { STANDARD_RETURN_POLICY_HTML } from '@client/constants';
import { sansFontFamily } from '@client/theme';
import { ReturnPolicyType } from '@heirloom/common/constants';
import { validateReturnProfileInput } from '@heirloom/common/validation/profiles';
import {
	ValidationField,
	ValidationFieldKey,
} from '@heirloom/common/validation/shared';
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
		const errors = validateReturnProfileInput({
			name,
			existingNames,
			policyType,
			returnWindowDays: windowDays || null,
			policyDescrRichText: customHtmlRef.current,
		});
		const findError = (field: ValidationFieldKey) =>
			errors.find((e) => e.field === field)?.message ?? null;

		setNameError(findError(ValidationField.Name));
		setWindowError(findError(ValidationField.WindowDays));
		setCustomTextError(findError(ValidationField.CustomText));

		if (errors.length > 0) return;

		const trimmedName = name.trim();
		const days =
			policyType !== ReturnPolicyType.NO_RETURNS
				? parseInt(windowDays, 10)
				: undefined;
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
		<AppDialog
			title="New Return Profile"
			open={open}
			onCancel={handleClose}
			pending={saving}
			size="md"
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
									value={ReturnPolicyType.STANDARD}
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
									value={ReturnPolicyType.CUSTOM}
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
				{policyType !== ReturnPolicyType.NO_RETURNS && (
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
								fontFamily={sansFontFamily}
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
							<Text fontSize={18}>Days</Text>
						</HStack>
					</FormField>
				)}

				{policyType === ReturnPolicyType.STANDARD && (
					<RichTextDisplay
						htmlString={STANDARD_RETURN_POLICY_HTML}
						fontSize={18}
					/>
				)}

				{policyType === ReturnPolicyType.CUSTOM && (
					<FormField
						label="Details"
						required
					>
						<RichTextEditor
							onChange={(html) => {
								customHtmlRef.current = html;
								if (
									html
										.replace(/<[^>]*>/g, '')
										.trim()
								)
									setCustomTextError(null);
							}}
							invalid={!!customTextError}
							error={customTextError}
							maxHeight={150}
							disabled={saving}
						/>
					</FormField>
				)}
			</Stack>
		</AppDialog>
	);
};
