import {
	Box,
	FileUpload,
	Flex,
	IconButton,
	Image,
	Stack,
	Text,
	Wrap,
} from '@chakra-ui/react';
import {
	MAX_IMAGE_SIZE_MB,
	STANDARD_IMAGE_ASPECT_RATIO,
} from '@client/constants';
import { toastError } from '@client/toaster';
import { useMemo } from 'react';
import { FaImage, FaTrashAlt } from 'react-icons/fa';

const THUMBNAIL_WIDTH = 200;

type ListingImageUploadProps = {
	imageFiles: File[];
	onAdd: (files: File[]) => void;
	onRemove: (index: number) => void;
	disabled?: boolean;
};

const fullDropZoneStyles = {
	height: 200,
	width: '100%',
};

const minifiedDropZoneStyles = {
	aspectRatio: STANDARD_IMAGE_ASPECT_RATIO,
	width: THUMBNAIL_WIDTH,
};

export const ListingImageUpload = ({
	imageFiles,
	onAdd,
	onRemove,
	disabled,
}: ListingImageUploadProps) => {
	const previewUrls = useMemo(
		() => imageFiles.map((f) => URL.createObjectURL(f)),
		[imageFiles],
	);

	const fileUploadZone = (
		<FileUpload.Root
			accept="image/*"
			maxFiles={20}
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
			{...(imageFiles.length > 0 && { width: 'auto' })}
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
					_hover={
						disabled ? {} : { borderColor: 'gray.400' }
					}
					{...(imageFiles.length === 0 &&
						fullDropZoneStyles)}
					{...(imageFiles.length > 0 &&
						minifiedDropZoneStyles)}
				>
					<Stack
						alignItems="center"
						justifyContent="center"
						gap={2}
						color="gray.500"
					>
						<FaImage size={26} />
						<Text fontSize={20}>
							{imageFiles.length > 0
								? 'Add images'
								: 'Drop images or click to upload'}
						</Text>
					</Stack>
				</Flex>
			</FileUpload.Trigger>
		</FileUpload.Root>
	);

	if (imageFiles.length === 0) {
		return fileUploadZone;
	}

	return (
		<Wrap
			gap={3}
			alignItems="flex-start"
		>
			{previewUrls.map((url, i) => (
				<Box
					key={url}
					position="relative"
					w={THUMBNAIL_WIDTH}
					flexShrink={0}
				>
					<Image
						src={url}
						w="100%"
						aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
						objectFit="cover"
						borderRadius="md"
						display="block"
					/>
					<IconButton
						aria-label="Remove image"
						size="xs"
						variant="subtle"
						position="absolute"
						top={2}
						right={2}
						onClick={() => onRemove(i)}
						disabled={disabled}
					>
						<FaTrashAlt />
					</IconButton>
				</Box>
			))}
			{fileUploadZone}
		</Wrap>
	);
};
