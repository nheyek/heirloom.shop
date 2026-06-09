import { useAuth0 } from '@auth0/auth0-react';
import { HStack, Span, Stack, Text } from '@chakra-ui/react';
import { ListingGrid } from '@client/components/collections/ListingGrid';
import { ShopGrid } from '@client/components/collections/ShopGrid';
import { AppError } from '@client/components/feedback/AppError';
import { CLIENT_ROUTES } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { FONT_DECORATIVE, sidebarBreakpoint } from '@client/theme';
import { callApi } from '@client/utils/apiUtils';
import {
	ListingCardData,
	ShopCardData,
} from '@heirloom/common/contract';
import { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';

export const FavoritesPage = () => {
	const {
		isAuthenticated,
		loginWithRedirect,
		isLoading: authIsLoading,
	} = useAuth0();
	const apiClient = useApiClient();

	const [listings, setListings] = useState<ListingCardData[]>([]);
	const [shops, setShops] = useState<ShopCardData[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const loadFavorites = async () => {
		setIsLoading(true);
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
		setIsLoading(false);
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

	const gridColumns = {
		base: 1,
		[sidebarBreakpoint.sm]: 2,
		[sidebarBreakpoint.md]: 3,
		[sidebarBreakpoint.xl]: 4,
	};

	const isEmpty =
		!isLoading && listings.length === 0 && shops.length === 0;

	return (
		<Stack gap={6}>
			{isEmpty && (
				<Stack gap={1}>
					<Text fontSize={22}>
						You haven't favorited anything yet.
					</Text>
					<HStack
						fontSize={20}
						gap={1.5}
					>
						<Span>Click</Span>
						<FaHeart />
						<Span>
							on any listing or shop to favorite it.
						</Span>
					</HStack>
				</Stack>
			)}

			{(isLoading || shops.length > 0) && (
				<Stack gap={2}>
					<GridTitle title="Makers" />
					<ShopGrid
						shops={shops}
						isLoading={isLoading}
						columns={gridColumns}
					/>
				</Stack>
			)}

			{(isLoading || listings.length > 0) && (
				<Stack gap={2}>
					<GridTitle title="Listings" />
					<ListingGrid
						listings={listings}
						isLoading={isLoading}
						columns={gridColumns}
					/>
				</Stack>
			)}
		</Stack>
	);
};

const GridTitle = ({ title }: { title: string }) => (
	<Text
		fontSize={28}
		fontWeight={500}
		fontFamily={FONT_DECORATIVE}
	>
		{title}
	</Text>
);
