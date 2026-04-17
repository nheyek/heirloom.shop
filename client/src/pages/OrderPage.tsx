import { useAuth0 } from '@auth0/auth0-react';
import {
	Box,
	DataList,
	HStack,
	Skeleton,
	Stack,
	Text,
} from '@chakra-ui/react';
import { ItemGrid } from '@client/components/collections/ItemGrid';
import { OrderItemCard } from '@client/components/itemDisplay/OrderItemCard';
import { useApiClient } from '@client/hooks/useApiClient';
import { FONT_DISPLAY_SANS, sidebarBreakpoint } from '@client/theme';
import { callApi } from '@client/utils/apiUtils';
import { OrderResponse } from '@common/contract';
import { formatCentsAsDollars } from '@common/utils/priceDisplay';
import { formatShippingAddress } from '@common/utils/shippingAddress';
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
				renderItem={(item) => <OrderItemCard item={item} />}
			/>
		</>
	);

	return (
		<>
			{error && <Box>{error}</Box>}
			{!error && (isLoading || orderDetails) && (
				<Stack
					w="100%"
					gap={5}
					fontFamily={FONT_DISPLAY_SANS}
				>
					{isLoading || authIsLoading
						? renderSkeleton()
						: renderContent(orderDetails!)}
				</Stack>
			)}
		</>
	);
};
