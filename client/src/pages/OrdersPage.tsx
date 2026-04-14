import { useAuth0 } from '@auth0/auth0-react';
import { Center, Heading, Stack } from '@chakra-ui/react';
import { OrderSummaryCard } from '@client/components/itemDisplay/OrderSummaryItem';
import { CLIENT_ROUTES } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { FONT_DECORATIVE, FONT_DISPLAY_SANS } from '@client/theme';
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

	return (
		<Center
			py={{ base: 5, md: 10 }}
			px={5}
		>
			<Stack
				w={{ base: '100%', md: 'fit-content' }}
				maxW={1200}
				gap={5}
				fontFamily={FONT_DISPLAY_SANS}
			>
				<Heading
					fontSize={36}
					fontFamily={FONT_DECORATIVE}
					fontWeight={500}
				>
					Your Orders
				</Heading>
				{orders.map((order) => (
					<OrderSummaryCard
						key={order.shortId}
						order={order}
					/>
				))}
			</Stack>
		</Center>
	);
};
