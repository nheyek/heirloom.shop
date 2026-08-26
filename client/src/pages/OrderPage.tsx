import { useAuth0 } from '@auth0/auth0-react';
import {
	Flex,
	HStack,
	Skeleton,
	Stack,
	Text,
	Timeline,
	useBreakpointValue,
} from '@chakra-ui/react';
import { AppError } from '@client/components/feedback/AppError';
import { OrderItemCard } from '@client/components/itemDisplay/OrderItemCard';
import { Layout } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { useMinDuration } from '@client/hooks/useMinDuration';
import { useOrderItemCardLayout } from '@client/hooks/useOrderItemCardLayout';
import { displayFontFamily } from '@client/theme';
import { callApi } from '@client/utils/apiUtils';
import { formatDateLong } from '@client/utils/dateUtils';
import { OrderStatus } from '@heirloom/common/constants';
import {
	OrderItemDisplayData,
	OrderResponse,
	OrderTimelineEntry,
} from '@heirloom/common/contract';
import { formatCentsAsDollars } from '@heirloom/common/utils/priceDisplay';
import { formatShippingAddress } from '@heirloom/common/utils/shippingAddress';
import { capitalize } from '@heirloom/common/utils/stringUtils';
import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useParams, useSearchParams } from 'react-router-dom';

const SKELETON_ITEM_COUNT = 1;

const DESKTOP_ORDER_ITEM_HEIGHT = 220;

const OrderTimeline = ({
	timeline,
}: {
	timeline: OrderTimelineEntry[];
}) => {
	if (timeline.length === 0) return null;

	return (
		<Timeline.Root mt={2}>
			{timeline.map((entry, i) => (
				<Timeline.Item key={i}>
					<Timeline.Connector>
						<Timeline.Separator />
						<Timeline.Indicator>
							{entry.status ===
								OrderStatus.CONFIRMED && <FaCheck />}
						</Timeline.Indicator>
					</Timeline.Connector>
					<Timeline.Content>
						<Timeline.Title fontSize={22}>
							{capitalize(entry.status)}
						</Timeline.Title>
						<Timeline.Description fontSize={20}>
							{formatDateLong(entry.timestamp)}
							{entry.info && ` — ${entry.info}`}
						</Timeline.Description>
					</Timeline.Content>
				</Timeline.Item>
			))}
		</Timeline.Root>
	);
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
						isCompact ? 340 : DESKTOP_ORDER_ITEM_HEIGHT
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
					bodyOverlayElements={
						item.quantity > 1 && (
							<Flex
								justifyContent="center"
								alignItems="start"
								position="absolute"
								h={8}
								minW={8}
								top={2}
								right={2}
								px={3}
								borderRadius="full"
								fontSize={22}
								lineHeight={1.3}
								fontWeight={500}
								background="gray.100"
							>
								{item.quantity}
							</Flex>
						)
					}
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
	const layout = useBreakpointValue({
		base: Layout.MOBILE,
		md: Layout.DESKTOP,
	});
	const isMobile = layout === Layout.MOBILE;

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
			<Stack gap={4}>
				<Skeleton
					height={7}
					width={220}
				/>
				<OrderItemsList
					items={[]}
					loading
				/>
			</Stack>

			<Flex
				direction={isMobile ? 'column' : 'row'}
				gapX={20}
				gapY={5}
				alignItems="start"
			>
				<Skeleton
					flexShrink={0}
					width={isMobile ? '100%' : 250}
					height={150}
				/>
				<Skeleton
					flexShrink={0}
					width={180}
					height={150}
				/>
			</Flex>
		</>
	);

	const renderContent = (order: OrderResponse) => (
		<>
			<OrderTimeline timeline={order.timeline} />

			<Stack gap={5}>
				<Stack gap={2}>
					<Text
						fontFamily={displayFontFamily}
						fontSize={26}
						fontWeight={500}
					>
						Item(s)
					</Text>
					<OrderItemsList items={order.items} />
				</Stack>

				<Flex
					direction={isMobile ? 'column' : 'row'}
					gapX={20}
					gapY={5}
					alignItems="start"
					fontSize={18}
				>
					<Stack
						width={isMobile ? '100%' : 200}
						gap={1}
					>
						<SectionHeading>Summary</SectionHeading>
						<Stack gap={0.5}>
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
								<HStack
									key={label}
									justifyContent="space-between"
								>
									<Text>{label}</Text>
									<Text fontSize={20}>{value}</Text>
								</HStack>
							))}
							<HStack
								justifyContent="space-between"
								fontWeight={500}
							>
								<Text>Total</Text>
								<Text fontSize={20}>
									{formatCentsAsDollars(
										order.subtotalCents +
											order.shippingCents +
											order.taxCents,
									)}
								</Text>
							</HStack>
						</Stack>
					</Stack>

					<Stack gap={1}>
						<SectionHeading>Ship To</SectionHeading>
						<Text
							whiteSpace="pre-line"
							lineHeight={1.5}
						>
							{formatShippingAddress(
								order.shippingAddress,
							)}
						</Text>
					</Stack>
				</Flex>
			</Stack>

			<Stack
				gap={1}
				fontSize={20}
			>
				<Text fontSize={20}>Need help with your order?</Text>
				<HStack gap={1}>
					<Text>Reach us at</Text>
					<Text fontWeight={500}>
						support@heirloom.shop
					</Text>
				</HStack>
			</Stack>
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
					gap={7}
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
		fontSize={22}
		fontFamily={displayFontFamily}
	>
		{children}
	</Text>
);
