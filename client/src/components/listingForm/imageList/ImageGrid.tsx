import { Wrap, WrapProps } from '@chakra-ui/react';
import {
	ImageListItemProvider,
	useImageList,
} from '@client/components/listingForm/imageList/ImageListContext';
import {
	DndContext,
	DragEndEvent,
	MouseSensor,
	TouchSensor,
	closestCenter,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	SortableContext,
	arrayMove,
	rectSortingStrategy,
} from '@dnd-kit/sortable';

export const ImageGrid = ({ children, ...wrapProps }: WrapProps) => {
	const { entries, reorder, disabled } = useImageList();
	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: { distance: 5 },
		}),
		useSensor(TouchSensor, {
			activationConstraint: { delay: 150, tolerance: 5 },
		}),
	);

	const handleDragEnd = ({ active, over }: DragEndEvent) => {
		if (disabled || !over || active.id === over.id) return;
		const oldIndex = entries.findIndex(
			(e) => e.previewUrl === active.id,
		);
		const newIndex = entries.findIndex(
			(e) => e.previewUrl === over.id,
		);
		reorder(arrayMove(entries, oldIndex, newIndex));
	};

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext
				items={entries.map((e) => e.previewUrl)}
				strategy={rectSortingStrategy}
			>
				<Wrap
					alignItems="flex-start"
					{...wrapProps}
				>
					{entries.map((entry, index) => (
						<ImageListItemProvider
							key={entry.previewUrl}
							entry={entry}
							index={index}
						>
							{children}
						</ImageListItemProvider>
					))}
				</Wrap>
			</SortableContext>
		</DndContext>
	);
};
