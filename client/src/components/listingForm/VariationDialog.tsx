import { Checkbox, HStack, Stack } from '@chakra-ui/react';
import { FieldError } from '@client/components/input/FieldError';
import {
	FormField,
	FormInput,
} from '@client/components/input/FormField';
import { AddFieldButton } from '@client/components/listingForm/AddFieldButton';
import { Variation } from '@client/components/listingForm/useListingForm';
import { VariationOptionRow } from '@client/components/listingForm/VariationOptionRow';
import { AppDialog } from '@client/components/misc/AppDialog';
import { DialogConfirmFooter } from '@client/components/misc/DialogConfirmFooter';
import {
	OptionDraft,
	optionsSnapshot,
	useVariationOptions,
} from '@client/hooks/useVariationOptions';
import { fieldErrorColor } from '@client/theme';
import {
	DndContext,
	DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { LISTING_LIMITS } from '@heirloom/common/constants';
import {
	findInvalidVariationOptionIndices,
	validateVariationEntry,
} from '@heirloom/common/validation/listing';
import { ValidationField } from '@heirloom/common/validation/shared';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
	open: boolean;
	initial?: Variation | null;
	existingNames?: string[];
	onClose: () => void;
	onConfirm: (variation: Variation) => void;
	uploadImage: (file: File) => Promise<string | null>;
	shopShortId: string;
};

const snapshot = (
	name: string,
	pricesVary: boolean,
	imagesVary: boolean,
	options: OptionDraft[],
) =>
	JSON.stringify({
		name,
		pricesVary,
		imagesVary,
		options: optionsSnapshot(options),
	});

