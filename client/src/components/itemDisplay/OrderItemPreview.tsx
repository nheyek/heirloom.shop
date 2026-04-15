import {
	Box,
	Button,
	Card,
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

const CARD_WIDTH = 150;
const CARD_HEIGHT = CARD_WIDTH / STANDARD_IMAGE_ASPECT_RATIO;
const OFFSET_X = 3;
const OFFSET_Y = 4;
const ROTATIONS = [0, 2, -1.5, 1, -2];

const MAX_STACK_CARDS = 3;

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

	return (
		<HStack
			width={{ base: '100%', md: 350 }}
			justifyContent={{
				base: 'space-around',
				md: 'space-between',
			}}
			alignItems="center"
		>
			<Stack
				gap={2}
				w={150}
			>
				<Heading
					fontSize={30}
					fontWeight={400}
					fontFamily={FONT_DECORATIVE}
				>
					{order.shortId}
				</Heading>
				<HStack
					gap={4}
					fontFamily={FONT_DISPLAY_SANS}
				>
					{order.createdAt && (
						<Stack gap={0}>
							<Text
								fontSize={14}
								color="gray.600"
								textTransform="uppercase"
							>
								Placed
							</Text>
							<Text
								fontSize={20}
								lineHeight={1}
							>
								{formatDateCompact(order.createdAt)}
							</Text>
						</Stack>
					)}
					<Stack gap={0}>
						<Text
							fontSize={14}
							color="gray.600"
							textTransform="uppercase"
						>
							Total
						</Text>
						<Text
							fontSize={20}
							lineHeight={1}
						>
							{formatCentsAsDollars(total)}
						</Text>
					</Stack>
				</HStack>
				<RouterLink
					to={`/${CLIENT_ROUTES.order}/${order.shortId}`}
				>
					<Button
						size="xs"
						fontSize={16}
						gap={2}
						px={3}
						mt={1}
					>
						<IoReceipt />
						View details
					</Button>
				</RouterLink>
			</Stack>
			<CardStack items={order.items} />
		</HStack>
	);
};
