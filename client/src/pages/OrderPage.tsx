import {
	Box,
	Center,
	DataList,
	GridItem,
	Heading,
	HStack,
	SimpleGrid,
	Skeleton,
	Span,
	Stack,
	Text,
	useBreakpointValue,
	Wrap,
} from '@chakra-ui/react';
import { OrderItemCard } from '@client/components/itemDisplay/OrderItemCard';
import { STANDARD_GRID_GAP } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { FONT_DECORATIVE, FONT_DISPLAY_SANS } from '@client/theme';
import { callApi } from '@client/utils/apiUtils';
import { OrderResponse } from '@common/contract';
import { formatCentsAsDollars } from '@common/utils/priceDisplay';
import { formatShippingAddress } from '@common/utils/shippingAddress';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

export const OrderPage = () => {
	const apiClient = useApiClient();
	const { shortId } = useParams<{ shortId: string }>();

	const [searchParams] = useSearchParams();
	const key = searchParams.get('key') ?? '';

	const numColumns =
		useBreakpointValue({ base: 1, md: 2, lg: 3, xl: 4 }) ?? 1;

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

	return (
		<Center
			py={{ base: 5, md: 10 }}
			px={5}
		>
			{error && <Box>{error}</Box>}
			{!error && isLoading && (
				<Stack
					w={{ base: '100%', md: 'fit-content' }}
					maxW={1200}
					gap={5}
				>
					<Skeleton
						height={10}
						width={150}
					/>

					<Skeleton
						height={100}
						width={250}
					/>

					<Wrap
						gap={STANDARD_GRID_GAP}
						alignItems="start"
					>
						{Array.from({ length: 3 }).map((_, i) => (
							<Skeleton
								key={i}
								width={350}
								height={350}
							/>
						))}
					</Wrap>
				</Stack>
			)}
			{!error && orderDetails && (
				<Stack
					w={{ base: '100%', md: 'fit-content' }}
					maxW={1200}
					gap={5}
					fontFamily={FONT_DISPLAY_SANS}
				>
					<Heading
						fontSize={32}
						fontFamily={FONT_DECORATIVE}
					>
						<Span fontWeight={400}>Order</Span>{' '}
						{orderDetails.shortId}
					</Heading>

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
											orderDetails.subtotalCents,
										),
									},
									{
										label: 'Shipping',
										value: formatCentsAsDollars(
											orderDetails.shippingCents,
										),
									},
									{
										label: 'Tax',
										value: formatCentsAsDollars(
											orderDetails.taxCents,
										),
									},
									{
										label: 'Total',
										value: formatCentsAsDollars(
											orderDetails.subtotalCents +
												orderDetails.shippingCents +
												orderDetails.taxCents,
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
										<DataList.ItemValue
											fontSize={18}
										>
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
								{formatShippingAddress(
									orderDetails.shippingAddress,
								)}{' '}
							</Text>
						</Stack>
					</HStack>

					<SimpleGrid
						gap={STANDARD_GRID_GAP}
						columns={Math.min(
							numColumns,
							orderDetails.items.length,
						)}
						alignItems="start"
						width="fit-content"
					>
						{orderDetails.items.map((item, index) => (
							<GridItem
								maxW={350}
								key={index}
							>
								<OrderItemCard
									key={index}
									item={item}
								/>
							</GridItem>
						))}
					</SimpleGrid>
				</Stack>
			)}
		</Center>
	);
};
