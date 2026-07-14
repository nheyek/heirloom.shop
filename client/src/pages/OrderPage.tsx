import { useAuth0 } from '@auth0/auth0-react';
import {
	DataList,
	HStack,
	Skeleton,
	Stack,
	Text,
} from '@chakra-ui/react';
import { ItemGrid } from '@client/components/collections/ItemGrid';
import { AppError } from '@client/components/feedback/AppError';
import { OrderItemCard } from '@client/components/itemDisplay/OrderItemCard';
import { useApiClient } from '@client/hooks/useApiClient';
import { useMinDuration } from '@client/hooks/useMinDuration';
import { sidebarBreakpoint } from '@client/theme';
import { callApi } from '@client/utils/apiUtils';
import { OrderResponse } from '@heirloom/common/contract';
import { formatCentsAsDollars } from '@heirloom/common/utils/priceDisplay';
import { formatShippingAddress } from '@heirloom/common/utils/shippingAddress';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

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

	const renderSkeleton = () => (
		<>
			<Skeleton
				height={100}
				width={250}
			/>
			<Skeleton
				width={350}
				height={350}
			/>
		</>
	);

	const renderContent = (order: OrderResponse) => (
		<>
			<HStack
				gap={10}
				alignItems="start"
				fontSize={18}
			>
				<Stack gap={1}>
					<Text fontWeight={600}>Summary</Text>
					<DataList.Root
						orientation="horizontal"
						gap={0}
					>
						{[
							{
								label: 'Subtotal',
								value: formatCentsAsDollars(
									order.subtotalCents,
								),
							},
							{
								label: 'Shipping',
								value: formatCentsAsDollars(
									order.shippingCents,
								),
							},
							{
								label: 'Tax',
								value: formatCentsAsDollars(
									order.taxCents,
								),
							},
							{
								label: 'Total',
								value: formatCentsAsDollars(
									order.subtotalCents +
										order.shippingCents +
										order.taxCents,
								),
							},
						].map(({ label, value }) => (
							<DataList.Item
								key={label}
								lineHeight={1.25}
							>
								<DataList.ItemLabel
									minWidth={65}
									fontSize={18}
								>
									{label}
								</DataList.ItemLabel>
								<DataList.ItemValue fontSize={18}>
									{value}
								</DataList.ItemValue>
							</DataList.Item>
						))}
					</DataList.Root>
				</Stack>
				<Stack gap={1}>
					<Text fontWeight={600}>Shipping to</Text>
					<Text
						whiteSpace="pre-wrap"
						wordBreak="break-all"
						lineHeight={1.25}
					>
						{formatShippingAddress(order.shippingAddress)}
					</Text>
				</Stack>
			</HStack>

			<ItemGrid
				items={order.items}
				isLoading={false}
				getItemKey={(_, index) => index}
				columns={{
					base: 1,
					[sidebarBreakpoint.md]: 2,
					[sidebarBreakpoint.lg]: 3,
				}}
				maxItemWidth={350}
				renderItem={(item) => <OrderItemCard item={item} />}
			/>
		</>
	);

	return (
		<>
			{error && (
				<AppError
					title="Failed to load order"
					content={error}
				/>
			)}
			{!error && (isLoading || orderDetails) && (
				<Stack
					w="100%"
					gap={5}
				>
					{showSkeleton
						? renderSkeleton()
						: renderContent(orderDetails!)}
				</Stack>
			)}
		</>
	);
};
