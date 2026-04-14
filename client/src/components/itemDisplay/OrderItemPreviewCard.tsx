import { Box, Card } from '@chakra-ui/react';
import { MultiImage } from '@client/components/imageDisplay/MultiImage';
import { STANDARD_IMAGE_ASPECT_RATIO } from '@client/constants';
import { OrderItemDisplayData } from '@common/contract';

type Props = {
	item: OrderItemDisplayData;
};

export const OrderItemPreviewCard = ({ item }: Props) => {
	const imageUrl = item.imageUuid
		? `${process.env.LISTING_IMAGES_URL}/${item.imageUuid}.jpg`
		: undefined;

	return (
		<Card.Root
			variant="elevated"
			width={200}
			flexShrink={0}
		>
			<Box>
				<MultiImage
					aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
					urls={imageUrl ? [imageUrl] : []}
				/>
			</Box>
		</Card.Root>
	);
};
