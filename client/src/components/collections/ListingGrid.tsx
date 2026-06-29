import { ItemGrid } from '@client/components/collections/ItemGrid';
import { ListingDisplayCard } from '@client/components/itemDisplay/ListingDisplayCard';
import { STANDARD_GRID_COLUMNS } from '@client/constants';
import { ListingCardData } from '@heirloom/common/contract';

type Props = {
	listings: ListingCardData[];
	isLoading: boolean;
	columns?: Record<string, number>;
	showShopTitle?: boolean;
};

export const ListingGrid = (props: Props) => (
	<ItemGrid
		items={props.listings}
		isLoading={props.isLoading}
		getItemKey={(listing) => listing.id}
		columns={props.columns ?? STANDARD_GRID_COLUMNS}
		renderItem={(listing, isMobile) => (
			<ListingDisplayCard
				{...listing}
				multiImage={!isMobile}
				showShopTitle={props.showShopTitle}
			/>
		)}
	/>
);
