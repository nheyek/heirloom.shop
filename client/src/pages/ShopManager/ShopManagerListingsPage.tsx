import { Button, Stack } from '@chakra-ui/react';
import { ListingEditCard } from '@client/components/cards/ListingEditCard';
import { ItemGrid } from '@client/components/collections/ItemGrid';
import { AppError } from '@client/components/feedback/AppError';
import {
	CLIENT_ROUTES,
	LISTING_CARD_SKELETON_ASPECT_RATIO,
} from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { useMinDuration } from '@client/hooks/useMinDuration';
import { sidebarGridCols } from '@client/theme';
import { callApi } from '@client/utils/apiUtils';
import { ShopManagerListingCardData } from '@heirloom/common/contract';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';

export const ShopManagerListingsPage = () => {
	const { shortId } = useParams<{ shortId: string }>();
	const apiClient = useApiClient();
	const navigate = useNavigate();

	const [listings, setListings] = useState<
		ShopManagerListingCardData[]
	>([]);
	const [dataLoading, setDataLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const isLoading = useMinDuration(dataLoading);

	useEffect(() => {
		if (!shortId) return;

		setDataLoading(true);
		setError(null);

		callApi(
			apiClient.shopManager.getListings({
				params: { shopId: shortId },
			}),
		).then((result) => {
			if (result.error !== null) {
				setError(result.error);
			} else {
				setListings(result.data);
			}
			setDataLoading(false);
		});
	}, [shortId]);

	if (error) {
		return (
			<AppError
				title="Failed to load listings"
				content={error}
			/>
		);
	}

	return (
		<>
			<Stack gap={5}>
				<Button
					size="lg"
					onClick={() =>
						navigate(
							`/${CLIENT_ROUTES.shop}/${shortId}/${CLIENT_ROUTES.manage}/${CLIENT_ROUTES.listings}/${CLIENT_ROUTES.new}`,
						)
					}
				>
					<FaPlus />
					New Listing
				</Button>
				<ItemGrid
					items={listings}
					isLoading={isLoading}
					getItemKey={(listing) => listing.id}
					columns={sidebarGridCols}
					skeletonAspectRatio={
						LISTING_CARD_SKELETON_ASPECT_RATIO
					}
					renderItem={(listing) => (
						<ListingEditCard
							{...listing}
							onEdit={() =>
								navigate(
									`/${CLIENT_ROUTES.shop}/${shortId}/${CLIENT_ROUTES.manage}/${CLIENT_ROUTES.listings}/${listing.shortId}`,
								)
							}
						/>
					)}
				/>
			</Stack>
		</>
	);
};
