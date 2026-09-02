import { Text } from '@chakra-ui/react';
import { AppError } from '@client/components/feedback/AppError';
import { OrderPreviewList } from '@client/components/cards/OrderPreviewList';
import { CLIENT_ROUTES } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { useMinDuration } from '@client/hooks/useMinDuration';
import { callApi } from '@client/utils/apiUtils';
import { OrderResponse } from '@heirloom/common/contract';
import { useEffect, useState } from 'react';

export const AdminOrdersPage = () => {
	const apiClient = useApiClient();

	const [orders, setOrders] = useState<OrderResponse[]>([]);
	const [dataIsLoading, setDataIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		callApi(apiClient.admin.getOrders()).then((result) => {
			if (result.error !== null) {
				setError('Failed to load orders');
			} else {
				setOrders(result.data);
			}
			setDataIsLoading(false);
		});
	}, []);

	const isLoading = useMinDuration(dataIsLoading);

	if (error) {
		return <AppError title={error} />;
	}

	if (!isLoading && orders.length === 0) {
		return (
			<Text fontSize={22}>No orders have been placed yet.</Text>
		);
	}

	return (
		<OrderPreviewList
			orders={orders}
			isLoading={isLoading}
			linkTo={(order) =>
				`/${CLIENT_ROUTES.admin}/${CLIENT_ROUTES.orders}/${order.shortId}`
			}
		/>
	);
};
