import { useAuth0 } from '@auth0/auth0-react';
import { Stack, Text } from '@chakra-ui/react';
import { ListingGrid } from '@client/components/collections/ListingGrid';
import { AppError } from '@client/components/feedback/AppError';
import { CLIENT_ROUTES, STANDARD_GRID_COLUMNS_SIDEBAR } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { callApi } from '@client/utils/apiUtils';
import { ListingCardData } from '@common/contract';
import { useEffect, useState } from 'react';

export const FavoritesPage = () => {
	const {
		isAuthenticated,
		loginWithRedirect,
		isLoading: authIsLoading,
	} = useAuth0();
	const apiClient = useApiClient();

	const [listings, setListings] = useState<ListingCardData[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const loadSavedListings = async () => {
		setIsLoading(true);
		setError(null);

		setTimeout(async () => {
			const result = await callApi(apiClient.me.getFavorites());
			if (result.error !== null) {
				setError('Failed to load favorites');
			} else {
				setListings(result.data);
			}
			setIsLoading(false);
		}, 500);
	};

	useEffect(() => {
		if (!authIsLoading && !isAuthenticated) {
			loginWithRedirect({
				appState: { returnTo: `/${CLIENT_ROUTES.favorites}` },
			});
			return;
		}

		loadSavedListings();
	}, [authIsLoading]);

	if (error) {
		return <AppError title={error} />;
	}

	return (
		<Stack gap={4}>
			{!isLoading && listings.length === 0 && (
				<Text fontSize={18}>
					You haven't favorited any listings yet. Click the
					heart icon on any listing to favorite it.
				</Text>
			)}

			<ListingGrid
				listings={listings}
				isLoading={isLoading}
				columns={STANDARD_GRID_COLUMNS_SIDEBAR}
			/>
		</Stack>
	);
};
