import { useAuth0 } from '@auth0/auth0-react';
import { API_ROUTES } from '@common/constants';
import { ListingCardData } from '@common/types/ListingCardData';
import React, { useContext, useEffect, useState } from 'react';
import useApi from '../hooks/useApi';

type FavoritesContextType = {
	favoriteIds: Set<string>;
	toggleFavorite: (shortId: string) => Promise<void>;
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

	const toggleFavorite = async (shortId: string) => {
		if (!isAuthenticated) {
			loginWithRedirect();
			return;
		}

		const wasFavorited = favoriteIds.has(shortId);

		setFavoriteIds((prevFavorites) => {
			const next = new Set(prevFavorites);
			if (wasFavorited) {
				next.delete(shortId);
			} else {
				next.add(shortId);
			}
			return next;
		});

		const endpoint = `${API_ROUTES.listings.base}/${shortId}/${API_ROUTES.listings.favorite}`;
		const res = wasFavorited
			? await deleteResource(endpoint)
			: await postResource(endpoint, {});

		if (res.error) {
			setFavoriteIds((prev) => {
				const reverted = new Set(prev);
				if (wasFavorited) {
					reverted.add(shortId);
				} else {
					reverted.delete(shortId);
				}
				return reverted;
			});
		}
	};

	return (
		<FavoritesContext.Provider
			value={{
				favoriteIds,
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
