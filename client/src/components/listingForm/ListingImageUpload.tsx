import {
	Box,
	IconButton,
	Image,
	Skeleton,
	Wrap,
} from '@chakra-ui/react';
import { ImageDropzone } from '@client/components/input/ImageDropzone';
import { AddFieldButton } from '@client/components/listingForm/AddFieldButton';
import {
	STANDARD_IMAGE_ASPECT_RATIO,
	THUMBNAIL_GAP,
	THUMBNAIL_WIDTH,
} from '@client/constants';
import { ImageEntry } from '@client/hooks/useImageUpload';
import { LISTING_LIMITS } from '@heirloom/common/constants';
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
	useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaTrashAlt } from 'react-icons/fa';

type ThumbnailProps = {
	entry: ImageEntry;
	onRemove: () => void;
	disabled?: boolean;
};

const SortableThumbnail = ({
	entry,
	onRemove,
	disabled,
}: ThumbnailProps) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: entry.previewUrl, disabled });

	return (
		<Box
			ref={setNodeRef}
			style={{
				transform: CSS.Transform.toString(transform),
				transition,
				opacity: isDragging ? 0.5 : 1,
			}}
			position="relative"
			w={THUMBNAIL_WIDTH}
			flexShrink={0}
			cursor={disabled ? 'default' : 'grab'}
			{...attributes}
			{...listeners}
		>
			<Skeleton
				loading={entry.isUploading}
				borderRadius="md"
			>
				<Image
					src={entry.previewUrl}
					w="100%"
					aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
					objectFit="cover"
					borderRadius="md"
					display="block"
					opacity={entry.uploadFailed ? 0.4 : 1}
					draggable={false}
				/>
			</Skeleton>
			<IconButton
				size="xs"
				variant="subtle"
				position="absolute"
				top={2}
				right={2}
				onClick={(e) => {
					e.stopPropagation();
					onRemove();
				}}
				disabled={disabled || entry.isUploading}
			>
				<FaTrashAlt />
			</IconButton>
		</Box>
	);
};

type ListingImageUploadProps = {
	imageEntries: ImageEntry[];
	onAdd: (files: File[]) => void;
	onRemove: (index: number) => void;
	onReorder: (entries: ImageEntry[]) => void;
	disabled?: boolean;
};

export const ListingImageUpload = ({
	imageEntries,
	onAdd,
	onRemove,
	onReorder,
	disabled,
}: ListingImageUploadProps) => {
	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: { distance: 5 },
		}),
		useSensor(TouchSensor, {
			activationConstraint: { delay: 150, tolerance: 5 },
		}),
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (disabled || !over || active.id === over.id) return;
		const oldIndex = imageEntries.findIndex(
			(e) => e.previewUrl === active.id,
		);
		const newIndex = imageEntries.findIndex(
			(e) => e.previewUrl === over.id,
		);
		onReorder(arrayMove(imageEntries, oldIndex, newIndex));
	};

	if (!imageEntries.length) {
		return (
			<ImageDropzone
				onAdd={onAdd}
				maxFiles={LISTING_LIMITS.maxImages}
				disabled={disabled}
				width="100%"
			/>
		);
	}

	return (
		<Box>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={imageEntries.map((e) => e.previewUrl)}
					strategy={rectSortingStrategy}
				>
					<Wrap
						gap={THUMBNAIL_GAP}
						alignItems="flex-start"
						mb={3}
					>
						{imageEntries.map((entry, i) => (
							<SortableThumbnail
								key={entry.previewUrl}
								entry={entry}
								onRemove={() => onRemove(i)}
								disabled={disabled}
							/>
						))}
					</Wrap>
				</SortableContext>
			</DndContext>
			<ImageDropzone
				onAdd={onAdd}
				maxFiles={LISTING_LIMITS.maxImages}
				disabled={disabled}
				trigger={<AddFieldButton>Add Images</AddFieldButton>}
			/>
		</Box>
	);
};
