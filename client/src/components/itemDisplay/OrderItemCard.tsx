import {
	Badge,
	Box,
	Card,
	CardRootProps,
	Flex,
	Heading,
	Span,
	Stack,
	Wrap,
} from '@chakra-ui/react';
import { MultiImage } from '@client/components/imageDisplay/MultiImage';
import { PriceTag } from '@client/components/textDisplay/PriceTag';
import {
	Layout,
	LISTING_IMAGE_ASPECT_RATIO,
} from '@client/constants';
import { ImageSource, listingImageUrl } from '@client/utils/imageUtils';
import { ImageVariant } from '@heirloom/common/constants';
import { OrderItemDisplayData } from '@heirloom/common/contract';
import { ReactNode } from 'react';
import { FaSignature } from 'react-icons/fa';

const PERSONALIZATION_BADGE_MAX_CHARS = 16;
export const STANDARD_THUMBNAIL_WIDTH = 160;

const truncatePersonalizationText = (text: string): string =>
	text.length > PERSONALIZATION_BADGE_MAX_CHARS
		? `${text.slice(0, PERSONALIZATION_BADGE_MAX_CHARS)}...`
		: text;

type Props = {
	item: OrderItemDisplayData;
	cardProps?: CardRootProps;
	imageActionElements?: ReactNode;
	bodyActionElements?: ReactNode;
	layout?: Layout;
};

export const OrderItemCard = (props: Props) => {
	const isStandard = props.layout === Layout.STANDARD;

	const imageSource: ImageSource | undefined = props.item.imageUuid
		? {
				url: listingImageUrl(
					props.item.shopShortId,
					props.item.imageUuid,
					ImageVariant.THUMB,
				),
				fallback: listingImageUrl(
					props.item.shopShortId,
					props.item.imageUuid,
					ImageVariant.FULL,
				),
			}
		: undefined;

	const basicInfo = (
		<Stack
			gap={0}
			pr={isStandard ? 12 : 0}
		>
			<Heading
				size="2xl"
				fontWeight="semibold"
				truncate
				display="block"
			>
				{props.item.title}
			</Heading>

			{props.item.shopName && (
				<Heading
					truncate
					fontWeight="medium"
					lineHeight={1.2}
					display="block"
				>
					{props.item.shopName}
				</Heading>
			)}
		</Stack>
	);

	const badges = (props.item.variations.length > 0 ||
		props.item.personalizationText) && (
		<Wrap gap={2}>
			{props.item.variations.map(({ name, value }) => (
				<Badge
					size="lg"
					key={name}
					fontSize={18}
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

	if (isStandard) {
		return (
			<Card.Root
				variant="elevated"
				flexDirection="row"
				width="100%"
				{...props.cardProps}
			>
				<Box
					width={STANDARD_THUMBNAIL_WIDTH}
					flexShrink={0}
					position="relative"
				>
					<MultiImage
						aspectRatio={LISTING_IMAGE_ASPECT_RATIO}
						urls={imageSource ? [imageSource] : []}
					/>
					{props.imageActionElements}
				</Box>

				<Card.Body
					p={3}
					gap={2}
					justifyContent="space-between"
					minW={0}
					flex="1"
					position="relative"
				>
					{props.bodyActionElements}
					<Stack gap={2}>
						{basicInfo}
						{badges}
					</Stack>
					{priceAndShipping}
				</Card.Body>
			</Card.Root>
		);
	}

	return (
		<Card.Root
			variant="elevated"
			maxWidth={400}
			{...props.cardProps}
		>
			<Box position="relative">
				<MultiImage
					aspectRatio={LISTING_IMAGE_ASPECT_RATIO}
					urls={imageSource ? [imageSource] : []}
				/>
				{props.imageActionElements}
			</Box>

			<Card.Body
				p={3}
				gap={2}
				justifyContent="space-between"
			>
				{basicInfo}
				{badges}
				{priceAndShipping}
			</Card.Body>
		</Card.Root>
	);
};
