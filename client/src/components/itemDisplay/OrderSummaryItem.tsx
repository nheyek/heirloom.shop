import { HStack, Span, Stack, Text } from '@chakra-ui/react';
import { FONT_DECORATIVE, FONT_DISPLAY_SANS } from '@client/theme';
import { OrderResponse } from '@common/contract';
import { formatCentsAsDollars } from '@common/utils/priceDisplay';

type Props = {
	order: OrderResponse;
};

export const OrderSummaryCard = ({ order }: Props) => {
	const total =
		order.subtotalCents + order.shippingCents + order.taxCents;
	const formattedDate = order.createdAt
		? new Date(order.createdAt).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			})
		: null;

	return (
		<HStack
			justifyContent="space-between"
			alignItems="start"
		>
			<Stack
				gap={1}
				fontFamily={FONT_DISPLAY_SANS}
			>
				<Text
					fontSize={24}
					fontFamily={FONT_DECORATIVE}
				>
					Order{' '}
					<Span fontWeight={500}>{order.shortId}</Span>
				</Text>
				{formattedDate && (
					<Text fontSize={20}>{formattedDate}</Text>
				)}
				<Text
					fontSize={20}
					fontWeight={500}
				>
					{formatCentsAsDollars(total)}
				</Text>
			</Stack>
		</HStack>
	);
};
