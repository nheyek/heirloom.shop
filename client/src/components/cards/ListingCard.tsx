import {
	Badge,
	Box,
	Card,
	Flex,
	IconButton,
	Link,
	Span,
	Stack,
	Text,
} from '@chakra-ui/react';
import { AppImage } from '@client/components/imageDisplay/AppImage';
import { ImagePlaceholder } from '@client/components/imageDisplay/ImagePlaceholder';
import { PriceTag } from '@client/components/textDisplay/PriceTag';
import {
	CLIENT_ROUTES,
	LISTING_IMAGE_ASPECT_RATIO,
} from '@client/constants';
import { displayFontFamily } from '@client/theme';
import { listingImageUrl } from '@client/utils/imageUtils';
import { ImageVariant } from '@heirloom/common/constants';
import { ListingCardData } from '@heirloom/common/contract';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { Link as RouterLink } from 'react-router-dom';

const BADGE_OVERLAY_MARGIN = 3;
const BADGE_OVERLAY_GAP = 1.5;

export type ListingCardIconMenuItem = {
	icon: IconType;
	onClick: () => void;
	color?: string;
};

export const ListingCardIconMenu = ({
	items,
}: {
	items: ListingCardIconMenuItem[];
}) => (
	<Flex
		alignItems="center"
		gap={1}
	>
		{items.map((item, i) => (
			<IconButton
				key={i}
				variant="ghost"
				size="lg"
				onClick={item.onClick}
				color={item.color}
			>
				<item.icon />
			</IconButton>
		))}
	</Flex>
);

type Props = ListingCardData & {
	actionMenu?: ReactNode;
	showShopTitle?: boolean;
	topRight?: ReactNode;
	topLeft?: ReactNode;
	onCardBodyClick?: () => void;
	onImageClick?: () => void;
};

export const ListingCard = ({
	actionMenu,
	showShopTitle,
	topRight,
	topLeft,
	onCardBodyClick,
	onImageClick,
	...props
}: Props) => {
	const listingUrl = `/${CLIENT_ROUTES.listing}/${props.shortId}`;

	const variationBadges = props.variations.map((variation) => (
		<Badge
			key={variation.name}
			fontSize={18}
			fontWeight={400}
			p={1.5}
			px={2.5}
		>
			<Span fontWeight={500}>{variation.numOptions}</Span>{' '}
			{variation.name.toLowerCase()} options
		</Badge>
	));

	return (
		<Card.Root
			variant="elevated"
			position="relative"
		>
			{topRight && (
				<Box
					position="absolute"
					top={2}
					right={2}
					zIndex={1}
				>
					{topRight}
				</Box>
			)}
			{topLeft && (
				<Box
					position="absolute"
					top={2}
					left={2}
					zIndex={1}
				>
					{topLeft}
				</Box>
			)}
			<Box
				onClick={onCardBodyClick}
				{...(onCardBodyClick && { cursor: 'pointer' })}
			>
				<Box position="relative">
					{props.heroImageUuid ? (
						<AppImage
							aspectRatio={LISTING_IMAGE_ASPECT_RATIO}
							fallbackSrc={listingImageUrl(
								props.shopShortId,
								props.heroImageUuid,
								ImageVariant.FULL,
							)}
							imageProps={{
								src: listingImageUrl(
									props.shopShortId,
									props.heroImageUuid,
									ImageVariant.SMALL,
								),
								onClick: onImageClick,
								...(onImageClick && {
									cursor: 'pointer',
								}),
							}}
						/>
					) : (
						<ImagePlaceholder
							aspectRatio={LISTING_IMAGE_ASPECT_RATIO}
						/>
					)}
					<Stack
						position="absolute"
						top={BADGE_OVERLAY_MARGIN}
						left={BADGE_OVERLAY_MARGIN}
						gap={BADGE_OVERLAY_GAP}
						alignItems="flex-start"
						pointerEvents="none"
					>
						{variationBadges}
					</Stack>
				</Box>

				<Card.Body
					p={3}
					pb={2}
					gap={1}
				>
					<Stack gap={0}>
						<RouterLink
							to={listingUrl}
							onClick={(e) => e.stopPropagation()}
						>
							<Link asChild>
								<Text
									fontSize={24}
									fontWeight={600}
									fontFamily={displayFontFamily}
									truncate
									display="block"
								>
									{props.title}
								</Text>
							</Link>
						</RouterLink>
						{showShopTitle && props.shopTitle && (
							<RouterLink
								to={`/${CLIENT_ROUTES.shop}/${props.shopShortId}`}
							>
								<Link asChild>
									<Text
										fontSize={20}
										fontFamily={displayFontFamily}
										truncate
										fontWeight="medium"
										display="block"
									>
										{props.shopTitle}
									</Text>
								</Link>
							</RouterLink>
						)}
					</Stack>

					<Text
						lineClamp={2}
						fontSize={18}
						h={11}
					>
						{props.subtitle}
					</Text>
				</Card.Body>
			</Box>
			<Card.Body
				py={0}
				px={3}
			>
				<Flex
					justifyContent="space-between"
					alignItems="center"
				>
					<Box mb={3}>
						<PriceTag
							priceCents={props.basePriceCents}
							isMinimum={props.priceVaries}
						/>
					</Box>
					<Box mb={2}>{actionMenu}</Box>
				</Flex>
			</Card.Body>
		</Card.Root>
	);
};
