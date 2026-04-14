import {
	Box,
	Card,
	Heading,
	HStack,
	Link,
	Stack,
	Text,
} from '@chakra-ui/react';
import { MultiImage } from '@client/components/imageDisplay/MultiImage';
import {
	CLIENT_ROUTES,
	STANDARD_IMAGE_ASPECT_RATIO,
} from '@client/constants';
import { FONT_DECORATIVE, FONT_DISPLAY_SANS } from '@client/theme';
import {
	OrderItemDisplayData,
	OrderResponse,
} from '@common/contract';
import { formatCentsAsDollars } from '@common/utils/priceDisplay';
import { FaAngleRight } from 'react-icons/fa6';
import { Link as RouterLink } from 'react-router-dom';

const CARD_WIDTH = 150;
const CARD_HEIGHT = CARD_WIDTH / STANDARD_IMAGE_ASPECT_RATIO;
const OFFSET_X = 4;
const OFFSET_Y = 6;
const ROTATIONS = [0, 2, -1.5, 1, -2];

const MAX_STACK_CARDS = 3;

const CardStack = ({ items }: { items: OrderItemDisplayData[] }) => {
	const visibleItems = items.slice(0, MAX_STACK_CARDS);
	const n = visibleItems.length;
	return (
		<Box
			position="relative"
			flexShrink={0}
			width={CARD_WIDTH}
			height={CARD_HEIGHT}
		>
			{visibleItems.map((item, index) => (
				<Box
					key={index}
					position="absolute"
					top={index * OFFSET_Y}
					left={index * OFFSET_X}
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
	const formattedDate = order.createdAt
		? new Date(order.createdAt).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			})
		: null;

	return (
		<HStack
			alignItems="center"
			gap={8}
			justifyContent="space-between"
		>
			<CardStack items={order.items} />

			<Stack gap={3}>
				<HStack gap={3}>
					<Link asChild>
						<RouterLink
							to={`/${CLIENT_ROUTES.order}/${order.shortId}`}
						>
							<Heading
								fontSize={28}
								fontFamily={FONT_DECORATIVE}
								fontWeight={600}
								lineHeight={1}
							>
								{order.shortId}
							</Heading>
						</RouterLink>
					</Link>
				</HStack>

				<Stack
					gap={1.5}
					fontFamily={FONT_DISPLAY_SANS}
					lineHeight={1}
					fontSize={20}
				>
					{formattedDate && <Text>{formattedDate}</Text>}
					<Text>{formatCentsAsDollars(total)}</Text>
				</Stack>

				{/* <RouterLink
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
				</RouterLink> */}
			</Stack>
			<FaAngleRight size={24} />
		</HStack>
	);
};
