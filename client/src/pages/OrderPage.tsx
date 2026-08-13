import { useAuth0 } from '@auth0/auth0-react';
import {
	DataList,
	HStack,
	Skeleton,
	Stack,
	Text,
} from '@chakra-ui/react';
import { AppError } from '@client/components/feedback/AppError';
import {
	OrderItemCard,
	STANDARD_THUMBNAIL_WIDTH,
} from '@client/components/itemDisplay/OrderItemCard';
import { useApiClient } from '@client/hooks/useApiClient';
import { useMinDuration } from '@client/hooks/useMinDuration';
import { useOrderItemCardLayout } from '@client/hooks/useOrderItemCardLayout';
import { callApi } from '@client/utils/apiUtils';
import {
	OrderItemDisplayData,
	OrderResponse,
} from '@heirloom/common/contract';
import { formatCentsAsDollars } from '@heirloom/common/utils/priceDisplay';
import { formatShippingAddress } from '@heirloom/common/utils/shippingAddress';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const SKELETON_ITEM_COUNT = 2;

const OrderItemsList = ({
	items,
	loading,
}: {
	items: OrderItemDisplayData[];
	loading?: boolean;
}) => {
	const { layout, isCompact, cardProps } = useOrderItemCardLayout(
		loading ? SKELETON_ITEM_COUNT : items.length,
	);

	const children = loading
		? Array.from({ length: SKELETON_ITEM_COUNT }).map((_, i) => (
				<Skeleton
					key={i}
					borderRadius="md"
					flexShrink={0}
					height={
						isCompact ? 340 : STANDARD_THUMBNAIL_WIDTH
					}
					width={isCompact ? 300 : '100%'}
				/>
			))
		: items.map((item, index) => (
				<OrderItemCard
					key={index}
					item={item}
					layout={layout}
					cardProps={cardProps}
				/>
			));

	return isCompact ? (
		<HStack
			gap={5}
			overflowX="scroll"
			pb={2}
			alignItems="flex-start"
		>
			{children}
		</HStack>
	) : (
		<Stack gap={5}>{children}</Stack>
	);
};

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
			<OrderItemsList
				items={[]}
				loading
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

			<OrderItemsList items={order.items} />
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
			{!error && (showSkeleton || orderDetails) && (
				<Stack
					w="100%"
					maxWidth={600}
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
