import { Box, FileUpload, Image } from '@chakra-ui/react';
import { LISTING_IMAGE_ASPECT_RATIO } from '@client/constants';
import { listingImageUrl } from '@client/utils/imageUtils';
import { useState } from 'react';
import { FaImage } from 'react-icons/fa';

const THUMB_WIDTH = 100;
const DIMMED_OPACITY = 0.5;
const PLACEHOLDER_ICON_SIZE = 20;

type Props = {
	imageUuid: string | null;
	isInherited?: boolean;
	disabled?: boolean;
	shopShortId: string;
	uploadImage: (file: File) => Promise<string | null>;
	onUpload: (uuid: string) => void;
};

export const ImageUploadCell = ({
	imageUuid,
	isInherited,
	disabled,
	shopShortId,
	uploadImage,
	onUpload,
}: Props) => {
	const [isUploading, setIsUploading] = useState(false);
	const isDimmed = isUploading || !!isInherited;

	return (
		<FileUpload.Root
			accept="image/*"
			maxFiles={1}
			disabled={disabled}
			onFileChange={async (details) => {
				const file = details.acceptedFiles[0];
				if (!file) return;
				setIsUploading(true);
				const uuid = await uploadImage(file);
				setIsUploading(false);
				if (uuid) onUpload(uuid);
			}}
			pr={2}
		>
			<FileUpload.HiddenInput />
			<FileUpload.Trigger asChild>
				<Box
					as="button"
					width={THUMB_WIDTH}
					aspectRatio={LISTING_IMAGE_ASPECT_RATIO}
					overflow="hidden"
					cursor="pointer"
					flexShrink={0}
					display="flex"
					alignItems="center"
					justifyContent="center"
					bg="gray.50"
				>
					{imageUuid ? (
						<Image
							src={listingImageUrl(
								shopShortId,
								imageUuid,
							)}
							width="100%"
							aspectRatio={LISTING_IMAGE_ASPECT_RATIO}
							display="block"
							objectFit="cover"
							opacity={isDimmed ? DIMMED_OPACITY : 1}
						/>
					) : (
						<FaImage
							color="gray"
							size={PLACEHOLDER_ICON_SIZE}
							opacity={isUploading ? DIMMED_OPACITY : 1}
						/>
					)}
				</Box>
			</FileUpload.Trigger>
		</FileUpload.Root>
	);
};
