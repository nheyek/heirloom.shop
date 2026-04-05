import { useAuth0 } from '@auth0/auth0-react';
import { Heading, Stack, Text } from '@chakra-ui/react';
import { ListingCardData } from '@common/types/ListingCardData';
import { useEffect, useState } from 'react';
import { AppError } from '../components/feedback/AppError';
import { ListingGrid } from '../components/layout/ListingGrid';
import { CLIENT_ROUTES } from '../constants';
import { useApiClient } from '../hooks/useApiClient';
import { callApi } from '../utils/apiUtils';

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
		<Stack
			p={5}
			gap={4}
		>
			<Heading fontSize={32}>Favorite Listings</Heading>
			{!isLoading && listings.length === 0 && (
				<Text fontSize={18}>
					You haven't favorited any listings yet. Click the
					heart icon on any listing to favorite it.
				</Text>
			)}

			<ListingGrid
				listings={listings}
				isLoading={isLoading}
			/>
		</Stack>
	);
};
