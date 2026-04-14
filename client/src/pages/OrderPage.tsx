import { useAuth0 } from '@auth0/auth0-react';
import {
	Box,
	DataList,
	Heading,
	HStack,
	Link,
	Skeleton,
	Span,
	Stack,
	Text,
} from '@chakra-ui/react';
import { OrderItemCard } from '@client/components/itemDisplay/OrderItemCard';
import { ItemGrid } from '@client/components/layout/ItemGrid';
import { CLIENT_ROUTES } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { FONT_DECORATIVE, FONT_DISPLAY_SANS } from '@client/theme';
import { callApi } from '@client/utils/apiUtils';
import { OrderResponse } from '@common/contract';
import { formatCentsAsDollars } from '@common/utils/priceDisplay';
import { formatShippingAddress } from '@common/utils/shippingAddress';
import { useEffect, useState } from 'react';
import {
	Link as RouterLink,
	useParams,
	useSearchParams,
} from 'react-router-dom';

export const OrderPage = () => {
	const apiClient = useApiClient();
	const { shortId } = useParams<{ shortId: string }>();
	const { isAuthenticated, isLoading: authIsLoading } = useAuth0();

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
				height={10}
				width={150}
			/>
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
			<Heading
				fontSize={40}
				fontFamily={FONT_DECORATIVE}
				fontWeight={500}
			>
				{isAuthenticated ? (
					<>
						<Link
							asChild
							fontWeight={400}
						>
							<RouterLink
								to={`/${CLIENT_ROUTES.orders}`}
							>
								Orders
							</RouterLink>
						</Link>
						{' / '}
					</>
				) : (
					<Span fontWeight={400}>Order </Span>
				)}
				{order.shortId}
			</Heading>

			<HStack
				gap={10}
				alignItems="start"
				fontSize={18}
			>
				<Stack gap={0}>
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
				<Stack gap={0}>
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
				columns={{ base: 1, sm: 2, lg: 3 }}
				maxItemWidth={300}
				renderItem={(item) => <OrderItemCard item={item} />}
			/>
		</>
	);

	return (
		<Box
			py={10}
			px={5}
		>
			{error && <Box>{error}</Box>}
			{!error && (isLoading || orderDetails) && (
				<Stack
					w={{ base: '100%', md: 'fit-content' }}
					maxW={1200}
					gap={8}
					fontFamily={FONT_DISPLAY_SANS}
				>
					{isLoading || authIsLoading
						? renderSkeleton()
						: renderContent(orderDetails!)}
				</Stack>
			)}
		</Box>
	);
};
