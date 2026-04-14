import {
	Button,
	Heading,
	HStack,
	Link,
	Stack,
	Text,
} from '@chakra-ui/react';
import { OrderItemPreviewCard } from '@client/components/itemDisplay/OrderItemPreviewCard';
import { CLIENT_ROUTES } from '@client/constants';
import { FONT_DECORATIVE, FONT_DISPLAY_SANS } from '@client/theme';
import { OrderResponse } from '@common/contract';
import { formatCentsAsDollars } from '@common/utils/priceDisplay';
import { IoReceipt } from 'react-icons/io5';
import { Link as RouterLink } from 'react-router-dom';

type Props = {
	order: OrderResponse;
};

export const OrderSummaryItem = ({ order }: Props) => {
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
			gap={8}
		>
			<Stack gap={3}>
				<Link>
					<Heading
						fontSize={28}
						fontFamily={FONT_DECORATIVE}
						fontWeight={500}
						lineHeight={1}
					>
						{order.shortId}
					</Heading>
				</Link>
				<Stack
					gap={1.5}
					fontFamily={FONT_DISPLAY_SANS}
					lineHeight={1}
				>
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

				<RouterLink
					to={`/${CLIENT_ROUTES.order}/${order.shortId}`}
				>
					<Button
						height={30}
						fontSize={16}
						padding={4}
					>
						<IoReceipt />
						View details
					</Button>
				</RouterLink>
			</Stack>
			<HStack gap={3}>
				{order.items.map((item, index) => (
					<OrderItemPreviewCard
						key={index}
						item={item}
					/>
				))}
			</HStack>
		</HStack>
	);
};
