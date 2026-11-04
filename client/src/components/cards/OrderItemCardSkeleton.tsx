import { CardSkeleton } from '@client/components/cards/CardSkeleton';
import {
	LISTING_IMAGE_ASPECT_RATIO,
	ORDER_ITEM_CARD_BODY_HEIGHT,
} from '@client/constants';

export const OrderItemCardSkeleton = () => (
	<CardSkeleton
		aspectRatio={LISTING_IMAGE_ASPECT_RATIO}
		bodyHeight={ORDER_ITEM_CARD_BODY_HEIGHT}
	/>
);
