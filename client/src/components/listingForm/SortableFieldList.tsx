import {
	Box,
	Flex,
	HStack,
	IconButton,
	Text,
} from '@chakra-ui/react';
import { FIELD_ERROR_COLOR } from '@client/theme';
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
	FaGripHorizontal,
	FaPencilAlt,
	FaTrashAlt,
} from 'react-icons/fa';

export type SortableFieldItem = {
	id: string;
	label: string;
};

type ItemProps = {
	item: SortableFieldItem;
	isLast: boolean;
	onEdit: () => void;
	onDelete: () => void;
};

const SortableFieldItem = ({
	item,
	isLast,
	onEdit,
	onDelete,
}: ItemProps) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: item.id });

	return (
		<>
			<Flex
				ref={setNodeRef}
				style={{
					transform: CSS.Transform.toString(transform),
					transition,
					opacity: isDragging ? 0.5 : 1,
				}}
				minWidth={300}
				alignItems="center"
				px={2}
				h={12}
				gap={3}
			>
				<IconButton
					size="xs"
					variant="ghost"
					cursor="grab"
					color="gray.400"
					{...attributes}
					{...listeners}
				>
					<FaGripHorizontal />
				</IconButton>
				<Text
					flex={1}
					fontSize={18}
					truncate
				>
					{item.label}
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
						color={FIELD_ERROR_COLOR}
						onClick={onDelete}
					>
						<FaTrashAlt />
					</IconButton>
				</HStack>
			</Flex>
			{!isLast && (
				<Box
					borderBottomWidth={1}
					borderColor="gray.200"
				/>
			)}
		</>
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
				<Box
					borderWidth={1}
					borderColor="gray.200"
					borderRadius="md"
					overflow="hidden"
				>
					{items.map((item, i) => (
						<SortableFieldItem
							key={item.id}
							item={item}
							isLast={i === items.length - 1}
							onEdit={() => onEdit(item.id)}
							onDelete={() => onDelete(item.id)}
						/>
					))}
				</Box>
			</SortableContext>
		</DndContext>
	);
};
