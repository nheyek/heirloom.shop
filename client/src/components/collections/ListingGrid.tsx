import { ListingDisplayCard } from '@client/components/cards/ListingDisplayCard';
import { ItemGrid } from '@client/components/collections/ItemGrid';
import {
	CLIENT_ROUTES,
	LISTING_CARD_SKELETON_ASPECT_RATIO,
	LISTING_GRID_PAGE_SIZE,
	STANDARD_GRID_COLUMNS,
} from '@client/constants';
import { indexShopTitles } from '@client/utils/shopUtils';
import {
	ListingCardData,
	ShopCardData,
} from '@heirloom/common/contract';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
	listings: ListingCardData[];
	isLoading: boolean;
	columns?: Record<string, number>;
	shops?: ShopCardData[];
};

export const ListingGrid = (props: Props) => {
	const navigate = useNavigate();
	const goToListing = (shortId: string) =>
		navigate(`/${CLIENT_ROUTES.listing}/${shortId}`);
	const shopTitles = useMemo(
		() => indexShopTitles(props.shops),
		[props.shops],
	);

	return (
		<ItemGrid
			items={props.listings}
			isLoading={props.isLoading}
			getItemKey={(listing) => listing.id}
			columns={props.columns ?? STANDARD_GRID_COLUMNS}
			skeletonAspectRatio={LISTING_CARD_SKELETON_ASPECT_RATIO}
			pageSize={LISTING_GRID_PAGE_SIZE}
			renderItem={(listing, isMobile) => (
				<ListingDisplayCard
					{...listing}
					{...(props.shops && {
						shopTitle: shopTitles.get(
							listing.shopShortId,
						),
					})}
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
