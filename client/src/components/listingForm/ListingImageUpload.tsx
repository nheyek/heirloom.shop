import { Box } from '@chakra-ui/react';
import { ImageDropzone } from '@client/components/input/ImageDropzone';
import { AddFieldButton } from '@client/components/listingForm/AddFieldButton';
import { ImageGrid } from '@client/components/listingForm/imageList/ImageGrid';
import { ImageListProvider } from '@client/components/listingForm/imageList/ImageListContext';
import {
	ImageTile,
	RemoveImageButton,
} from '@client/components/listingForm/imageList/ImageTile';
import {
	STANDARD_THUMBNAIL_GAP,
	STANDARD_THUMBNAIL_WIDTH,
} from '@client/constants';
import { ImageEntry } from '@client/hooks/useImageUpload';
import { LISTING_LIMITS } from '@heirloom/common/constants';

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
}: ListingImageUploadProps) => (
	<ImageListProvider
		list={{
			entries: imageEntries,
			add: onAdd,
			remove: onRemove,
			reorder: onReorder,
			disabled,
		}}
	>
		{imageEntries.length ? (
			<Box>
				<ImageGrid
					gap={STANDARD_THUMBNAIL_GAP}
					mb={3}
				>
					<ImageTile w={STANDARD_THUMBNAIL_WIDTH}>
						<RemoveImageButton />
					</ImageTile>
				</ImageGrid>
				<ImageDropzone
					onAdd={onAdd}
					maxFiles={LISTING_LIMITS.maxImages}
					disabled={disabled}
					trigger={
						<AddFieldButton>Add Images</AddFieldButton>
					}
				/>
			</Box>
		) : (
			<ImageDropzone
				onAdd={onAdd}
				maxFiles={LISTING_LIMITS.maxImages}
				disabled={disabled}
				width="100%"
			/>
		)}
	</ImageListProvider>
);
