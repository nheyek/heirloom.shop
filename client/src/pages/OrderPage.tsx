import {
	Box,
	Center,
	Heading,
	SimpleGrid,
	Span,
	Stack,
} from '@chakra-ui/react';
import { OrderItemCard } from '@client/components/itemDisplay/OrderItemCard';
import {
	STANDARD_GRID_COLUMNS,
	STANDARD_GRID_GAP,
} from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { FONT_DECORATIVE } from '@client/theme';
import { callApi } from '@client/utils/apiUtils';
import { OrderResponse } from '@common/contract';
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
		<Box
			position="absolute"
			top={0}
			bottom={0}
			left={0}
			right={0}
		>
			<Center>
				{error && <Box>{error}</Box>}
				{!error && orderDetails && (
					<Stack
						maxW={1000}
						w="100%"
						px={5}
						py={8}
						gap={5}
					>
						<Heading
							fontSize={32}
							fontFamily={FONT_DECORATIVE}
						>
							<Span fontWeight={400}>Order</Span>{' '}
							{orderDetails.shortId}
						</Heading>

						<SimpleGrid
							gap={STANDARD_GRID_GAP}
							columns={STANDARD_GRID_COLUMNS}
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
		</Box>
	);
};
