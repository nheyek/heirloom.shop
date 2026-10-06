import {
	Box,
	BoxProps,
	IconButton,
	IconButtonProps,
	Image,
	Skeleton,
} from '@chakra-ui/react';
import {
	useImageList,
	useImageListItem,
} from '@client/components/listingForm/imageList/ImageListContext';
import { LISTING_IMAGE_ASPECT_RATIO } from '@client/constants';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaTrashAlt } from 'react-icons/fa';

export const ImageTile = ({ children, ...boxProps }: BoxProps) => {
	const { entry } = useImageListItem();
	const { disabled } = useImageList();
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
				transform: CSS.Translate.toString(transform),
				transition,
				opacity: isDragging ? 0.5 : 1,
			}}
			position="relative"
			flexShrink={0}
			cursor={disabled ? 'default' : 'grab'}
			{...attributes}
			{...listeners}
			{...boxProps}
		>
			<Skeleton
				loading={entry.isUploading}
				borderRadius="md"
			>
				<Image
					src={entry.previewUrl}
					w="100%"
					aspectRatio={LISTING_IMAGE_ASPECT_RATIO}
					objectFit="cover"
					borderRadius="md"
					display="block"
					opacity={entry.uploadFailed ? 0.4 : 1}
					draggable={false}
				/>
			</Skeleton>
			{children}
		</Box>
	);
};

export const RemoveImageButton = ({
	children = <FaTrashAlt />,
	...buttonProps
}: IconButtonProps) => {
	const { entry, index } = useImageListItem();
	const { remove, disabled } = useImageList();

	return (
		<IconButton
			size="xs"
			variant="subtle"
			position="absolute"
			top={2}
			right={2}
			onClick={(e) => {
				e.stopPropagation();
				remove(index);
			}}
			disabled={disabled || entry.isUploading}
			{...buttonProps}
		>
			{children}
		</IconButton>
	);
};