export const VariationDialog = ({
	open,
	initial,
	existingNames = [],
	onClose,
	onConfirm,
	uploadImage,
	shopShortId,
}: Props) => {
	const [name, setName] = useState('');
	const [pricesVary, setPricesVary] = useState(false);
	const [imagesVary, setImagesVary] = useState(false);
	const [nameError, setNameError] = useState<string | null>(null);
	const optionsState = useVariationOptions(
		uploadImage,
		shopShortId,
	);
	const { options } = optionsState;
	const inputRefs = useRef<
		React.RefObject<HTMLInputElement | null>[]
	>([]);
	const pendingFocusIndex = useRef<number | null>(null);
	const [optionsError, setOptionsError] = useState<string | null>(
		null,
	);
	const [invalidOptionIds, setInvalidOptionIds] = useState<
		Set<string>
	>(new Set());
	const initialSnapshotRef = useRef('');

	const isDirty = () =>
		snapshot(name, pricesVary, imagesVary, options) !==
		initialSnapshotRef.current;

	const handleClose = () => {
		if (isDirty()) {
			if (!window.confirm('Discard changes?')) return;
		}
		onClose();
	};

	useEffect(() => {
		if (open) {
			const loaded = optionsState.load(
				initial?.options ?? null,
			);
			setName(initial?.name ?? '');
			setPricesVary(initial?.pricesVary ?? false);
			setImagesVary(initial?.imagesVary ?? false);
			initialSnapshotRef.current = snapshot(
				initial?.name ?? '',
				initial?.pricesVary ?? false,
				initial?.imagesVary ?? false,
				loaded,
			);
		}
		setNameError(null);
		setOptionsError(null);
		setInvalidOptionIds(new Set());
	}, [open]);

	useEffect(() => {
		if (pendingFocusIndex.current !== null) {
			inputRefs.current[
				pendingFocusIndex.current
			]?.current?.focus();
			pendingFocusIndex.current = null;
		}
	});

	const addOption = () => {
		if (options.length >= LISTING_LIMITS.maxOptionsPerVariation)
			return;
		pendingFocusIndex.current = options.length;
		optionsState.add();
		setOptionsError(null);
	};

	const handleTabOnOption = (index: number) => {
		if (index < options.length - 1) {
			inputRefs.current[index + 1]?.current?.focus();
		} else if (
			options.length < LISTING_LIMITS.maxOptionsPerVariation
		) {
			addOption();
		}
	};

	const updateOption = (
		id: string,
		patch: Partial<Pick<OptionDraft, 'name' | 'priceCents'>>,
	) => {
		optionsState.update(id, patch);
		if (patch.name !== undefined) {
			setOptionsError(null);
			setInvalidOptionIds(new Set());
		}
	};

	const handleConfirm = () => {
		const optionInputs = options.map((o) => ({
			name: o.name,
			priceCents: o.priceCents,
		}));
		const errors = validateVariationEntry(
			{ name, options: optionInputs },
			existingNames,
		);
		const nameErrorMessage =
			errors.find(
				(e) => e.field === ValidationField.VariationName,
			)?.message ?? null;
		const optionsErrorMessage =
			errors.find(
				(e) => e.field === ValidationField.VariationOptions,
			)?.message ?? null;

		setNameError(nameErrorMessage);
		setOptionsError(optionsErrorMessage);
		setInvalidOptionIds(
			new Set(
				findInvalidVariationOptionIndices(optionInputs).map(
					(i) => options[i].id,
				),
			),
		);

		if (errors.length > 0) return;

		onConfirm({
			name: name.trim(),
			pricesVary,
			imagesVary,
			options: optionsState.toVariationOptions(),
			order: initial?.order ?? 0,
		});
		onClose();
	};

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const handleDragEnd = ({ active, over }: DragEndEvent) => {
		if (!over || active.id === over.id) return;
		optionsState.move(active.id as string, over.id as string);
	};

	const dividerColor = (index: number) =>
		index === 0
			? undefined
			: invalidOptionIds.has(options[index].id) ||
				  invalidOptionIds.has(options[index - 1].id)
				? fieldErrorColor
				: 'gray.200';

	return (
		<AppDialog
			title={initial ? 'Edit Variation' : 'Add Variation'}
			open={open}
			onCancel={handleClose}
			size="xs"
			contentProps={{
				maxW:
					pricesVary && imagesVary
						? 640
						: pricesVary || imagesVary
							? 520
							: undefined,
			}}
			footer={
				<DialogConfirmFooter
					onCancel={handleClose}
					onConfirm={handleConfirm}
					confirmLabel={initial ? 'Save' : 'Add'}
					confirmDisabled={optionsState.isUploading}
				/>
			}
		>
			<Stack gap={5}>
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
						placeholder="e.g. Size"
					/>
				</FormField>
				<HStack gap={6}>
					<Checkbox.Root
						checked={pricesVary}
						onCheckedChange={(e) =>
							setPricesVary(!!e.checked)
						}
						size="lg"
					>
						<Checkbox.HiddenInput />
						<Checkbox.Control />
						<Checkbox.Label fontSize={18}>
							Prices vary
						</Checkbox.Label>
					</Checkbox.Root>
					<Checkbox.Root
						checked={imagesVary}
						onCheckedChange={(e) =>
							setImagesVary(!!e.checked)
						}
						size="lg"
					>
						<Checkbox.HiddenInput />
						<Checkbox.Control />
						<Checkbox.Label fontSize={18}>
							Images vary
						</Checkbox.Label>
					</Checkbox.Root>
				</HStack>

				<FormField
					label="Options"
					required
				>
					<Stack w="100%">
						<DndContext
							sensors={sensors}
							collisionDetection={closestCenter}
							onDragEnd={handleDragEnd}
						>
							<SortableContext
								items={options.map((o) => o.id)}
								strategy={verticalListSortingStrategy}
							>
								<Stack
									gap={0}
									borderWidth={1}
									borderColor={
										optionsError
											? fieldErrorColor
											: 'gray.200'
									}
									borderRadius="md"
									overflow="hidden"
								>
									{options.map((option, i) => {
										if (!inputRefs.current[i]) {
											inputRefs.current[i] = {
												current: null,
											};
										}
										return (
											<VariationOptionRow
												key={option.id}
												option={option}
												imageList={optionsState.imageList(
													option.id,
												)}
												invalid={invalidOptionIds.has(
													option.id,
												)}
												dividerColor={dividerColor(
													i,
												)}
												deletable={
													options.length >
													optionsState.minOptions
												}
												showPrice={pricesVary}
												showImage={imagesVary}
												inputRef={
													inputRefs.current[
														i
													]
												}
												onChange={(patch) =>
													updateOption(
														option.id,
														patch,
													)
												}
												onDelete={() =>
													optionsState.remove(
														option.id,
													)
												}
												onTabKey={() =>
													handleTabOnOption(
														i,
													)
												}
											/>
										);
									})}
								</Stack>
							</SortableContext>
						</DndContext>
						{optionsError && (
							<FieldError>{optionsError}</FieldError>
						)}
						{options.length <
							LISTING_LIMITS.maxOptionsPerVariation && (
							<AddFieldButton onClick={addOption}>
								Add Option
							</AddFieldButton>
						)}
					</Stack>
				</FormField>
			</Stack>
		</AppDialog>
	);
};
