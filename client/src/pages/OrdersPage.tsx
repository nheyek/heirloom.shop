import { useAuth0 } from '@auth0/auth0-react';
import { HStack, Skeleton, Stack, Text } from '@chakra-ui/react';
import { AppError } from '@client/components/feedback/AppError';
import { OrderPreviewCard } from '@client/components/itemDisplay/OrderPreviewCard';
import { CLIENT_ROUTES } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { useMinDuration } from '@client/hooks/useMinDuration';
import { useOrderItemCardLayout } from '@client/hooks/useOrderItemCardLayout';
import { callApi } from '@client/utils/apiUtils';
import { OrderResponse } from '@heirloom/common/contract';
import { useEffect, useState } from 'react';

const ORDER_PREVIEW_LIST_MAX_WIDTH = 600;
const SKELETON_ITEM_COUNT = 3;
const COMPACT_SKELETON_HEIGHT = 380;
const STANDARD_SKELETON_HEIGHT = 110;

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
	const { layout, isCompact, cardProps } = useOrderItemCardLayout(
		isLoading ? SKELETON_ITEM_COUNT : orders.length,
	);

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

	const content = isLoading
		? Array.from({ length: SKELETON_ITEM_COUNT }).map((_, i) => (
				<Skeleton
					key={i}
					borderRadius="md"
					width={cardProps?.width}
					minW={cardProps?.minW}
					height={
						isCompact
							? COMPACT_SKELETON_HEIGHT
							: STANDARD_SKELETON_HEIGHT
					}
				/>
			))
		: orders.map((order) => (
				<OrderPreviewCard
					key={order.shortId}
					order={order}
					layout={layout}
					cardProps={cardProps}
				/>
			));

	return isCompact ? (
		<HStack
			gap={5}
			m={-5}
			p={5}
			overflowX="scroll"
			alignItems="flex-start"
		>
			{content}
		</HStack>
	) : (
		<Stack
			width="100%"
			maxW={ORDER_PREVIEW_LIST_MAX_WIDTH}
			gap={5}
		>
			{content}
		</Stack>
	);
};
