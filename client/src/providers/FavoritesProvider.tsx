import { useAuth0 } from '@auth0/auth0-react';
import { CLIENT_ROUTES, StorageKey } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { toaster } from '@client/toaster';
import { callApi } from '@client/utils/apiUtils';
import {
	ListingCardData,
	ShopCardData,
} from '@heirloom/common/contract';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type FavoritesContextType = {
	favoriteIds: Set<string>;
	isFavorited: (shortId: string) => boolean;
	toggleFavorite: (listing: ListingCardData) => Promise<void>;
	favoriteShopIds: Set<string>;
	isFavoritedShop: (shortId: string) => boolean;
	toggleFavoriteShop: (shop: ShopCardData) => Promise<void>;
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
	const [favoriteShopIds, setFavoriteShopIds] = useState<
		Set<string>
	>(new Set());
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const { isAuthenticated, loginWithRedirect } = useAuth0();
	const apiClient = useApiClient();
	const navigate = useNavigate();

	const processPendingFavorite = async () => {
		const pendingShortId = sessionStorage.getItem(
			StorageKey.PENDING_FAVORITE,
		);
		if (!pendingShortId) return;

		sessionStorage.removeItem(StorageKey.PENDING_FAVORITE);

		await callApi(
			apiClient.listings.favorite({
				params: { id: pendingShortId },
				body: {},
			}),
		);
	};

	const loadFavorites = async () => {
		setIsLoading(true);
		setError(null);

		await processPendingFavorite();

		const [listingsResult, shopsResult] = await Promise.all([
			callApi(apiClient.me.getFavorites()),
			callApi(apiClient.me.getFavoriteShops()),
		]);

		if (
			listingsResult.error !== null ||
			shopsResult.error !== null
		) {
			setError('Failed to fetch favorites');
		} else {
			setFavoriteIds(
				new Set<string>(
					listingsResult.data.map(
						(listing) => listing.shortId,
					),
				),
			);
			setFavoriteShopIds(
				new Set<string>(
					shopsResult.data.map((shop) => shop.shortId),
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

	const isFavoritedShop = (shortId: string) =>
		favoriteShopIds.has(shortId);

	const toggleFavoriteShop = async (shop: ShopCardData) => {
		if (!isAuthenticated) {
			loginWithRedirect({
				appState: { returnTo: window.location.pathname },
			});
			return;
		}

		const wasFavorited = favoriteShopIds.has(shop.shortId);

		setFavoriteShopIds((prev) => {
			const next = new Set(prev);
			if (wasFavorited) {
				next.delete(shop.shortId);
			} else {
				next.add(shop.shortId);
			}
			return next;
		});

		const res = wasFavorited
			? await callApi(
					apiClient.shops.unfavorite({
						params: { id: shop.shortId },
						body: {},
					}),
				)
			: await callApi(
					apiClient.shops.favorite({
						params: { id: shop.shortId },
						body: {},
					}),
				);

		if (res.error !== null) {
			setFavoriteShopIds((prev) => {
				const reverted = new Set(prev);
				if (wasFavorited) {
					reverted.add(shop.shortId);
				} else {
					reverted.delete(shop.shortId);
				}
				return reverted;
			});
		} else {
			toaster.create({
				title: wasFavorited
					? 'Removed from favorites'
					: 'Favorited',
				description: shop.title,
				type: wasFavorited ? 'info' : 'success',
				action: wasFavorited
					? undefined
					: {
							label: 'View',
							onClick: () =>
								navigate(CLIENT_ROUTES.favorites),
						},
			});
		}
	};

	const toggleFavorite = async (listing: ListingCardData) => {
		if (!isAuthenticated) {
			sessionStorage.setItem(
				StorageKey.PENDING_FAVORITE,
				listing.shortId,
			);
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

		const res = wasFavorited
			? await callApi(
					apiClient.listings.unfavorite({
						params: { id: listing.shortId },
						body: {},
					}),
				)
			: await callApi(
					apiClient.listings.favorite({
						params: { id: listing.shortId },
						body: {},
					}),
				);

		if (res.error !== null) {
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
					? 'Removed from favorites'
					: 'Favorited',
				description: listing.title,
				type: wasFavorited ? 'info' : 'success',
				action: wasFavorited
					? undefined
					: {
							label: 'View',
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
				favoriteShopIds,
				isFavoritedShop,
				toggleFavoriteShop,
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
