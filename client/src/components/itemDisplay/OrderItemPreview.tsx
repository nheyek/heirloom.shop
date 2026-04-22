import {
	Box,
	Button,
	Card,
	Center,
	Heading,
	HStack,
	Stack,
	Text,
} from '@chakra-ui/react';
import { MultiImage } from '@client/components/imageDisplay/MultiImage';
import {
	CLIENT_ROUTES,
	STANDARD_IMAGE_ASPECT_RATIO,
} from '@client/constants';
import { FONT_DECORATIVE, FONT_DISPLAY_SANS } from '@client/theme';
import { formatDateCompact } from '@client/utils/dateUtils';
import {
	OrderItemDisplayData,
	OrderResponse,
} from '@common/contract';
import { formatCentsAsDollars } from '@common/utils/priceDisplay';
import { IoReceipt } from 'react-icons/io5';
import { Link as RouterLink } from 'react-router-dom';

const MAX_ORDER_ITEM_PREVIEW_WIDTH = 450;
const CARD_WIDTH = 150;
const CARD_HEIGHT = CARD_WIDTH / STANDARD_IMAGE_ASPECT_RATIO;
const ROTATIONS = [0, 2, -1.5, 1, -2];
const OFFSETS = [
	{ x: 0, y: 0 },
	{ x: 3, y: 3 },
	{ x: -3, y: -3 },
];
const MAX_STACK_CARDS = 3;

const LabeledValue = ({
	label,
	value,
}: {
	label: string;
	value: string;
}) => (
	<Stack gap={0}>
		<Text
			fontSize={14}
			color="gray.600"
			textTransform="uppercase"
		>
			{label}
		</Text>
		<Text
			fontSize={20}
			lineHeight={1}
		>
			{value}
		</Text>
	</Stack>
);

const CardStack = ({ items }: { items: OrderItemDisplayData[] }) => {
	const visibleItems = items.slice(0, MAX_STACK_CARDS);
	const n = visibleItems.length;
	return (
		<Box
			position="relative"
			width={CARD_WIDTH}
			height={CARD_HEIGHT}
		>
			{visibleItems.map((item, index) => (
				<Box
					key={index}
					position="absolute"
					top={OFFSETS[index % OFFSETS.length].y}
					left={OFFSETS[index % OFFSETS.length].x}
					zIndex={n - index}
					style={{
						transform: `rotate(${ROTATIONS[index % ROTATIONS.length]}deg)`,
						transformOrigin: 'center center',
					}}
				>
					<Card.Root
						variant="elevated"
						width={CARD_WIDTH}
						flexShrink={0}
					>
						<MultiImage
							aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
							urls={
								item.imageUuid
									? [
											`${process.env.LISTING_IMAGES_URL}/${item.imageUuid}.jpg`,
										]
									: []
							}
						/>
					</Card.Root>
				</Box>
			))}
		</Box>
	);
};

type Props = {
	order: OrderResponse;
};

export const OrderItemPreview = ({ order }: Props) => {
	const total =
		order.subtotalCents + order.shippingCents + order.taxCents;

	return (
		<HStack
			width="100%"
			maxW={{
				base: undefined,
				md: MAX_ORDER_ITEM_PREVIEW_WIDTH,
			}}
			alignItems="center"
		>
			<Stack
				gap={1}
				pr={2}
			>
				<Heading
					fontSize={24}
					fontWeight={500}
					fontFamily={FONT_DECORATIVE}
				>
					{order.shortId}
				</Heading>
				<HStack
					gap={4}
					fontFamily={FONT_DISPLAY_SANS}
				>
					{order.createdAt && (
						<LabeledValue
							label="Placed"
							value={formatDateCompact(order.createdAt)}
						/>
					)}
					<LabeledValue
						label="Total"
						value={formatCentsAsDollars(total)}
					/>
				</HStack>
				<RouterLink
					to={`/${CLIENT_ROUTES.orders}/${order.shortId}`}
				>
					<Button
						size="xs"
						fontSize={16}
						gap={2}
						px={3}
						mt={2}
					>
						<IoReceipt />
						View details
					</Button>
				</RouterLink>
			</Stack>
			<Center width="100%">
				<CardStack items={order.items} />
			</Center>
		</HStack>
	);
};
