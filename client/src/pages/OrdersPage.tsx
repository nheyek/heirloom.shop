import { useAuth0 } from '@auth0/auth0-react';
import { SimpleGrid, Skeleton } from '@chakra-ui/react';
import { OrderItemPreview } from '@client/components/itemDisplay/OrderItemPreview';
import { CLIENT_ROUTES } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { sidebarBreakpoint } from '@client/theme';
import { callApi } from '@client/utils/apiUtils';
import { OrderResponse } from '@common/contract';
import { useEffect, useState } from 'react';

export const OrdersPage = () => {
	const {
		isAuthenticated,
		loginWithRedirect,
		isLoading: authIsLoading,
	} = useAuth0();
	const apiClient = useApiClient();

	const [orders, setOrders] = useState<OrderResponse[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const loadOrders = async () => {
		setIsLoading(true);
		setError(null);
		const result = await callApi(apiClient.me.getOrders());
		if (result.error !== null) {
			setError('Failed to load orders');
		} else {
			setOrders(result.data);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		if (!authIsLoading && !isAuthenticated) {
			loginWithRedirect({
				appState: { returnTo: `/${CLIENT_ROUTES.orders}` },
			});
			return;
		}

		if (!authIsLoading && isAuthenticated) {
			loadOrders();
		}
	}, [authIsLoading]);

	const loading = isLoading || authIsLoading;

	return (
		<SimpleGrid
			columns={{
				base: 1,
				[sidebarBreakpoint.md]: 2,
				[sidebarBreakpoint.xl]: 3,
			}}
			maxW={{
				[sidebarBreakpoint.md]: 800,
				[sidebarBreakpoint.xl]: 1200,
			}}
			gap={10}
		>
			{loading
				? Array.from({ length: 3 }).map((_, i) => (
						<Skeleton
							key={i}
							width="100%"
							height={150}
						/>
					))
				: orders.map((order) => (
						<OrderItemPreview
							key={order.shortId}
							order={order}
						/>
					))}
		</SimpleGrid>
	);
};
