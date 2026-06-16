import { Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import { ListingDescrSection } from '@client/hooks/useListingForm';
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
import { FaGripVertical, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

type ItemProps = {
	id: string;
	section: ListingDescrSection;
	onEdit: () => void;
	onDelete: () => void;
};

const DetailSectionItem = ({ id, section, onEdit, onDelete }: ItemProps) => {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
		useSortable({ id });

	return (
		<Flex
			ref={setNodeRef}
			style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }}
			minWidth={325}
			alignItems="center"
			gap={3}
			borderWidth={1}
			borderColor="gray.200"
			borderRadius="md"
			px={3}
			py={2}
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
			<Text flex={1} fontSize={18} truncate>
				{section.title || (
					<Text as="span" color="gray.400" fontStyle="italic">
						Untitled section
					</Text>
				)}
			</Text>
			<HStack gap={0}>
				<IconButton aria-label="Edit section" size="sm" variant="ghost" onClick={onEdit}>
					<FaPencilAlt />
				</IconButton>
				<IconButton aria-label="Delete section" size="sm" variant="ghost" color="red.500" onClick={onDelete}>
					<FaTrashAlt />
				</IconButton>
			</HStack>
		</Flex>
	);
};

type Props = {
	sections: ListingDescrSection[];
	ids: string[];
	onEdit: (index: number) => void;
	onDelete: (index: number) => void;
	onReorder: (fromIndex: number, toIndex: number) => void;
};

export const DetailSectionList = ({ sections, ids, onEdit, onDelete, onReorder }: Props) => {
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;
		const fromIndex = ids.indexOf(active.id as string);
		const toIndex = ids.indexOf(over.id as string);
		onReorder(fromIndex, toIndex);
	};

	return (
		<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
			<SortableContext items={ids} strategy={verticalListSortingStrategy}>
				<Flex direction="column" gap={2}>
					{sections.map((section, i) => (
						<DetailSectionItem
							key={ids[i]}
							id={ids[i]}
							section={section}
							onEdit={() => onEdit(i)}
							onDelete={() => onDelete(i)}
						/>
					))}
				</Flex>
			</SortableContext>
		</DndContext>
	);
};
