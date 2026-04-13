import { ShopCard } from '@client/components/itemDisplay/ShopCard';
import { ItemGrid } from '@client/components/layout/ItemGrid';
import { ShopCardData } from '@common/contract';

type Props = {
	isLoading: boolean;
	shops: ShopCardData[];
	numPlaceholders?: number;
};

export const ShopGrid = (props: Props) => (
	<ItemGrid
		items={props.shops}
		isLoading={props.isLoading}
		getItemKey={(shop) => shop.id}
		numPlaceholders={props.numPlaceholders}
		renderItem={(shop, isMobile) => (
			<ShopCard
				{...shop}
				minWidth={isMobile ? 300 : undefined}
			/>
		)}
	/>
);
