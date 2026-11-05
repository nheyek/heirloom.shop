import { ReactNode } from 'react';
import { ShopCard } from '@client/components/cards/ShopCard';
import { ItemGrid } from '@client/components/collections/ItemGrid';
import {
	SHOP_CARD_BODY_HEIGHT,
	STANDARD_IMAGE_ASPECT_RATIO,
	CARD_GRID_COLUMNS,
} from '@client/constants';
import { ShopCardData } from '@heirloom/common/contract';

type Props = {
	shops: ShopCardData[];
	isLoading: boolean;
	columns?: Record<string, number>;
	center?: boolean;
	header?: ReactNode;
};

export const ShopGrid = (props: Props) => (
	<ItemGrid
		items={props.shops}
		isLoading={props.isLoading}
		getItemKey={(shop) => shop.id}
		columns={props.columns ?? CARD_GRID_COLUMNS}
		center={props.center}
		header={props.header}
		skeletonAspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
		skeletonBodyHeight={SHOP_CARD_BODY_HEIGHT}
		renderItem={(shop) => <ShopCard {...shop} />}
	/>
);
