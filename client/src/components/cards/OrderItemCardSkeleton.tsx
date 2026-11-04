import { Skeleton, Stack } from '@chakra-ui/react';
import { LISTING_IMAGE_ASPECT_RATIO } from '@client/constants';

export const OrderItemCardSkeleton = () => (
	<Stack
		gap={0}
		width="100%"
	>
		<Skeleton
			aspectRatio={LISTING_IMAGE_ASPECT_RATIO}
			borderBottomRadius={0}
		/>
		<Skeleton
			height={155}
			borderTopRadius={0}
		/>
	</Stack>
);
