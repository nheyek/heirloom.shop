import { useAuth0 } from '@auth0/auth0-react';
import { Heading, Stack, Text } from '@chakra-ui/react';
import { API_ROUTES } from '@common/constants';
import { ListingCardData } from '@common/types/ListingCardData';
import { useEffect, useState } from 'react';
import { AppError } from '../components/feedback/AppError';
import { ListingGrid } from '../components/layout/ListingGrid';
import { CLIENT_ROUTES } from '../constants';
import useApi from '../hooks/useApi';

export const SavedPage = () => {
	const {
		isAuthenticated,
		loginWithRedirect,
		isLoading: authIsLoading,
	} = useAuth0();
	const { getProtectedResource, postResource } = useApi();

	const [listings, setListings] = useState<ListingCardData[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const loadSavedListings = async () => {
		setIsLoading(true);
		setError(null);

		setTimeout(async () => {
			const response = await getProtectedResource(
				`${API_ROUTES.currentUser.base}/${API_ROUTES.currentUser.favorites}`,
			);
			if (response.error) {
				setError('Failed to load favorites');
			} else {
				setListings(response.data);
			}
			setIsLoading(false);
		}, 500);
	};

	useEffect(() => {
		if (authIsLoading) {
			return;
		}

		if (!isAuthenticated) {
			loginWithRedirect({
				appState: { returnTo: CLIENT_ROUTES.favorites },
			});
			return;
		}

		const pendingListingShortId = sessionStorage.getItem(
			'pendingListingFavorite',
		);

		if (pendingListingShortId) {
			sessionStorage.removeItem('pendingListingFavorite');

			(async () => {
				try {
					await postResource(
						`listings/${pendingListingShortId}/favorite`,
						{},
					);
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

	if (error) {
		return <AppError title={error} />;
	}

	return (
		<Stack
			p={5}
			gap={4}
		>
			<Heading fontSize={32}>Favorite Listings</Heading>
			{!isLoading && !error && listings.length === 0 && (
				<Text fontSize={18}>
					You haven't favorited any listings yet. Click the
					heart icon on any listing to save it.
				</Text>
			)}

			<ListingGrid
				listings={listings}
				isLoading={isLoading}
				initialSaved={true}
			/>
		</Stack>
	);
};
