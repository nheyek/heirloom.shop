import { useAuth0 } from '@auth0/auth0-react';
import { API_ROUTES } from '@common/constants';
import { useState } from 'react';
import { CLIENT_ROUTES } from '../constants';
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
				appState: { returnTo: CLIENT_ROUTES.favorites },
			});
			return;
		}

		setIsFavoriting(true);

		if (currentFavoritedState) {
			await deleteResource(
				`${API_ROUTES.listings.base}/${listingShortId}/${API_ROUTES.listings.favorite}`,
			);
		} else {
			await postResource(
				`${API_ROUTES.listings.base}/${listingShortId}/${API_ROUTES.listings.favorite}`,
				{},
			);
		}

		setIsFavoriting(false);
	};

	return { toggleFavorite, isFavoriting };
};
