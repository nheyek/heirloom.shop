import { useAuth0 } from '@auth0/auth0-react';
import {
	Box,
	DataList,
	HStack,
	Icon,
	Separator,
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
import { useEffect, useState } from 'react';
import { BsPostage } from 'react-icons/bs';
import { useParams, useSearchParams } from 'react-router-dom';

const SKELETON_ITEM_COUNT = 2;

const RECEIPT_ZIGZAG_CLIP_PATH =
	'polygon(0.00% 0%, 6.25% 5%, 12.50% 0%, 18.75% 5%, 25.00% 0%, 31.25% 5%, 37.50% 0%, 43.75% 5%, 50.00% 0%, 56.25% 5%, 62.50% 0%, 68.75% 5%, 75.00% 0%, 81.25% 5%, 87.50% 0%, 93.75% 5%, 100.00% 0%, 100.00% 100%, 93.75% 95%, 87.50% 100%, 81.25% 95%, 75.00% 100%, 68.75% 95%, 62.50% 100%, 56.25% 95%, 50.00% 100%, 43.75% 95%, 37.50% 100%, 31.25% 95%, 25.00% 100%, 18.75% 95%, 12.50% 100%, 6.25% 95%, 0.00% 100%)';

const PANEL_BACKGROUND = {
	bgGradient: 'to-br',
	gradientFrom: 'gray.50',
	gradientTo: 'gray.100',
	boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.04)',
};

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
			<HStack
				gap={5}
				overflowX={{ base: 'scroll', md: 'visible' }}
				alignItems="start"
			>
				<Stack
					w="fit-content"
					gap={2}
					{...PANEL_BACKGROUND}
					px={5}
					py={7}
					position="relative"
					clipPath={RECEIPT_ZIGZAG_CLIP_PATH}
				>
					<Text
						fontWeight={500}
						fontSize={18}
					>
						SUMMARY
					</Text>
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
						].map(({ label, value }) => (
							<DataList.Item
								key={label}
								lineHeight={1.25}
							>
								<DataList.ItemLabel fontSize={18}>
									{label}
								</DataList.ItemLabel>
								<DataList.ItemValue fontSize={20}>
									{value}
								</DataList.ItemValue>
							</DataList.Item>
						))}
						<Separator
							my={2}
							borderColor="black"
						/>
						<DataList.Item
							lineHeight={1.25}
							fontWeight={500}
						>
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

				<Stack
					w="fit-content"
					flexShrink={0}
					position="relative"
					p={5}
					pr={65}
					borderRadius="lg"
					{...PANEL_BACKGROUND}
				>
					<Text
						fontWeight={500}
						fontSize={18}
					>
						SHIP TO
					</Text>
					{[
						`${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
						order.shippingAddress.line1,
						order.shippingAddress.line2,
						`${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}`,
					]
						.filter(Boolean)
						.map((line, index) => (
							<Stack gap={1}>
								<Text
									key={index}
									whiteSpace="pre-wrap"
									wordBreak="break-all"
									lineHeight={1.25}
									pr={5}
								>
									{line}
								</Text>
								<Separator borderColor="black" />
							</Stack>
						))}
					<Box
						position="absolute"
						top={2}
						right={1.5}
					>
						<Icon
							color="gray.800"
							as={BsPostage}
							width={30}
							height={30}
						/>
					</Box>
				</Stack>
			</HStack>
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
