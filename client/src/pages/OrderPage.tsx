import {
	Box,
	Center,
	DataList,
	Heading,
	HStack,
	SimpleGrid,
	Skeleton,
	Span,
	Stack,
	Text,
} from '@chakra-ui/react';
import { OrderItemCard } from '@client/components/itemDisplay/OrderItemCard';
import {
	STANDARD_GRID_COLUMNS,
	STANDARD_GRID_GAP,
} from '@client/constants';
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
		<Center>
			{error && <Box>{error}</Box>}
			{!error && isLoading && (
				<Stack
					maxW={1200}
					w="100%"
					py={10}
					px={5}
					gap={5}
				>
					<Skeleton
						height={10}
						width={300}
					/>
					<HStack
						gap={10}
						alignItems="start"
					>
						<Skeleton
							height={100}
							width={200}
						/>
						<Skeleton
							height={100}
							width={200}
						/>
					</HStack>
					<SimpleGrid
						gap={STANDARD_GRID_GAP}
						columns={STANDARD_GRID_COLUMNS}
						alignItems="start"
					>
						{Array.from({ length: 3 }).map((_, i) => (
							<Skeleton
								key={i}
								height={300}
							/>
						))}
					</SimpleGrid>
				</Stack>
			)}
			{!error && orderDetails && (
				<Stack
					maxW={1200}
					w="100%"
					py={10}
					px={5}
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
						columns={STANDARD_GRID_COLUMNS}
						alignItems="start"
					>
						{orderDetails.items.map((item, index) => (
							<OrderItemCard
								key={index}
								item={item}
							/>
						))}
					</SimpleGrid>
				</Stack>
			)}
		</Center>
	);
};
