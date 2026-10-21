import { ShopCard } from '@client/components/cards/ShopCard';
import { ItemGrid } from '@client/components/collections/ItemGrid';
import {
	SHOP_CARD_SKELETON_ASPECT_RATIO,
	STANDARD_GRID_COLUMNS,
} from '@client/constants';
import { ShopCardData } from '@heirloom/common/contract';

type Props = {
	shops: ShopCardData[];
	isLoading: boolean;
	columns?: Record<string, number>;
};

export const ShopGrid = (props: Props) => (
	<ItemGrid
		items={props.shops}
		isLoading={props.isLoading}
		getItemKey={(shop) => shop.id}
		columns={props.columns ?? STANDARD_GRID_COLUMNS}
		skeletonAspectRatio={SHOP_CARD_SKELETON_ASPECT_RATIO}
		renderItem={(shop) => <ShopCard {...shop} />}
	/>
);
