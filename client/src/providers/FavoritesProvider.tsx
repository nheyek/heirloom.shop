import { useAuth0 } from '@auth0/auth0-react';
import { API_ROUTES } from '@common/constants';
import { ListingCardData } from '@common/types/ListingCardData';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ROUTES } from '../constants';
import useApi from '../hooks/useApi';
import { toaster } from '../toaster';

type FavoritesContextType = {
	favoriteIds: Set<string>;
	isFavorited: (shortId: string) => boolean;
	toggleFavorite: (listing: ListingCardData) => Promise<void>;
	isLoading: boolean;
	error: string | null;
};

const FavoritesContext = React.createContext<
	FavoritesContextType | undefined
>(undefined);

export const FavoritesProvider = (props: {
	children: React.ReactNode;
}) => {
	const [favoriteIds, setFavoriteIds] = useState<Set<string>>(
		new Set(),
	);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const { isAuthenticated, loginWithRedirect } = useAuth0();
	const { getProtectedResource, postResource, deleteResource } =
		useApi();
	const navigate = useNavigate();

	const loadFavorites = async () => {
		setIsLoading(true);
		setError(null);

		const res = await getProtectedResource(
			`${API_ROUTES.currentUser.base}/${API_ROUTES.currentUser.favorites}`,
		);

		if (res.error) {
			setError('Failed to fetch favorites');
		} else {
			setFavoriteIds(
				new Set<string>(
					res.data.map(
						(listing: ListingCardData) => listing.shortId,
					),
				),
			);
		}

		setIsLoading(false);
	};

	useEffect(() => {
		if (isAuthenticated) {
			loadFavorites();
		} else {
			setFavoriteIds(new Set());
		}
	}, [isAuthenticated]);

	const isFavorited = (shortId: string) => favoriteIds.has(shortId);

	const toggleFavorite = async (listing: ListingCardData) => {
		if (!isAuthenticated) {
			loginWithRedirect({
				appState: { returnTo: `/${CLIENT_ROUTES.favorites}` },
			});
			return;
		}

		const wasFavorited = favoriteIds.has(listing.shortId);

		setFavoriteIds((prevFavorites) => {
			const newFavorites = new Set(prevFavorites);
			if (wasFavorited) {
				newFavorites.delete(listing.shortId);
			} else {
				newFavorites.add(listing.shortId);
			}
			return newFavorites;
		});

		const endpoint = `${API_ROUTES.listings.base}/${listing.shortId}/${API_ROUTES.listings.favorite}`;
		const res = wasFavorited
			? await deleteResource(endpoint)
			: await postResource(endpoint, {});

		if (res.error) {
			setFavoriteIds((prev) => {
				const reverted = new Set(prev);
				if (wasFavorited) {
					reverted.add(listing.shortId);
				} else {
					reverted.delete(listing.shortId);
				}
				return reverted;
			});
		} else {
			toaster.create({
				title: wasFavorited
					? 'removed from favorites'
					: 'favorited',
				description: listing.title.toLowerCase(),
				type: 'success',
				action: wasFavorited
					? undefined
					: {
							label: 'view',
							onClick: () =>
								navigate(CLIENT_ROUTES.favorites),
						},
			});
		}
	};

	return (
		<FavoritesContext.Provider
			value={{
				favoriteIds,
				isFavorited,
				toggleFavorite,
				isLoading,
				error,
			}}
		>
			{props.children}
		</FavoritesContext.Provider>
	);
};

export const useFavorites = () => {
	const ctx = useContext(FavoritesContext);
	if (!ctx) {
		throw new Error(
			'useFavorites must be used within a FavoritesProvider',
		);
	}
	return ctx;
};
