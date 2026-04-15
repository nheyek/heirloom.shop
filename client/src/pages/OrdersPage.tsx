import { useAuth0 } from '@auth0/auth0-react';
import { Heading, Skeleton, Stack, Wrap } from '@chakra-ui/react';
import { OrderItemPreview } from '@client/components/itemDisplay/OrderItemPreview';
import { CLIENT_ROUTES } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { FONT_DISPLAY_SANS } from '@client/theme';
import { callApi } from '@client/utils/apiUtils';
import { OrderResponse } from '@common/contract';
import { useEffect, useState } from 'react';

const ITEM_MAX_W = 400;

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
		<Stack
			px={5}
			py={{ base: 5, md: 8 }}
			w={{ base: '100%', md: 'fit-content' }}
			maxW={1000}
			gap={8}
			fontFamily={FONT_DISPLAY_SANS}
		>
			{loading ? (
				<Skeleton
					height={10}
					width={200}
				/>
			) : (
				<Heading
					fontSize={36}
					fontWeight={500}
				>
					Your Orders
				</Heading>
			)}
			<Wrap
				gapY={10}
				gapX={20}
			>
				{loading
					? Array.from({ length: 3 }).map((_, i) => (
							<Skeleton
								key={i}
								width={ITEM_MAX_W}
								height={200}
							/>
						))
					: orders.map((order) => (
							<OrderItemPreview
								key={order.shortId}
								order={order}
							/>
						))}
			</Wrap>
		</Stack>
	);
};
