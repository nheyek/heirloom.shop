import { useAuth0 } from '@auth0/auth0-react';
import { HStack, Span, Stack, Text } from '@chakra-ui/react';
import { ListingGrid } from '@client/components/collections/ListingGrid';
import { AppError } from '@client/components/feedback/AppError';
import { CLIENT_ROUTES } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { sidebarBreakpoint } from '@client/theme';
import { callApi } from '@client/utils/apiUtils';
import { ListingCardData } from '@common/contract';
import { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';

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

		const result = await callApi(apiClient.me.getFavorites());
		if (result.error !== null) {
			setError('Failed to load favorites');
		} else {
			setListings(result.data);
		}
		setIsLoading(false);
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
		<Stack gap={4}>
			{!isLoading && listings.length === 0 && (
				<Stack gap={1}>
					<Text fontSize={22}>
						You haven't favorited any listings yet.
					</Text>
					<HStack
						fontSize={20}
						gap={1.5}
					>
						<Span>Click</Span>
						<FaHeart />
						<Span>on any listing to favorite it.</Span>
					</HStack>
				</Stack>
			)}

			<ListingGrid
				listings={listings}
				isLoading={isLoading}
				columns={{
					base: 1,
					[sidebarBreakpoint.sm]: 2,
					[sidebarBreakpoint.md]: 3,
					[sidebarBreakpoint.xl]: 4,
				}}
			/>
		</Stack>
	);
};
