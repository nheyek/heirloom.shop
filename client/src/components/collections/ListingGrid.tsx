import { ItemGrid } from '@client/components/collections/ItemGrid';
import { ListingCard } from '@client/components/itemDisplay/ListingCard';
import { STANDARD_GRID_COLUMNS } from '@client/constants';
import { ListingCardData } from '@common/contract';

type Props = {
	listings: ListingCardData[];
	isLoading: boolean;
	columns?: Record<string, number>;
};

export const ListingGrid = (props: Props) => (
	<ItemGrid
		items={props.listings}
		isLoading={props.isLoading}
		getItemKey={(listing) => listing.id}
		columns={props.columns ?? STANDARD_GRID_COLUMNS}
		renderItem={(listing, isMobile) => (
			<ListingCard
				{...listing}
				multiImage={!isMobile}
			/>
		)}
	/>
);
