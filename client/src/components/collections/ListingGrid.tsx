import { ItemGrid } from '@client/components/collections/ItemGrid';
import { ListingDisplayCard } from '@client/components/cards/ListingDisplayCard';
import {
	CLIENT_ROUTES,
	STANDARD_GRID_COLUMNS,
} from '@client/constants';
import { ListingCardData } from '@heirloom/common/contract';
import { useNavigate } from 'react-router-dom';

type Props = {
	listings: ListingCardData[];
	isLoading: boolean;
	columns?: Record<string, number>;
	showShopTitle?: boolean;
};

export const ListingGrid = (props: Props) => {
	const navigate = useNavigate();
	const goToListing = (shortId: string) =>
		navigate(`/${CLIENT_ROUTES.listing}/${shortId}`);

	return (
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
					{...(isMobile
						? {
								onCardBodyClick: () =>
									goToListing(listing.shortId),
							}
						: {
								onImageClick: () =>
									goToListing(listing.shortId),
							})}
				/>
			)}
		/>
	);
};
