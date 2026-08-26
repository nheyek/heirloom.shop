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

const ORDER_ITEM_SKELETON_COUNT = 1;
const ORDER_ITEM_SKELETON_HEIGHT_DESKTOP = 175;
const ORDER_ITEM_SKELETON_HEIGHT_MOBILE = 340;
const ORDER_ITEM_SKELETON_WIDTH_MOBILE = 300;
const TIMELINE_SKELETON_HEIGHT = 90;

const OrderTimeline = ({
	timeline,
}: {
	timeline: OrderTimelineEntry[];
}) => {
	if (timeline.length === 0) return null;

	return (
		<Timeline.Root>
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
}: {
	items: OrderItemDisplayData[];
}) => {
	const { layout, isCompact, cardProps } = useOrderItemCardLayout(
		items.length,
	);

	const children = items.map((item, index) => (
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

const OrderItemsListSkeleton = () => {
	const { isCompact } = useOrderItemCardLayout(
		ORDER_ITEM_SKELETON_COUNT,
	);

	const children = Array.from({
		length: ORDER_ITEM_SKELETON_COUNT,
	}).map((_, i) => (
		<Skeleton
			key={i}
			borderRadius="md"
			flexShrink={0}
			height={
				isCompact
					? ORDER_ITEM_SKELETON_HEIGHT_MOBILE
					: ORDER_ITEM_SKELETON_HEIGHT_DESKTOP
			}
			width={
				isCompact ? ORDER_ITEM_SKELETON_WIDTH_MOBILE : '100%'
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

const OrderPageSkeleton = () => {
	const layout = useBreakpointValue({
		base: Layout.MOBILE,
		md: Layout.DESKTOP,
	});
	const isMobile = layout === Layout.MOBILE;

	return (
		<>
			<Skeleton
				height={TIMELINE_SKELETON_HEIGHT}
				width="100%"
			/>

			<Stack gap={5}>
				<Stack gap={2}>
					<Skeleton
						height={10}
						width={220}
					/>
					<OrderItemsListSkeleton />
				</Stack>

				<Flex
					direction={isMobile ? 'column' : 'row'}
					gapX={20}
					gapY={5}
					alignItems="start"
				>
					<Skeleton
						flexShrink={0}
						width={isMobile ? '100%' : 200}
						height={150}
					/>
					<Skeleton
						flexShrink={0}
						width={180}
						height={150}
					/>
				</Flex>
			</Stack>
		</>
	);
};

const OrderPageContent = ({ order }: { order: OrderResponse }) => {
	const layout = useBreakpointValue({
		base: Layout.MOBILE,
		md: Layout.DESKTOP,
	});
	const isMobile = layout === Layout.MOBILE;

	return (
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

const SectionHeading = ({ children }: { children: string }) => (
	<Text
		fontWeight={500}
		fontSize={22}
		fontFamily={displayFontFamily}
	>
		{children}
	</Text>
);
