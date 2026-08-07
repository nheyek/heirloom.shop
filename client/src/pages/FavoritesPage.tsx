import { useAuth0 } from '@auth0/auth0-react';
import { Tabs, Text } from '@chakra-ui/react';
import { ListingGrid } from '@client/components/collections/ListingGrid';
import { ShopGrid } from '@client/components/collections/ShopGrid';
import { AppError } from '@client/components/feedback/AppError';
import { CLIENT_ROUTES } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { useMinDuration } from '@client/hooks/useMinDuration';
import { sidebarGridCols } from '@client/theme';
import { callApi } from '@client/utils/apiUtils';
import {
	ListingCardData,
	ShopCardData,
} from '@heirloom/common/contract';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const FavoritesPage = () => {
	const {
		isAuthenticated,
		loginWithRedirect,
		isLoading: authIsLoading,
	} = useAuth0();
	const apiClient = useApiClient();
	const navigate = useNavigate();
	const { tab } = useParams<{ tab: string }>();
	const activeTab =
		tab === CLIENT_ROUTES.shops
			? CLIENT_ROUTES.shops
			: CLIENT_ROUTES.listings;

	const [listings, setListings] = useState<ListingCardData[]>([]);
	const [shops, setShops] = useState<ShopCardData[]>([]);
	const [dataLoading, setDataLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const isLoading = useMinDuration(dataLoading);

	const loadFavorites = async () => {
		setDataLoading(true);
		setError(null);

		const [listingsResult, shopsResult] = await Promise.all([
			callApi(apiClient.me.getFavorites()),
			callApi(apiClient.me.getFavoriteShops()),
		]);

		if (
			listingsResult.error !== null ||
			shopsResult.error !== null
		) {
			setError('Failed to load favorites');
		} else {
			setListings(listingsResult.data);
			setShops(shopsResult.data);
		}
		setDataLoading(false);
	};

	useEffect(() => {
		if (!authIsLoading && !isAuthenticated) {
			loginWithRedirect({
				appState: { returnTo: `/${CLIENT_ROUTES.favorites}` },
			});
			return;
		}

		loadFavorites();
	}, [authIsLoading]);

	if (error) {
		return <AppError title={error} />;
	}

	const gridColumns = sidebarGridCols;

	return (
		<Tabs.Root
			value={activeTab}
			onValueChange={({ value }) =>
				navigate(`/${CLIENT_ROUTES.favorites}/${value}`)
			}
			variant="subtle"
			size="lg"
		>
			<Tabs.List>
				<Tabs.Trigger
					value={CLIENT_ROUTES.listings}
					fontSize={20}
				>
					Listings
				</Tabs.Trigger>
				<Tabs.Trigger
					value={CLIENT_ROUTES.shops}
					fontSize={20}
				>
					Shops
				</Tabs.Trigger>
			</Tabs.List>

			<Tabs.Content value={CLIENT_ROUTES.shops}>
				{!isLoading && shops.length === 0 ? (
					<Text fontSize={20}>
						You haven't favorited any shops yet.
					</Text>
				) : (
					<ShopGrid
						shops={shops}
						isLoading={isLoading}
						columns={gridColumns}
					/>
				)}
			</Tabs.Content>

			<Tabs.Content value={CLIENT_ROUTES.listings}>
				{!isLoading && listings.length === 0 ? (
					<Text fontSize={20}>
						You haven't favorited any listings yet.
					</Text>
				) : (
					<ListingGrid
						listings={listings}
						isLoading={isLoading}
						columns={gridColumns}
						showShopTitle
					/>
				)}
			</Tabs.Content>
		</Tabs.Root>
	);
};
