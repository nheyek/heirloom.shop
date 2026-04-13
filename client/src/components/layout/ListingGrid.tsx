import { ListingCard } from '@client/components/itemDisplay/ListingCard';
import { ItemGrid } from '@client/components/layout/ItemGrid';
import { ListingCardData } from '@common/contract';

type Props = {
	listings: ListingCardData[];
	isLoading: boolean;
};

export const ListingGrid = (props: Props) => (
	<ItemGrid
		items={props.listings}
		isLoading={props.isLoading}
		getItemKey={(listing) => listing.id}
		renderItem={(listing, isMobile) => (
			<ListingCard {...listing} multiImage={!isMobile} />
		)}
	/>
);
