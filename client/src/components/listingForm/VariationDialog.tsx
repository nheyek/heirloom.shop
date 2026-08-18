import {
	Box,
	Checkbox,
	HStack,
	IconButton,
	Image,
	Input,
	Stack,
} from '@chakra-ui/react';
import { FieldError } from '@client/components/input/FieldError';
import {
	FormField,
	FormInput,
} from '@client/components/input/FormField';
import { PriceInput } from '@client/components/input/PriceInput';
import { AddFieldButton } from '@client/components/listingForm/AddFieldButton';
import { Variation } from '@client/components/listingForm/useListingForm';
import { AppDialog } from '@client/components/misc/AppDialog';
import { DialogConfirmFooter } from '@client/components/misc/DialogConfirmFooter';
import { LISTING_IMAGE_ASPECT_RATIO } from '@client/constants';
import { fieldErrorColor } from '@client/theme';
import { listingImageUrl } from '@client/utils/imageUtils';
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
	useSortable,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { LISTING_LIMITS } from '@heirloom/common/constants';
import {
	findInvalidVariationOptionIndices,
	validateVariationEntry,
} from '@heirloom/common/validation/listing';
import { ValidationField } from '@heirloom/common/validation/shared';
import React, { useEffect, useRef, useState } from 'react';
import {
	FaGripHorizontal,
	FaImage,
	FaTrashAlt,
} from 'react-icons/fa';

const OPTION_IMG_W = 32;

type OptionEntry = {
	name: string;
	priceCents: number | null;
	imageUuid: string | null;
	imagePreviewUrl: string | null;
	imageUploading: boolean;
};

type OptionRowProps = {
	id: string;
	entry: OptionEntry;
	invalid?: boolean;
	// Color of the divider drawn above this row; undefined for the first row.
	dividerColor?: string;
	deletable?: boolean;
	showPrice: boolean;
	showImage: boolean;
	inputRef?: React.RefObject<HTMLInputElement | null>;
	onChange: (patch: Partial<OptionEntry>) => void;
	onDelete: () => void;
	onTabKey?: () => void;
	uploadImage: (file: File) => Promise<string | null>;
};

const OptionRow = ({
	id,
	entry,
	invalid,
	dividerColor,
	deletable,
	showPrice,
	showImage,
	inputRef,
	onChange,
	onDelete,
	onTabKey,
	uploadImage,
}: OptionRowProps) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id });

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	return (
		<HStack
			ref={setNodeRef}
			style={{
				transform: CSS.Transform.toString(transform),
				transition,
				opacity: isDragging ? 0.4 : 1,
			}}
			{...(invalid && { bg: 'red.50' })}
			{...(dividerColor && {
				borderTopWidth: 1,
				borderTopColor: dividerColor,
			})}
			gap={2}
			px={2}
			minH={12}
			overflowX="auto"
		>
			{/* Drag handle */}
			<IconButton
				size="sm"
				variant="ghost"
				cursor="grab"
				color="fg.muted"
				alignSelf="center"
				touchAction="none"
				flexShrink={0}
				{...attributes}
				{...listeners}
			>
				<FaGripHorizontal />
			</IconButton>
			{/* Image */}
			{showImage && (
				<Box
					as="button"
					w={OPTION_IMG_W}
					flexShrink={0}
					aspectRatio={LISTING_IMAGE_ASPECT_RATIO}
					display="flex"
					alignItems="center"
					justifyContent="center"
					bg="gray.50"
					cursor="pointer"
					overflow="hidden"
					mr={1}
					onClick={() => fileInputRef.current?.click()}
				>
					<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						style={{ display: 'none' }}
						onChange={async (e) => {
							const file = e.target.files?.[0];
							if (!file) return;
							e.target.value = '';
							const previewUrl =
								URL.createObjectURL(file);
							onChange({
								imagePreviewUrl: previewUrl,
								imageUuid: null,
								imageUploading: true,
							});
							const uuid = await uploadImage(file);
							onChange({
								imageUuid: uuid,
								imageUploading: false,
							});
						}}
					/>
					{entry.imagePreviewUrl ? (
						<Image
							src={entry.imagePreviewUrl}
							width="100%"
							height="100%"
							objectFit="cover"
							opacity={entry.imageUploading ? 0.5 : 1}
						/>
					) : (
						<FaImage
							color="lightgray"
							size={20}
						/>
					)}
				</Box>
			)}

			{/* Name */}
			<Input
				ref={inputRef}
				fontSize={18}
				h={10}
				minW={100}
				value={entry.name}
				onChange={(e) => onChange({ name: e.target.value })}
				onKeyDown={(e) => {
					if (
						e.key === 'Tab' &&
						!e.shiftKey &&
						!showPrice
					) {
						e.preventDefault();
						onTabKey?.();
					}
				}}
				placeholder="Option name"
				{...(showImage
					? {
							bg: 'white',
							...(invalid && {
								borderColor: fieldErrorColor,
							}),
						}
					: {
							border: 'none',
							px: 0,
						})}
			/>

			{/* Price */}
			{showPrice && (
				<Box
					alignSelf="center"
					flexShrink={0}
				>
					<PriceInput
						value={entry.priceCents}
						onChange={(v) => onChange({ priceCents: v })}
						onKeyDown={(e) => {
							if (e.key === 'Tab' && !e.shiftKey) {
								e.preventDefault();
								onTabKey?.();
							}
						}}
						enclosed={showImage}
					/>
				</Box>
			)}

			{/* Delete */}
			<IconButton
				size="sm"
				variant="ghost"
				color="red.500"
				flexShrink={0}
				onClick={onDelete}
				disabled={!deletable}
			>
				<FaTrashAlt />
			</IconButton>
		</HStack>
	);
};

