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
import {
	FormField,
	FormInput,
} from '@client/components/input/FormField';
import { AddFieldButton } from '@client/components/listing/AddFieldButton';
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
import { useEffect, useState } from 'react';
import { FaGripVertical, FaTrashAlt } from 'react-icons/fa';

type OptionRowProps = {
	id: string;
	value: string;
	deletable: boolean;
	onChange: (value: string) => void;
	onDelete: () => void;
};

const OptionRow = ({
	id,
	value,
	deletable,
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
			borderColor="gray.200"
			borderRadius="md"
			px={2}
			py={1}
			minWidth={250}
		>
			<IconButton
				size="sm"
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
			{deletable ? (
				<IconButton
					size="sm"
					variant="ghost"
					color="red.500"
					onClick={onDelete}
				>
					<FaTrashAlt />
				</IconButton>
			) : (
				<IconButton
					size="sm"
					variant="ghost"
					opacity={0}
					pointerEvents="none"
					aria-hidden
				>
					<FaTrashAlt />
				</IconButton>
			)}
		</Flex>
	);
};

type Props = {
	open: boolean;
	initial?: Variation | null;
	onClose: () => void;
	onConfirm: (variation: Variation) => void;
};

export const VariationDialog = ({
	open,
	initial,
	onClose,
	onConfirm,
}: Props) => {
	const [name, setName] = useState('');
	const [pricesVary, setPricesVary] = useState(false);
	const [leadTimesVary, setLeadTimesVary] = useState(false);
	const [nameError, setNameError] = useState<string | null>(null);
	const [options, setOptions] = useState<string[]>(['']);
	const [optionIds, setOptionIds] = useState<string[]>(() => [
		crypto.randomUUID(),
	]);

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
			} else {
				setName('');
				setPricesVary(false);
				setLeadTimesVary(false);
				setNameError(null);
				setOptions(['']);
				setOptionIds([crypto.randomUUID()]);
			}
		} else {
			setNameError(null);
		}
	}, [open]);

	const addOption = () => {
		setOptions((prev) => [...prev, '']);
		setOptionIds((prev) => [...prev, crypto.randomUUID()]);
	};

	const updateOption = (index: number, value: string) => {
		setOptions((prev) =>
			prev.map((o, i) => (i === index ? value : o)),
		);
	};

	const removeOption = (index: number) => {
		setOptions((prev) => prev.filter((_, i) => i !== index));
		setOptionIds((prev) => prev.filter((_, i) => i !== index));
	};

	const handleConfirm = () => {
		if (!name.trim()) {
			setNameError('Name is required.');
			return;
		}
		const optionsRecord = Object.fromEntries(
			optionIds.map((id, i) => [
				id,
				{ name: options[i], order: i },
			]),
		);
		onConfirm({
			name: name.trim(),
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

							<FormField label="Options">
								<Stack gap={2}>
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
													deletable={i > 0}
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
									<HStack>
										<AddFieldButton
											onClick={addOption}
										>
											Add Option
										</AddFieldButton>
									</HStack>
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
