import { useAuth0 } from '@auth0/auth0-react';
import { Text } from '@chakra-ui/react';
import { AppError } from '@client/components/feedback/AppError';
import { OrderPreviewList } from '@client/components/cards/OrderPreviewList';
import { CLIENT_ROUTES } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { useMinDuration } from '@client/hooks/useMinDuration';
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

	const isLoading = useMinDuration(dataIsLoading || authIsLoading);

	if (error) {
		return <AppError title={error} />;
	}

	if (!isLoading && orders.length === 0) {
		return (
			<Text fontSize={22}>
				You haven't placed any orders yet.
			</Text>
		);
	}

	return (
		<OrderPreviewList
			orders={orders}
			isLoading={isLoading}
		/>
	);
};