type Props = {
	open: boolean;
	initial?: Variation | null;
	existingNames?: string[];
	onClose: () => void;
	onConfirm: (variation: Variation) => void;
	uploadImage: (file: File) => Promise<string | null>;
	shopShortId: string;
};

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
	const [options, setOptions] = useState<OptionEntry[]>([
		{
			name: '',
			priceCents: null,
			imageUuid: null,
			imagePreviewUrl: null,
			imageUploading: false,
		},
		{
			name: '',
			priceCents: null,
			imageUuid: null,
			imagePreviewUrl: null,
			imageUploading: false,
		},
	]);
	const [optionIds, setOptionIds] = useState<string[]>(() => [
		crypto.randomUUID(),
		crypto.randomUUID(),
	]);
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

	const snapshot = (
		n: string,
		pv: boolean,
		iv: boolean,
		opts: OptionEntry[],
	) =>
		JSON.stringify({
			name: n,
			pricesVary: pv,
			imagesVary: iv,
			options: opts.map((o) => ({
				name: o.name,
				priceCents: o.priceCents,
				imageUuid: o.imageUuid,
			})),
		});

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
			if (initial) {
				const sorted = Object.entries(initial.options).sort(
					(a, b) => a[1].order - b[1].order,
				);
				const initialOptions = sorted.map(([, o]) => ({
					name: o.name,
					priceCents: o.priceCents,
					imageUuid: o.imageUuid,
					imagePreviewUrl: o.imageUuid
						? listingImageUrl(shopShortId, o.imageUuid)
						: null,
					imageUploading: false,
				}));
				setName(initial.name);
				setPricesVary(initial.pricesVary);
				setImagesVary(initial.imagesVary);
				setOptions(initialOptions);
				setOptionIds(sorted.map(([id]) => id));
				initialSnapshotRef.current = snapshot(
					initial.name,
					initial.pricesVary,
					initial.imagesVary,
					initialOptions,
				);
			} else {
				const initialOptions = [
					{
						name: '',
						priceCents: null,
						imageUuid: null,
						imagePreviewUrl: null,
						imageUploading: false,
					},
					{
						name: '',
						priceCents: null,
						imageUuid: null,
						imagePreviewUrl: null,
						imageUploading: false,
					},
				];
				setName('');
				setPricesVary(false);
				setImagesVary(false);
				setNameError(null);
				setOptions(initialOptions);
				setOptionIds([
					crypto.randomUUID(),
					crypto.randomUUID(),
				]);
				initialSnapshotRef.current = snapshot(
					'',
					false,
					false,
					initialOptions,
				);
			}
			setOptionsError(null);
			setInvalidOptionIds(new Set());
		} else {
			setNameError(null);
			setOptionsError(null);
			setInvalidOptionIds(new Set());
		}
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
		setOptions((prev) => [
			...prev,
			{
				name: '',
				priceCents: null,
				imageUuid: null,
				imagePreviewUrl: null,
				imageUploading: false,
			},
		]);
		setOptionIds((prev) => [...prev, crypto.randomUUID()]);
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
		index: number,
		patch: Partial<OptionEntry>,
	) => {
		setOptions((prev) =>
			prev.map((o, i) =>
				i === index ? { ...o, ...patch } : o,
			),
		);
		if (patch.name !== undefined) {
			setOptionsError(null);
			setInvalidOptionIds(new Set());
		}
	};

	const removeOption = (index: number) => {
		setOptions((prev) => prev.filter((_, i) => i !== index));
		setOptionIds((prev) => prev.filter((_, i) => i !== index));
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
					(i) => optionIds[i],
				),
			),
		);

		if (errors.length > 0) return;

		const trimmedName = name.trim();
		const optionsRecord = Object.fromEntries(
			optionIds.map((id, i) => [
				id,
				{
					name: options[i].name.trim(),
					order: i,
					priceCents: options[i].priceCents,
					imageUuid: options[i].imageUuid,
				},
			]),
		);
		onConfirm({
			name: trimmedName,
			pricesVary,
			imagesVary,
			options: optionsRecord,
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

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;
		const from = optionIds.indexOf(active.id as string);
		const to = optionIds.indexOf(over.id as string);
		const move = <T,>(arr: T[]): T[] => {
			const result = [...arr];
			const [item] = result.splice(from, 1);
			result.splice(to, 0, item);
			return result;
		};
		setOptions(move);
		setOptionIds(move);
	};

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
								items={optionIds}
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
									{options.map((opt, i) => {
										if (!inputRefs.current[i]) {
											inputRefs.current[i] = {
												current: null,
											};
										}
										return (
											<OptionRow
												key={optionIds[i]}
												id={optionIds[i]}
												entry={opt}
												invalid={invalidOptionIds.has(
													optionIds[i],
												)}
												dividerColor={
													i === 0
														? undefined
														: invalidOptionIds.has(
																	optionIds[
																		i
																	],
															  ) ||
															  invalidOptionIds.has(
																	optionIds[
																		i -
																			1
																	],
															  )
															? fieldErrorColor
															: 'gray.200'
												}
												deletable={
													options.length > 2
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
														i,
														patch,
													)
												}
												onDelete={() =>
													removeOption(i)
												}
												onTabKey={() =>
													handleTabOnOption(
														i,
													)
												}
												uploadImage={
													uploadImage
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
