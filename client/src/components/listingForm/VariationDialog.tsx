import {
	Button,
	Checkbox,
	CloseButton,
	Dialog,
	Flex,
	HStack,
	IconButton,
	Input,
	Stack,
} from '@chakra-ui/react';
import { FieldError } from '@client/components/input/FieldError';
import {
	FormField,
	FormInput,
} from '@client/components/input/FormField';
import { AddFieldButton } from '@client/components/listingForm/AddFieldButton';
import { Variation } from '@client/hooks/useListingForm';
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
import { useEffect, useState } from 'react';
import { FaGripVertical, FaTrashAlt } from 'react-icons/fa';

type OptionRowProps = {
	id: string;
	value: string;
	error?: string | null;
	onChange: (value: string) => void;
	onDelete: () => void;
};

const OptionRow = ({
	id,
	value,
	error,
	onChange,
	onDelete,
}: OptionRowProps) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id });

	return (
		<Stack gap={1.5}>
			<Flex
				ref={setNodeRef}
				style={{
					transform: CSS.Transform.toString(transform),
					transition,
					opacity: isDragging ? 0.5 : 1,
				}}
				alignItems="center"
				gap={2}
				borderWidth={1}
				borderColor={error ? 'red.500' : 'gray.200'}
				borderRadius="md"
				px={1}
				py={0.5}
			>
				<IconButton
					size="xs"
					variant="ghost"
					cursor="grab"
					color="gray.400"
					{...attributes}
					{...listeners}
				>
					<FaGripVertical />
				</IconButton>
				<Input
					flex={1}
					size="sm"
					fontSize={18}
					variant="flushed"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder="Option name"
					border="none"
					_focus={{ border: 'none', boxShadow: 'none' }}
				/>
				<IconButton
					size="xs"
					variant="ghost"
					color="red.500"
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
};

export const VariationDialog = ({
	open,
	initial,
	existingNames = [],
	onClose,
	onConfirm,
}: Props) => {
	const [name, setName] = useState('');
	const [pricesVary, setPricesVary] = useState(false);
	const [leadTimesVary, setLeadTimesVary] = useState(false);
	const [nameError, setNameError] = useState<string | null>(null);
	const [options, setOptions] = useState<string[]>(['', '']);
	const [optionIds, setOptionIds] = useState<string[]>(() => [
		crypto.randomUUID(),
		crypto.randomUUID(),
	]);
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
				setLeadTimesVary(initial.leadTimesVary);
				setOptions(sorted.map(([, o]) => o.name));
				setOptionIds(sorted.map(([id]) => id));
				setOptionErrors(sorted.map(() => null));
			} else {
				setName('');
				setPricesVary(false);
				setLeadTimesVary(false);
				setNameError(null);
				setOptions(['', '']);
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

	const addOption = () => {
		if (options.length >= LISTING_LIMITS.maxOptionsPerVariation)
			return;
		setOptions((prev) => [...prev, '']);
		setOptionIds((prev) => [...prev, crypto.randomUUID()]);
		setOptionErrors((prev) => [...prev, null]);
		setOptionsCountError(null);
	};

	const updateOption = (index: number, value: string) => {
		setOptions((prev) =>
			prev.map((o, i) => (i === index ? value : o)),
		);
		setOptionErrors((prev) =>
			prev.map((e, i) => (i === index ? null : e)),
		);
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

		const trimmedOptions = options.map((o) => o.trim());
		const filledOptions = trimmedOptions.filter(Boolean);

		if (filledOptions.length < 2) {
			setOptionsCountError(
				'At least two options are required.',
			);
			valid = false;
		} else {
			setOptionsCountError(null);
		}

		const seen = new Set<string>();
		const newOptionErrors = trimmedOptions.map((opt) => {
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
				{ name: trimmedOptions[i], order: i },
			]),
		);
		onConfirm({
			name: trimmedName,
			pricesVary,
			leadTimesVary,
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
			onInteractOutside={(e) => {
				e.preventDefault();
				onClose();
			}}
			onEscapeKeyDown={(e) => {
				e.preventDefault();
				onClose();
			}}
			size="xs"
		>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content>
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
							<Stack gap={3}>
								<Checkbox.Root
									checked={pricesVary}
									onCheckedChange={(e) =>
										setPricesVary(!!e.checked)
									}
								>
									<Checkbox.HiddenInput />
									<Checkbox.Control />
									<Checkbox.Label fontSize={17}>
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
									<Checkbox.Label fontSize={17}>
										Processing varies
									</Checkbox.Label>
								</Checkbox.Root>
							</Stack>

							<FormField
								label="Options"
								error={optionsCountError}
							>
								<Stack
									gap={2}
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
											{options.map((opt, i) => (
												<OptionRow
													key={optionIds[i]}
													id={optionIds[i]}
													value={opt}
													error={
														optionErrors[
															i
														]
													}
													onChange={(v) =>
														updateOption(
															i,
															v,
														)
													}
													onDelete={() =>
														removeOption(
															i,
														)
													}
												/>
											))}
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
								{initial ? 'Save' : 'Add'}
							</Button>
						</HStack>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
};
