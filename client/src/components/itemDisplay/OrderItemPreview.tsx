import {
	Box,
	Card,
	Center,
	Heading,
	HStack,
	Link,
	Stack,
	Text,
} from '@chakra-ui/react';
import { MultiImage } from '@client/components/imageDisplay/MultiImage';
import {
	CLIENT_ROUTES,
	LISTING_IMAGE_ASPECT_RATIO,
} from '@client/constants';
import { displayFontFamily } from '@client/theme';
import { formatDateCompact } from '@client/utils/dateUtils';
import {
	OrderItemDisplayData,
	OrderResponse,
} from '@heirloom/common/contract';
import { formatCentsAsDollars } from '@heirloom/common/utils/priceDisplay';
import { Link as RouterLink } from 'react-router-dom';

const MAX_ORDER_ITEM_PREVIEW_WIDTH = 450;
const CARD_WIDTH = 150;
const CARD_HEIGHT = CARD_WIDTH / LISTING_IMAGE_ASPECT_RATIO;
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
	<Stack gap={0.5}>
		<Text
			fontSize={15}
			color="fg.muted"
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
							aspectRatio={LISTING_IMAGE_ASPECT_RATIO}
							urls={
								item.imageUuid
									? [
											`${process.env.LISTING_IMAGES_URL}/${item.shopShortId}/${item.imageUuid}.jpg`,
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
				gap={2}
				pr={2}
			>
				<Link asChild>
					<RouterLink
						to={`/${CLIENT_ROUTES.orders}/${order.shortId}`}
					>
						<Heading
							fontSize={24}
							fontWeight={500}
							fontFamily={displayFontFamily}
						>
							{order.shortId}
						</Heading>
					</RouterLink>
				</Link>
				<HStack gap={4}>
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
			</Stack>
			<Center width="100%">
				<CardStack items={order.items} />
			</Center>
		</HStack>
	);
};
