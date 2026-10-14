import { Box, Text } from '@chakra-ui/react';
import { FormField } from '@client/components/input/FormField';
import { ListingImageUpload } from '@client/components/listingForm/ListingImageUpload';
import { ListingFormState } from '@client/components/listingForm/useListingForm';
import { InfoPopover } from '@client/components/misc/InfoPopover';
import {
	STANDARD_THUMBNAIL_GAP,
	STANDARD_THUMBNAIL_WIDTH,
} from '@client/constants';
import { chakraSpacingUnit } from '@client/theme';
import { hasVariationImages } from '@heirloom/common/domain/listing';

const IMAGES_W =
	3 * STANDARD_THUMBNAIL_WIDTH +
	2 * (chakraSpacingUnit * STANDARD_THUMBNAIL_GAP);

type Props = {
	form: ListingFormState;
	disabled?: boolean;
};

export const ImagesField = ({ form, disabled }: Props) => (
	<FormField
		label={
			<>
				{hasVariationImages(form.variationImages)
					? 'Universal Images'
					: 'Images'}
				<InfoPopover>
					<Text fontSize={16}>
						These images are shown for every variant of
						this listing. Configure variant-specific
						images in the above field.
					</Text>
				</InfoPopover>
			</>
		}
		error={form.imageError}
	>
		<Box w={{ base: '100%', md: IMAGES_W }}>
			<ListingImageUpload
				imageEntries={form.imageEntries}
				onAdd={form.addImageFiles}
				onRemove={form.removeImage}
				onReorder={form.reorderImageEntries}
				disabled={disabled}
			/>
		</Box>
	</FormField>
);
