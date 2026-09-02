import { useAuth0 } from '@auth0/auth0-react';
import { HStack, Skeleton, Stack, Text } from '@chakra-ui/react';
import { AppError } from '@client/components/feedback/AppError';
import {
	OrderDetailItemsList,
	OrderDetailItemsListSkeleton,
	OrderDetailPaymentSection,
	OrderDetailPaymentSectionSkeleton,
	OrderDetailSummaryAndShipping,
	OrderDetailSummaryAndShippingSkeleton,
	OrderDetailTimeline,
	OrderDetailTimelineSkeleton,
} from '@client/components/itemDisplay/OrderDetailSections';
import { useApiClient } from '@client/hooks/useApiClient';
import { useMinDuration } from '@client/hooks/useMinDuration';
import { displayFontFamily } from '@client/theme';
import { callApi } from '@client/utils/apiUtils';
import { OrderResponse } from '@heirloom/common/contract';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const OrderPageSkeleton = () => (
	<>
		<OrderDetailTimelineSkeleton />

		<Stack gap={5}>
			<Stack gap={2}>
				<Skeleton
					height={10}
					width={200}
				/>
				<OrderDetailItemsListSkeleton />
			</Stack>

			<OrderDetailSummaryAndShippingSkeleton />

			<OrderDetailPaymentSectionSkeleton />
		</Stack>

		<Skeleton
			width="100%"
			height={55}
		/>
	</>
);

const OrderPageContent = ({ order }: { order: OrderResponse }) => (
	<>
		<OrderDetailTimeline timeline={order.timeline} />

		<Stack gap={5}>
			<Stack gap={2}>
				<Text
					fontFamily={displayFontFamily}
					fontSize={26}
					fontWeight={500}
				>
					Item(s)
				</Text>
				<OrderDetailItemsList items={order.items} />
			</Stack>

			<OrderDetailSummaryAndShipping order={order} />

			{order.paymentDetails && (
				<OrderDetailPaymentSection
					paymentDetails={order.paymentDetails}
				/>
			)}
		</Stack>

		<Stack
			gap={1}
			fontSize={20}
		>
			<Text fontSize={20}>Need help with your order?</Text>
			<HStack gap={1}>
				<Text>Reach us at</Text>
				<Text fontWeight={500}>support@heirloom.shop</Text>
			</HStack>
		</Stack>
	</>
);

export const OrderPage = () => {
	const apiClient = useApiClient();
	const { shortId } = useParams<{ shortId: string }>();
	const { isLoading: authIsLoading } = useAuth0();

	const [searchParams] = useSearchParams();
	const key = searchParams.get('key') ?? '';

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [orderDetails, setOrderDetails] =
		useState<OrderResponse | null>(null);
	const [error, setError] = useState<string | null>(null);
	const showSkeleton = useMinDuration(isLoading || authIsLoading);

	const loadOrderData = async () => {
		if (!shortId) {
			return;
		}
		setIsLoading(true);
		const result = await callApi(
			apiClient.orders.getByShortId({
				params: { shortId },
				query: { key },
			}),
		);
		setIsLoading(false);
		if (result.error !== null) {
			setError(result.error);
		} else {
			setOrderDetails(result.data);
		}
	};

	useEffect(() => {
		loadOrderData();
	}, [shortId, key]);

	return (
		<>
			{error && (
				<AppError
					title="Failed to load order"
					content={error}
				/>
			)}
			{!error && (showSkeleton || orderDetails) && (
				<Stack
					w="100%"
					maxWidth={600}
					gap={8}
				>
					{showSkeleton ? (
						<OrderPageSkeleton />
					) : (
						<OrderPageContent order={orderDetails!} />
					)}
				</Stack>
			)}
		</>
	);
};
