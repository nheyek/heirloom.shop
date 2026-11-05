import {
	Badge,
	Box,
	Card,
	Flex,
	HStack,
	Span,
	Stack,
	Text,
	Wrap,
} from '@chakra-ui/react';
import {
	BADGE_OVERLAY_PROPS,
	BadgeOverlay,
	CARD_SHOP_TITLE_PROPS,
	CARD_TITLE_PROPS,
} from '@client/components/cards/ListingCard';
import { MultiImage } from '@client/components/imageDisplay/MultiImage';
import { PriceTag } from '@client/components/textDisplay/PriceTag';
import {
	Layout,
	LISTING_IMAGE_ASPECT_RATIO,
	CARD_WIDTH,
} from '@client/constants';
import {
	ImageSource,
	listingImageUrl,
} from '@client/utils/imageUtils';
import {
	DELIVERY_ESTIMATE_UNAVAILABLE_TEXT,
	ImageVariant,
} from '@heirloom/common/constants';
import { OrderItemDisplayData } from '@heirloom/common/contract';
import { ReactNode } from 'react';
import { FaSignature } from 'react-icons/fa';
import { FaTruck } from 'react-icons/fa6';

const PERSONALIZATION_BADGE_MAX_CHARS = 16;
export const ORDER_ITEM_THUMBNAIL_WIDTH = 200;

const truncatePersonalizationText = (text: string): string =>
	text.length > PERSONALIZATION_BADGE_MAX_CHARS
		? `${text.slice(0, PERSONALIZATION_BADGE_MAX_CHARS)}...`
		: text;

type Props = {
	item: OrderItemDisplayData;
	imageOverlayElements?: ReactNode;
	layout?: Layout;
	showQuantity?: boolean;
};

export const OrderItemCard = (props: Props) => {
	const isDesktop = props.layout === Layout.DESKTOP;

	const imageSource: ImageSource | undefined = props.item.imageUuid
		? {
				url: listingImageUrl(
					props.item.shopShortId,
					props.item.imageUuid,
					ImageVariant.SMALL,
				),
				fallback: listingImageUrl(
					props.item.shopShortId,
					props.item.imageUuid,
					ImageVariant.FULL,
				),
			}
		: undefined;

	const basicInfo = (
		<Stack gap={0}>
			<Text
				{...CARD_TITLE_PROPS}
				display="flex"
				alignItems="baseline"
				gap={1}
				minW={0}
			>
				<Span
					truncate
					minW={0}
				>
					{props.item.title}
				</Span>
				{props.showQuantity && props.item.quantity > 1 && (
					<Span flexShrink={0}>
						({props.item.quantity})
					</Span>
				)}
			</Text>

			{props.item.shopName && (
				<Text
					{...CARD_SHOP_TITLE_PROPS}
					truncate
				>
					{props.item.shopName}
				</Text>
			)}
		</Stack>
	);

	const secondaryInfoBadges = (props.item.variations.length > 0 ||
		props.item.personalizationText) && (
		<Wrap gap={2}>
			{props.item.variations.map(({ name, value }) => (
				<Badge
					size="lg"
					key={name}
					fontSize={18}
					fontWeight={500}
				>
					{name}: {value}
				</Badge>
			))}
			{props.item.personalizationText && (
				<Badge
					size="lg"
					fontSize={18}
					gap={2}
				>
					<FaSignature />
					<Span>
						{truncatePersonalizationText(
							props.item.personalizationText,
						)}
					</Span>
				</Badge>
			)}
		</Wrap>
	);

	const overlayBadges = (
		<BadgeOverlay>
			{props.item.variations.map(({ name, value }) => (
				<Badge
					key={name}
					{...BADGE_OVERLAY_PROPS}
					fontWeight={500}
				>
					{name}: {value}
				</Badge>
			))}
			{props.item.personalizationText && (
				<Badge
					{...BADGE_OVERLAY_PROPS}
					gap={2}
				>
					<FaSignature />
					<Span>
						{truncatePersonalizationText(
							props.item.personalizationText,
						)}
					</Span>
				</Badge>
			)}
		</BadgeOverlay>
	);

	const priceAndShipping = (
		<Flex
			alignItems="center"
			justifyContent="space-between"
		>
			<PriceTag
				priceCents={props.item.unitPriceCents}
				quantity={props.item.quantity}
			/>
		</Flex>
	);

	const estimatedDelivery = (
		<HStack
			fontSize={18}
			lineHeight={1}
			mt={1}
		>
			<FaTruck size={20} />
			{props.item.estimatedDelivery ? (
				<HStack gap={1}>
					<Span>Estimated delivery</Span>
					<Span fontWeight={500}>
						{props.item.estimatedDelivery}
					</Span>
				</HStack>
			) : (
				<Span fontWeight={500}>
					{DELIVERY_ESTIMATE_UNAVAILABLE_TEXT}
				</Span>
			)}
		</HStack>
	);

	if (isDesktop) {
		return (
			<Card.Root
				variant="elevated"
				flexDirection="row"
				width="100%"
			>
				<Box
					width={ORDER_ITEM_THUMBNAIL_WIDTH}
					flexShrink={0}
					position="relative"
				>
					<MultiImage
						aspectRatio={LISTING_IMAGE_ASPECT_RATIO}
						urls={imageSource ? [imageSource] : []}
					/>
					{props.imageOverlayElements}
				</Box>

				<Card.Body
					p={3}
					justifyContent="space-between"
					minW={0}
					flex="1"
				>
					<Stack gap={3}>
						{basicInfo}
						{secondaryInfoBadges}
						{priceAndShipping}
					</Stack>
					{estimatedDelivery}
				</Card.Body>
			</Card.Root>
		);
	}

	return (
		<Card.Root
			position="relative"
			variant="elevated"
			width={CARD_WIDTH}
			flexShrink={0}
		>
			<Box position="relative">
				<MultiImage
					aspectRatio={LISTING_IMAGE_ASPECT_RATIO}
					urls={imageSource ? [imageSource] : []}
				/>
				{overlayBadges}
				{props.imageOverlayElements}
			</Box>

			<Card.Body
				p={3}
				gap={3}
				justifyContent="space-between"
			>
				{basicInfo}
				{priceAndShipping}
				{estimatedDelivery}
			</Card.Body>
		</Card.Root>
	);
};
