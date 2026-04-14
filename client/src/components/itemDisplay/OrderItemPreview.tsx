import { Box, Card } from '@chakra-ui/react';
import { MultiImage } from '@client/components/imageDisplay/MultiImage';
import { STANDARD_IMAGE_ASPECT_RATIO } from '@client/constants';
import { OrderItemDisplayData } from '@common/contract';

type Props = {
	item: OrderItemDisplayData;
	width: number;
};

export const OrderItemPreview = (props: Props) => {
	const imageUrl = props.item.imageUuid
		? `${process.env.LISTING_IMAGES_URL}/${props.item.imageUuid}.jpg`
		: undefined;

	return (
		<Card.Root
			variant="elevated"
			width={props.width}
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
