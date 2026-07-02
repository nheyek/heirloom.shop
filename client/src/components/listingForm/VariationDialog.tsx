import {
	Box,
	Button,
	Checkbox,
	CloseButton,
	Dialog,
	Flex,
	HStack,
	IconButton,
	Image,
	Input,
	Stack,
	StackSeparator,
} from '@chakra-ui/react';
import { FieldError } from '@client/components/input/FieldError';
import {
	FormField,
	FormInput,
} from '@client/components/input/FormField';
import { PriceInput } from '@client/components/input/PriceInput';
import { AddFieldButton } from '@client/components/listingForm/AddFieldButton';
import { STANDARD_IMAGE_ASPECT_RATIO } from '@client/constants';
import { Variation } from '@client/hooks/useListingForm';
import { FIELD_ERROR_COLOR } from '@client/theme';
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
	error?: string | null;
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
	error,
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
		<Stack gap={1}>
			<Flex
				ref={setNodeRef}
				style={{
					transform: CSS.Transform.toString(transform),
					transition,
					opacity: isDragging ? 0.4 : 1,
				}}
				alignItems="stretch"
				{...(error && {
					borderWidth: 1,
					borderColor: FIELD_ERROR_COLOR,
				})}
				overflow="auto"
				gap={2}
				px={2}
				minH={10}
			>
				{/* Drag handle */}
				<IconButton
					size="sm"
					variant="ghost"
					cursor="grab"
					color="gray.400"
					alignSelf="center"
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
						aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
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
								opacity={
									entry.imageUploading ? 0.5 : 1
								}
							/>
						) : (
							<FaImage
								color="lightgray"
								size={20}
							/>
						)}
					</Box>
				)}

				<HStack flex={1}>
					{/* Name */}
					<Input
						ref={inputRef}
						fontSize={18}
						h={10}
						minW={150}
						value={entry.name}
						onChange={(e) =>
							onChange({ name: e.target.value })
						}
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
						{...(!showImage && {
							border: 'none',
							px: 0,
						})}
					/>

					{/* Price */}
					{showPrice && (
						<Box alignSelf="center">
							<PriceInput
								value={entry.priceCents}
								onChange={(v) =>
									onChange({ priceCents: v })
								}
								onKeyDown={(e) => {
									if (
										e.key === 'Tab' &&
										!e.shiftKey
									) {
										e.preventDefault();
										onTabKey?.();
									}
								}}
								{...(!showImage && {
									border: 'none',
								})}
							/>
						</Box>
					)}
				</HStack>

				{/* Delete */}
				<IconButton
					size="sm"
					variant="ghost"
					color="red.500"
					alignSelf="center"
					onClick={onDelete}
				>
					<FaTrashAlt />
				</IconButton>
			</Flex>
			{error && <FieldError>{error}</FieldError>}
		</Stack>
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
	const [optionErrors, setOptionErrors] = useState<
		(string | null)[]
	>([null, null]);
	const [optionsCountError, setOptionsCountError] = useState<
		string | null
	>(null);

	useEffect(() => {
		if (open) {
			if (initial) {
				const sorted = Object.entries(initial.options).sort(
					(a, b) => a[1].order - b[1].order,
				);
				setName(initial.name);
				setPricesVary(initial.pricesVary);
				setImagesVary(initial.imagesVary);
				setOptions(
					sorted.map(([, o]) => ({
						name: o.name,
						priceCents: o.priceCents,
						imageUuid: o.imageUuid,
						imagePreviewUrl: o.imageUuid
							? listingImageUrl(
									shopShortId,
									o.imageUuid,
								)
							: null,
						imageUploading: false,
					})),
				);
				setOptionIds(sorted.map(([id]) => id));
				setOptionErrors(sorted.map(() => null));
			} else {
				setName('');
				setPricesVary(false);
				setImagesVary(false);
				setNameError(null);
				setOptions([
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
				setOptionIds([
					crypto.randomUUID(),
					crypto.randomUUID(),
				]);
				setOptionErrors([null, null]);
			}
			setOptionsCountError(null);
		} else {
			setNameError(null);
			setOptionErrors([]);
			setOptionsCountError(null);
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
		setOptionErrors((prev) => [...prev, null]);
		setOptionsCountError(null);
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
			setOptionErrors((prev) =>
				prev.map((e, i) => (i === index ? null : e)),
			);
		}
	};

	const removeOption = (index: number) => {
		setOptions((prev) => prev.filter((_, i) => i !== index));
		setOptionIds((prev) => prev.filter((_, i) => i !== index));
		setOptionErrors((prev) => prev.filter((_, i) => i !== index));
	};

	const handleConfirm = () => {
		let valid = true;

		const trimmedName = name.trim();
		if (!trimmedName) {
			setNameError('Name is required.');
			valid = false;
		} else if (
			trimmedName.length > LISTING_LIMITS.maxNameLength
		) {
			setNameError(
				`Name must be ${LISTING_LIMITS.maxNameLength} characters or fewer.`,
			);
			valid = false;
		} else if (
			existingNames.some(
				(n) => n.toLowerCase() === trimmedName.toLowerCase(),
			)
		) {
			setNameError(
				'A variation with this name already exists.',
			);
			valid = false;
		} else {
			setNameError(null);
		}

		if (options.length < 2) {
			setOptionsCountError(
				'At least two options are required.',
			);
			valid = false;
		} else {
			setOptionsCountError(null);
		}

		const seen = new Set<string>();
		const newOptionErrors = options.map((o) => {
			const opt = o.name.trim();
			if (!opt) return 'Option name is required.';
			if (opt.length > LISTING_LIMITS.maxNameLength)
				return `Option name must be ${LISTING_LIMITS.maxNameLength} characters or fewer.`;
			const key = opt.toLowerCase();
			if (seen.has(key)) return 'Duplicate option name.';
			seen.add(key);
			return null;
		});
		if (newOptionErrors.some(Boolean)) {
			setOptionErrors(newOptionErrors);
			valid = false;
		}

		if (!valid) return;

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
		setOptionErrors(move);
	};

	return (
		<Dialog.Root
			open={open}
			size="xs"
			onInteractOutside={(e) => {
				e.preventDefault();
				onClose();
			}}
			onEscapeKeyDown={(e) => {
				e.preventDefault();
				onClose();
			}}
		>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content
					maxW={
						pricesVary && imagesVary
							? 640
							: pricesVary || imagesVary
								? 520
								: undefined
					}
				>
					<Dialog.Header>
						<Dialog.Title
							fontSize={24}
							fontWeight={500}
						>
							{initial
								? 'Edit Variation'
								: 'Add Variation'}
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
								error={optionsCountError}
								required
							>
								<Stack
									gap={1.5}
									w="100%"
								>
									<DndContext
										sensors={sensors}
										collisionDetection={
											closestCenter
										}
										onDragEnd={handleDragEnd}
									>
										<SortableContext
											items={optionIds}
											strategy={
												verticalListSortingStrategy
											}
										>
											<Stack
												gap={0}
												borderWidth={1}
												borderColor="gray.200"
												borderRadius="md"
												overflow="hidden"
												separator={
													<StackSeparator />
												}
											>
												{options.map(
													(opt, i) => {
														if (
															!inputRefs
																.current[
																i
															]
														) {
															inputRefs.current[
																i
															] = {
																current:
																	null,
															};
														}
														return (
															<OptionRow
																key={
																	optionIds[
																		i
																	]
																}
																id={
																	optionIds[
																		i
																	]
																}
																entry={
																	opt
																}
																error={
																	optionErrors[
																		i
																	]
																}
																showPrice={
																	pricesVary
																}
																showImage={
																	imagesVary
																}
																inputRef={
																	inputRefs
																		.current[
																		i
																	]
																}
																onChange={(
																	patch,
																) =>
																	updateOption(
																		i,
																		patch,
																	)
																}
																onDelete={() =>
																	removeOption(
																		i,
																	)
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
													},
												)}
											</Stack>
										</SortableContext>
									</DndContext>
									{options.length <
										LISTING_LIMITS.maxOptionsPerVariation && (
										<HStack>
											<AddFieldButton
												onClick={addOption}
											>
												Add Option
											</AddFieldButton>
										</HStack>
									)}
								</Stack>
							</FormField>
						</Stack>
					</Dialog.Body>
					<Dialog.Footer>
						<HStack gap={2}>
							<Button
								size="md"
								fontSize={18}
								variant="subtle"
								onClick={onClose}
							>
								Cancel
							</Button>
							<Button
								size="md"
								fontSize={18}
								onClick={handleConfirm}
							>
								{initial ? 'Save' : 'Add'}
							</Button>
						</HStack>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
};
