import { Button, Stack } from '@chakra-ui/react';
import { ItemGrid } from '@client/components/collections/ItemGrid';
import { AppError } from '@client/components/feedback/AppError';
import { ListingEditCard } from '@client/components/itemDisplay/ListingEditCard';
import { CLIENT_ROUTES } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { SIDEBAR_GRID_COLUMNS } from '@client/theme';
import { callApi } from '@client/utils/apiUtils';
import { ListingCardData } from '@heirloom/common/contract';
import { useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

export const ShopManagerListingsPage = () => {
	const { shortId } = useParams<{ shortId: string }>();
	const apiClient = useApiClient();
	const navigate = useNavigate();

	const [listings, setListings] = useState<ListingCardData[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!shortId) return;

		setIsLoading(true);
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
			setIsLoading(false);
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
					size="md"
					onClick={() =>
						navigate(
							`/${CLIENT_ROUTES.shop}/${shortId}/${CLIENT_ROUTES.manage}/${CLIENT_ROUTES.listings}/${CLIENT_ROUTES.new}`,
						)
					}
					width={170}
					fontSize={20}
				>
					<FaPlusCircle />
					Create Listing
				</Button>
				<ItemGrid
					items={listings}
					isLoading={isLoading}
					getItemKey={(listing) => listing.id}
					columns={SIDEBAR_GRID_COLUMNS}
					renderItem={(listing, isMobile) => (
						<ListingEditCard
							{...listing}
							multiImage={!isMobile}
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
