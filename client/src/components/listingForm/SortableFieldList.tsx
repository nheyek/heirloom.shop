import { Flex, HStack, IconButton, Text } from '@chakra-ui/react';
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
import {
	FaGripVertical,
	FaPencilAlt,
	FaTrashAlt,
} from 'react-icons/fa';

export type SortableFieldItem = {
	id: string;
	label: string;
};

type ItemProps = {
	item: SortableFieldItem;
	onEdit: () => void;
	onDelete: () => void;
};

const SortableFieldItem = ({ item, onEdit, onDelete }: ItemProps) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: item.id });

	return (
		<Flex
			ref={setNodeRef}
			style={{
				transform: CSS.Transform.toString(transform),
				transition,
				opacity: isDragging ? 0.5 : 1,
			}}
			minWidth={300}
			alignItems="center"
			p={1.5}
			gap={3}
			borderWidth={1}
			borderColor="gray.200"
			borderRadius="md"
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
			<Text
				flex={1}
				fontSize={18}
				truncate
			>
				{item.label || (
					<Text
						color="gray.400"
						fontStyle="italic"
					>
						Untitled
					</Text>
				)}
			</Text>
			<HStack gap={1}>
				<IconButton
					size="xs"
					variant="ghost"
					onClick={onEdit}
				>
					<FaPencilAlt />
				</IconButton>
				<IconButton
					size="xs"
					variant="ghost"
					color="red.500"
					onClick={onDelete}
				>
					<FaTrashAlt />
				</IconButton>
			</HStack>
		</Flex>
	);
};

type Props = {
	items: SortableFieldItem[];
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
	onReorder: (fromId: string, toId: string) => void;
};

export const SortableFieldList = ({
	items,
	onEdit,
	onDelete,
	onReorder,
}: Props) => {
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;
		onReorder(active.id as string, over.id as string);
	};

	const ids = items.map((i) => i.id);

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext
				items={ids}
				strategy={verticalListSortingStrategy}
			>
				<Flex
					direction="column"
					gap={2}
				>
					{items.map((item) => (
						<SortableFieldItem
							key={item.id}
							item={item}
							onEdit={() => onEdit(item.id)}
							onDelete={() => onDelete(item.id)}
						/>
					))}
				</Flex>
			</SortableContext>
		</DndContext>
	);
};
