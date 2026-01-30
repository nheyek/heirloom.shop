import { useAuth0 } from '@auth0/auth0-react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { ListingCardData } from '@common/types/ListingCardData';
import { useEffect, useState } from 'react';
import { ListingGrid } from '../components/layout/ListingGrid';
import { STANDARD_GRID_GAP } from '../constants';
import useApi from '../hooks/useApi';

export const SavedPage = () => {
	const { isAuthenticated, loginWithRedirect, isLoading: authIsLoading } = useAuth0();
	const { getProtectedResource, postResource } = useApi();

	const [listings, setListings] = useState<ListingCardData[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const loadSavedListings = async () => {
		setIsLoading(true);
		setError(null);

		const response = await getProtectedResource('me/favorited-listings');
		if (response.error) {
			setError('Failed to load saved listings');
		} else {
			setListings(response.data);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		if (authIsLoading) {
			return;
		}

		if (!isAuthenticated) {
			loginWithRedirect({
				appState: { returnTo: '/saved' },
			});
			return;
		}

		const pendingListingShortId = sessionStorage.getItem('pendingListingFavorite');

		if (pendingListingShortId) {
			sessionStorage.removeItem('pendingListingFavorite');

			(async () => {
				try {
					await postResource(`listings/${pendingListingShortId}/favorite`, {});
				} catch (err) {
					console.error('Failed to save listing:', err);
				}
				await loadSavedListings();
			})();
		} else {
			loadSavedListings();
		}
	}, [isAuthenticated, authIsLoading]);

	if (!isAuthenticated) {
		return null;
	}

	return (
		<Box py={8} px={STANDARD_GRID_GAP}>
			<Box mb={6}>
				<Heading size="2xl" mb={2}>
					Saved Listings
				</Heading>
				{!isLoading && listings.length === 0 && !error && (
					<Text fontSize="lg" color="gray.600">
						You haven't saved any listings yet. Click the heart icon on any listing to
						save it.
					</Text>
				)}
				{error && (
					<Text fontSize="lg" color="red.500">
						{error}
					</Text>
				)}
			</Box>

			<ListingGrid listings={listings} isLoading={isLoading} initialSaved={true} />
		</Box>
	);
};
