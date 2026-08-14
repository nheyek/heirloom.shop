import { useAuth0 } from '@auth0/auth0-react';
import {
	Flex,
	HStack,
	Skeleton,
	Stack,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { AppError } from '@client/components/feedback/AppError';
import {
	OrderItemCard,
	STANDARD_THUMBNAIL_WIDTH,
} from '@client/components/itemDisplay/OrderItemCard';
import { Layout } from '@client/constants';
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

			<Flex
				direction={isMobile ? 'column' : 'row'}
				gapX={10}
				gapY={5}
				alignItems="start"
				fontSize={18}
			>
				<Stack
					width={isMobile ? '100%' : 300}
					flexShrink={0}
				>
					<SectionHeading>Summary</SectionHeading>
					<Stack gap={1}>
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
							<HStack
								key={label}
								justifyContent="space-between"
							>
								<Text>{label}</Text>
								<Text>{value}</Text>
							</HStack>
						))}
						<HStack
							justifyContent="space-between"
							fontWeight={500}
						>
							<Text>Total</Text>
							<Text>
								{formatCentsAsDollars(
									order.subtotalCents +
										order.shippingCents +
										order.taxCents,
								)}
							</Text>
						</HStack>
					</Stack>
				</Stack>

				<Stack>
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
								<Text key={index}>{line}</Text>
							))}
					</Stack>
				</Stack>
			</Flex>
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
