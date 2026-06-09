import { ItemGrid } from '@client/components/collections/ItemGrid';
import { ShopCard } from '@client/components/itemDisplay/ShopCard';
import { STANDARD_GRID_COLUMNS } from '@client/constants';
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
		renderItem={(shop) => <ShopCard {...shop} />}
	/>
);
