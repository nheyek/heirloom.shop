import { IconButton, IconButtonProps } from '@chakra-ui/react';
import { ImageDropzone } from '@client/components/input/ImageDropzone';
import { useImageList } from '@client/components/listingForm/imageList/ImageListContext';
import { LISTING_LIMITS } from '@heirloom/common/constants';
import { FaImages } from 'react-icons/fa6';

export const AddImagesButton = ({
	children = <FaImages />,
	...buttonProps
}: IconButtonProps) => {
	const { add, disabled } = useImageList();

	return (
		<ImageDropzone
			onAdd={add}
			maxFiles={LISTING_LIMITS.maxImages}
			disabled={disabled}
			trigger={
				<IconButton
					variant="ghost"
					color="fg.muted"
					{...buttonProps}
				>
					{children}
				</IconButton>
			}
		/>
	);
};
