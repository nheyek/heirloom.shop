import {
	Box,
	FileUpload,
	Flex,
	IconButton,
	Image,
	Skeleton,
	Stack,
	Text,
	Wrap,
} from '@chakra-ui/react';
import {
	MAX_IMAGE_SIZE_MB,
	MAX_LISTING_IMAGES,
	STANDARD_IMAGE_ASPECT_RATIO,
} from '@client/constants';
import { ImageEntry } from '@client/hooks/useListingForm';
import { toastError } from '@client/toaster';
import { FaImage, FaTrashAlt } from 'react-icons/fa';

const THUMBNAIL_WIDTH = 200;

const fullDropZoneStyles = {
	height: 200,
	width: '100%',
};

const minifiedDropZoneStyles = {
	aspectRatio: STANDARD_IMAGE_ASPECT_RATIO,
	width: THUMBNAIL_WIDTH,
};

type ListingImageUploadProps = {
	imageEntries: ImageEntry[];
	onAdd: (files: File[]) => void;
	onRemove: (index: number) => void;
	disabled?: boolean;
};

export const ListingImageUpload = ({
	imageEntries,
	onAdd,
	onRemove,
	disabled,
}: ListingImageUploadProps) => {
	const hasImages = imageEntries.length > 0;

	const fileUploadZone = (
		<FileUpload.Root
			accept="image/*"
			maxFiles={MAX_LISTING_IMAGES}
			maxFileSize={MAX_IMAGE_SIZE_MB * 1_000_000}
			onFileChange={(details) => {
				if (details.acceptedFiles.length > 0) {
					onAdd(details.acceptedFiles);
				}
			}}
			onFileReject={(details) => {
				const isTooLarge = details.files.some((f) =>
					f.errors.includes('FILE_TOO_LARGE'),
				);
				if (isTooLarge) {
					toastError(
						`Images must be ${MAX_IMAGE_SIZE_MB} MB or smaller.`,
					);
				}
			}}
			disabled={disabled}
			{...(hasImages && { width: 'auto' })}
		>
			<FileUpload.HiddenInput />
			<FileUpload.Trigger asChild>
				<Flex
					alignItems="center"
					justifyContent="center"
					cursor={disabled ? 'not-allowed' : 'pointer'}
					borderRadius="md"
					borderWidth={1}
					borderStyle="dashed"
					borderColor="gray.300"
					_hover={disabled ? {} : { borderColor: 'gray.400' }}
					{...(!hasImages && fullDropZoneStyles)}
					{...(hasImages && minifiedDropZoneStyles)}
				>
					<Stack
						alignItems="center"
						justifyContent="center"
						gap={2}
						color="gray.500"
					>
						<FaImage size={26} />
						<Text fontSize={20}>
							{hasImages
								? 'Add images'
								: 'Drop images or click to upload'}
						</Text>
					</Stack>
				</Flex>
			</FileUpload.Trigger>
		</FileUpload.Root>
	);

	if (!hasImages) {
		return fileUploadZone;
	}

	return (
		<Wrap gap={3} alignItems="flex-start">
			{imageEntries.map((entry, i) => (
				<Box
					key={entry.previewUrl}
					position="relative"
					w={THUMBNAIL_WIDTH}
					flexShrink={0}
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
						/>
					</Skeleton>
					<IconButton
						aria-label="Remove image"
						size="xs"
						variant="subtle"
						position="absolute"
						top={2}
						right={2}
						onClick={() => onRemove(i)}
						disabled={disabled || entry.isUploading}
					>
						<FaTrashAlt />
					</IconButton>
				</Box>
			))}
			{fileUploadZone}
		</Wrap>
	);
};
