import { useAuth0 } from '@auth0/auth0-react';
import { Heading, Stack, Text } from '@chakra-ui/react';
import { ListingCardData } from '@common/types/ListingCardData';
import { useEffect, useState } from 'react';
import { AppError } from '../components/disclosure/AppError';
import { ListingGrid } from '../components/layout/ListingGrid';
import useApi from '../hooks/useApi';

export const SavedPage = () => {
	const {
		isAuthenticated,
		loginWithRedirect,
		isLoading: authIsLoading,
	} = useAuth0();
	const { getProtectedResource, postResource } = useApi();

	const [listings, setListings] = useState<
		ListingCardData[]
	>([]);
	const [isLoading, setIsLoading] =
		useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const loadSavedListings = async () => {
		setIsLoading(true);
		setError(null);

		setTimeout(async () => {
			const response = await getProtectedResource(
				'me/favorited-listings',
			);
			if (response.error) {
				setError('Failed to load saved listings');
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
				appState: { returnTo: '/saved' },
			});
			return;
		}

		const pendingListingShortId =
			sessionStorage.getItem(
				'pendingListingFavorite',
			);

		if (pendingListingShortId) {
			sessionStorage.removeItem(
				'pendingListingFavorite',
			);

			(async () => {
				try {
					await postResource(
						`listings/${pendingListingShortId}/favorite`,
						{},
					);
				} catch (err) {
					console.error(
						'Failed to save listing:',
						err,
					);
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
		<Stack
			p={5}
			gap={4}
		>
			<Heading fontSize={32}>
				Favorite Listings
			</Heading>
			{!isLoading &&
				listings.length === 0 &&
				!error && (
					<Text fontSize={18}>
						You haven't favorited any listings
						yet. Click the heart icon on any
						listing to save it.
					</Text>
				)}
			{error && <AppError title={error} />}

			<ListingGrid
				listings={listings}
				isLoading={isLoading}
				initialSaved={true}
			/>
		</Stack>
	);
};
