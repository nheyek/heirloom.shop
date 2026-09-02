import { Skeleton, Stack, Text } from '@chakra-ui/react';
import { AppError } from '@client/components/feedback/AppError';
import { CompleteOrderButton } from '@client/components/itemDisplay/CompleteOrderButton';
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
import { OrderStatus } from '@heirloom/common/constants';
import { OrderResponse } from '@heirloom/common/contract';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AdminOrderPageSkeleton = () => (
	<>
		<Stack gap={3}>
			<OrderDetailTimelineSkeleton />
			<Skeleton
				height={10}
				width={120}
			/>
		</Stack>

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
	</>
);

const AdminOrderPageContent = ({
	order,
}: {
	order: OrderResponse;
}) => (
	<>
		<Stack gap={3}>
			<OrderDetailTimeline timeline={order.timeline} />
			{order.orderStatus === OrderStatus.CONFIRMED && (
				<CompleteOrderButton />
			)}
		</Stack>

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
	</>
);

export const AdminOrderPage = () => {
	const apiClient = useApiClient();
	const { shortId } = useParams<{ shortId: string }>();

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [orderDetails, setOrderDetails] =
		useState<OrderResponse | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!shortId) return;
		callApi(
			apiClient.admin.getOrder({ params: { shortId } }),
		).then((result) => {
			if (result.error !== null) {
				setError(result.error);
			} else {
				setOrderDetails(result.data);
			}
			setIsLoading(false);
		});
	}, [shortId]);

	const showSkeleton = useMinDuration(isLoading);

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
						<AdminOrderPageSkeleton />
					) : (
						<AdminOrderPageContent
							order={orderDetails!}
						/>
					)}
				</Stack>
			)}
		</>
	);
};
