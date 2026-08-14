import { useAuth0 } from '@auth0/auth0-react';
import {
	DataList,
	HStack,
	Skeleton,
	Stack,
	Text,
	Wrap,
} from '@chakra-ui/react';
import { AppError } from '@client/components/feedback/AppError';
import {
	OrderItemCard,
	STANDARD_THUMBNAIL_WIDTH,
} from '@client/components/itemDisplay/OrderItemCard';
import { useApiClient } from '@client/hooks/useApiClient';
import { useMinDuration } from '@client/hooks/useMinDuration';
import { useOrderItemCardLayout } from '@client/hooks/useOrderItemCardLayout';
import { displayFontFamily } from '@client/theme';
import { callApi } from '@client/utils/apiUtils';
import {
	OrderItemDisplayData,
	OrderResponse,
} from '@heirloom/common/contract';
import { formatCentsAsDollars } from '@heirloom/common/utils/priceDisplay';
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
			m={-5}
			p={5}
			overflowX="scroll"
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
			<OrderItemsList
				items={[]}
				loading
			/>
			<HStack
				gap={5}
				overflowX={{ base: 'scroll', md: 'visible' }}
				alignItems="start"
			>
				<Skeleton
					flexShrink={0}
					width={200}
					height={200}
				/>
				<Skeleton
					flexShrink={0}
					width={200}
					height={200}
				/>
			</HStack>
		</>
	);

	const renderContent = (order: OrderResponse) => (
		<>
			<OrderItemsList items={order.items} />

			<Wrap
				gapX={10}
				gapY={5}
				overflowX={{ base: 'scroll', md: 'visible' }}
				alignItems="start"
			>
				<Stack w="fit-content">
					<SectionHeading>Summary</SectionHeading>
					<DataList.Root
						orientation="horizontal"
						gap={1}
					>
						{[
							{
								label: 'Item(s) Subtotal',
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
						].map(({ label, value }) => (
							<DataList.Item key={label}>
								<DataList.ItemLabel fontSize={18}>
									{label}
								</DataList.ItemLabel>
								<DataList.ItemValue fontSize={20}>
									{value}
								</DataList.ItemValue>
							</DataList.Item>
						))}
						<DataList.Item fontWeight={500}>
							<DataList.ItemLabel fontSize={18}>
								Total
							</DataList.ItemLabel>
							<DataList.ItemValue fontSize={20}>
								{formatCentsAsDollars(
									order.subtotalCents +
										order.shippingCents +
										order.taxCents,
								)}
							</DataList.ItemValue>
						</DataList.Item>
					</DataList.Root>
				</Stack>

				<Stack flexShrink={0}>
					<SectionHeading>Shipping To</SectionHeading>
					<Stack gap={1}>
						{[
							`${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
							order.shippingAddress.line1,
							order.shippingAddress.line2,
							`${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}`,
						]
							.filter(Boolean)
							.map((line, index) => (
								<Text
									key={index}
									fontSize={18}
								>
									{line}
								</Text>
							))}
					</Stack>
				</Stack>
			</Wrap>
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

const SectionHeading = ({ children }: { children: string }) => (
	<Text
		fontWeight={500}
		fontSize={24}
		fontFamily={displayFontFamily}
	>
		{children}
	</Text>
);
