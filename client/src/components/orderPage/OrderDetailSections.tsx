import {
	Flex,
	HStack,
	Link,
	List,
	Skeleton,
	Stack,
	Text,
	Timeline,
	useBreakpointValue,
} from '@chakra-ui/react';
import { OrderItemCard } from '@client/components/cards/OrderItemCard';
import { InfoPopover } from '@client/components/misc/InfoPopover';
import { Layout } from '@client/constants';
import { useOrderItemCardLayout } from '@client/hooks/useOrderItemCardLayout';
import { displayFontFamily } from '@client/theme';
import { formatDateLong } from '@client/utils/dateUtils';
import { OrderStatus } from '@heirloom/common/constants';
import {
	OrderItemDisplayData,
	OrderResponse,
	OrderTimelineEntry,
	PaymentDetails,
	Shipment,
} from '@heirloom/common/contract';
import { formatPaymentDetails } from '@heirloom/common/utils/paymentDisplay';
import { formatCentsAsDollars } from '@heirloom/common/utils/priceDisplay';
import { formatShippingAddress } from '@heirloom/common/utils/shippingAddress';
import { getShipmentTrackingUrl } from '@heirloom/common/utils/shippingTracking';
import { capitalize } from '@heirloom/common/utils/stringUtils';
import { IconType } from 'react-icons';
import { FaCheck } from 'react-icons/fa';
import {
	FaBox,
	FaCcAmex,
	FaCcApplePay,
	FaCcDinersClub,
	FaCcDiscover,
	FaCcJcb,
	FaCcMastercard,
	FaCcVisa,
	FaCreditCard,
	FaTruck,
} from 'react-icons/fa6';

const ORDER_ITEM_SKELETON_COUNT = 1;
const ORDER_ITEM_SKELETON_HEIGHT_DESKTOP = 175;
const ORDER_ITEM_SKELETON_HEIGHT_MOBILE = 340;
const ORDER_ITEM_SKELETON_WIDTH_MOBILE = 300;
const TIMELINE_SKELETON_HEIGHT = 90;

const TIMELINE_STATUS_ICONS: Partial<Record<OrderStatus, IconType>> =
	{
		[OrderStatus.CONFIRMED]: FaCheck,
		[OrderStatus.SHIPPED]: FaTruck,
	};

export const SectionHeading = ({
	children,
}: {
	children: string;
}) => (
	<Text
		fontWeight={500}
		fontSize={22}
		fontFamily={displayFontFamily}
	>
		{children}
	</Text>
);

const ShipmentsPopoverContent = ({
	shipments,
}: {
	shipments: Shipment[];
}) => (
	<Stack gap={2}>
		<Text
			fontFamily={displayFontFamily}
			fontSize={20}
			fontWeight={500}
		>
			Tracking
		</Text>

		<List.Root
			gap={2}
			variant="plain"
		>
			{shipments.map((shipment, i) => (
				<List.Item>
					<HStack
						gap={1}
						key={i}
					>
						<List.Indicator asChild>
							<FaBox />
						</List.Indicator>
						<Link
							href={getShipmentTrackingUrl(shipment)}
							target="_blank"
							fontSize={20}
						>
							{shipment.tracking}
						</Link>
					</HStack>
				</List.Item>
			))}
		</List.Root>
	</Stack>
);

export const OrderDetailTimeline = ({
	timeline,
	shipments,
}: {
	timeline: OrderTimelineEntry[];
	shipments: Shipment[];
}) => {
	if (timeline.length === 0) return null;

	return (
		<Timeline.Root
			size="xl"
			variant="outline"
		>
			{timeline.map((entry, i) => {
				const Icon = TIMELINE_STATUS_ICONS[entry.status];
				return (
					<Timeline.Item key={i}>
						<Timeline.Connector>
							<Timeline.Separator />
							<Timeline.Indicator>
								{Icon && <Icon size={16} />}
							</Timeline.Indicator>
						</Timeline.Connector>
						<Timeline.Content>
							<Timeline.Title
								fontSize={22}
								display="flex"
								alignItems="center"
							>
								{capitalize(entry.status)}
								{entry.status ===
									OrderStatus.SHIPPED &&
									shipments.length > 0 && (
										<InfoPopover maxWidth={375}>
											<ShipmentsPopoverContent
												shipments={shipments}
											/>
										</InfoPopover>
									)}
							</Timeline.Title>
							<Timeline.Description fontSize={20}>
								{formatDateLong(entry.timestamp)}
								{entry.info && ` — ${entry.info}`}
							</Timeline.Description>
						</Timeline.Content>
					</Timeline.Item>
				);
			})}
		</Timeline.Root>
	);
};

export const OrderDetailTimelineSkeleton = () => (
	<Skeleton
		height={TIMELINE_SKELETON_HEIGHT}
		width="100%"
	/>
);

export const OrderDetailItemsList = ({
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
			showQuantity
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

export const OrderDetailItemsListSkeleton = () => {
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

export const OrderDetailSummaryAndShipping = ({
	order,
}: {
	order: OrderResponse;
}) => {
	const layout = useBreakpointValue({
		base: Layout.MOBILE,
		md: Layout.DESKTOP,
	});
	const isMobile = layout === Layout.MOBILE;

	return (
		<Flex
			direction={isMobile ? 'column' : 'row'}
			gapX={55}
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
					{formatShippingAddress(order.shippingAddress)}
				</Text>
			</Stack>
		</Flex>
	);
};

export const OrderDetailSummaryAndShippingSkeleton = () => {
	const layout = useBreakpointValue({
		base: Layout.MOBILE,
		md: Layout.DESKTOP,
	});
	const isMobile = layout === Layout.MOBILE;

	return (
		<Flex
			direction={isMobile ? 'column' : 'row'}
			gapX={55}
			gapY={5}
			alignItems="start"
		>
			<Skeleton
				flexShrink={0}
				width={isMobile ? '100%' : 200}
				height={175}
			/>
			<Skeleton
				flexShrink={0}
				width={180}
				height={150}
			/>
		</Flex>
	);
};

const CARD_BRAND_ICONS: Partial<Record<string, IconType>> = {
	visa: FaCcVisa,
	mastercard: FaCcMastercard,
	amex: FaCcAmex,
	discover: FaCcDiscover,
	diners: FaCcDinersClub,
	jcb: FaCcJcb,
};

const WALLET_ICONS: Partial<Record<string, IconType>> = {
	apple_pay: FaCcApplePay,
};

const PaymentDetailsDisplay = ({
	paymentDetails,
}: {
	paymentDetails: PaymentDetails;
}) => {
	const { cardBrand, walletType } = paymentDetails;

	const Icon =
		(walletType && WALLET_ICONS[walletType]) ||
		CARD_BRAND_ICONS[cardBrand] ||
		FaCreditCard;

	return (
		<HStack fontSize={20}>
			<Icon size={22} />
			<Text>{formatPaymentDetails(paymentDetails)}</Text>
		</HStack>
	);
};

export const OrderDetailPaymentSection = ({
	paymentDetails,
}: {
	paymentDetails: PaymentDetails;
}) => (
	<Stack gap={1}>
		<SectionHeading>Payment</SectionHeading>
		<PaymentDetailsDisplay paymentDetails={paymentDetails} />
	</Stack>
);

export const OrderDetailPaymentSectionSkeleton = () => (
	<Skeleton
		width="100%"
		height={75}
	/>
);
