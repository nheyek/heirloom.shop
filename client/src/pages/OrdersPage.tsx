import { useAuth0 } from '@auth0/auth0-react';
import {
	Center,
	Heading,
	SimpleGrid,
	Skeleton,
	Stack,
	useBreakpointValue,
} from '@chakra-ui/react';
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

	const maxColumns = useBreakpointValue({ base: 1, lg: 2 }) ?? 1;
	const itemCount = loading ? 3 : orders.length;
	const effectiveCols = Math.min(itemCount, maxColumns);

	return (
		<Center
			py={10}
			px={5}
		>
			<Stack
				w={{ base: '100%', md: 'fit-content' }}
				maxW={1200}
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
						fontSize={44}
						fontWeight={400}
					>
						Your Orders
					</Heading>
				)}
				<SimpleGrid
					columns={effectiveCols}
					rowGap={8}
					columnGap={16}
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
				</SimpleGrid>
			</Stack>
		</Center>
	);
};
