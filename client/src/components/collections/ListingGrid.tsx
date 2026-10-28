import { ListingDisplayCard } from '@client/components/cards/ListingDisplayCard';
import { ItemGrid } from '@client/components/collections/ItemGrid';
import {
	CLIENT_ROUTES,
	LISTING_CARD_SKELETON_ASPECT_RATIO,
	STANDARD_GRID_COLUMNS,
} from '@client/constants';
import { ListingCardData } from '@heirloom/common/contract';
import { useNavigate } from 'react-router-dom';

type Props = {
	listings: ListingCardData[];
	isLoading: boolean;
	columns?: Record<string, number>;
	includeShopTitle?: boolean;
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
			skeletonAspectRatio={LISTING_CARD_SKELETON_ASPECT_RATIO}
			renderItem={(listing, isMobile) => (
				<ListingDisplayCard
					{...listing}
					showShopTitle={props.includeShopTitle}
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
