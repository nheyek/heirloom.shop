import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import useApi from './useApi';

export const useFavoriteListing = () => {
	const { isAuthenticated, loginWithRedirect } = useAuth0();
	const { postResource, deleteResource } = useApi();
	const [isFavoriting, setIsFavoriting] = useState(false);

	const toggleFavorite = async (listingShortId: string, currentFavoritedState: boolean) => {
		if (!isAuthenticated) {
			// Store listing to favorite in sessionStorage before redirecting
			sessionStorage.setItem('pendingListingFavorite', listingShortId);

			// Redirect to login, will return to /saved page
			loginWithRedirect({
				appState: { returnTo: '/saved' },
			});
			return;
		}

		setIsFavoriting(true);

		if (currentFavoritedState) {
			// Unfavorite
			await deleteResource(`listings/${listingShortId}/save`);
		} else {
			// Favorite
			await postResource(`listings/${listingShortId}/save`, {});
		}

		setIsFavoriting(false);
	};

	return { toggleFavorite, isFavoriting };
};
