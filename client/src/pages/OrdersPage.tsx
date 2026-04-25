import { useAuth0 } from '@auth0/auth0-react';
import { SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import { AppError } from '@client/components/feedback/AppError';
import { OrderItemPreview } from '@client/components/itemDisplay/OrderItemPreview';
import { CLIENT_ROUTES } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { sidebarBreakpoint } from '@client/theme';
import { callApi } from '@client/utils/apiUtils';
import { OrderResponse } from '@heirloom/common/contract';
import { useEffect, useState } from 'react';

export const OrdersPage = () => {
	const {
		isAuthenticated,
		loginWithRedirect,
		isLoading: authIsLoading,
	} = useAuth0();
	const apiClient = useApiClient();

	const [orders, setOrders] = useState<OrderResponse[]>([]);
	const [dataIsLoading, setDataIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const loadOrders = async () => {
		setDataIsLoading(true);
		setError(null);
		const result = await callApi(apiClient.me.getOrders());
		if (result.error !== null) {
			setError('Failed to load orders');
		} else {
			setOrders(result.data);
		}
		setDataIsLoading(false);
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

	const isLoading = dataIsLoading || authIsLoading;

	if (error) {
		return <AppError title={error} />;
	}

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
			gapX={10}
			gapY={7}
		>
			{isLoading &&
				Array.from({ length: 3 }).map((_, i) => (
					<Skeleton
						key={i}
						width="100%"
						height={150}
					/>
				))}
			{!isLoading && orders.length === 0 && (
				<Text fontSize={22}>
					You haven't placed any orders yet.
				</Text>
			)}
			{!isLoading &&
				orders.length > 0 &&
				orders.map((order) => (
					<OrderItemPreview
						key={order.shortId}
						order={order}
					/>
				))}
		</SimpleGrid>
	);
};
