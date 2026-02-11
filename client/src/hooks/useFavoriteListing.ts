import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import useApi from './useApi';

export const useFavoriteListing = () => {
	const { isAuthenticated, loginWithRedirect } = useAuth0();
	const { postResource, deleteResource } = useApi();
	const [isFavoriting, setIsFavoriting] = useState(false);

	const toggleFavorite = async (
		listingShortId: string,
		currentFavoritedState: boolean,
	) => {
		if (!isAuthenticated) {
			sessionStorage.setItem(
				'pendingListingFavorite',
				listingShortId,
			);

			loginWithRedirect({
				appState: { returnTo: '/saved' },
			});
			return;
		}

		setIsFavoriting(true);

		if (currentFavoritedState) {
			await deleteResource(
				`listings/${listingShortId}/favorite`,
			);
		} else {
			await postResource(
				`listings/${listingShortId}/favorite`,
				{},
			);
		}

		setIsFavoriting(false);
	};

	return { toggleFavorite, isFavoriting };
};
