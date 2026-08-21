import {
	Box,
	Card,
	Flex,
	Heading,
	IconButton,
	Link,
	Stack,
	Text,
} from '@chakra-ui/react';
import { MultiImage } from '@client/components/imageDisplay/MultiImage';
import { PriceTag } from '@client/components/textDisplay/PriceTag';
import {
	CLIENT_ROUTES,
	LISTING_IMAGE_ASPECT_RATIO,
} from '@client/constants';
import { ImageSource, listingImageUrl } from '@client/utils/imageUtils';
import { ImageVariant } from '@heirloom/common/constants';
import { ListingCardData } from '@heirloom/common/contract';
import { getListingDisplayPrice } from '@heirloom/common/domain/listing';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

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
	multiImage?: boolean;
	actionMenu?: ReactNode;
	showShopTitle?: boolean;
	topRight?: ReactNode;
	topLeft?: ReactNode;
};

export const ListingCard = ({
	actionMenu,
	showShopTitle,
	topRight,
	topLeft,
	...props
}: Props) => {
	const navigate = useNavigate();

	const listingUrl = `/${CLIENT_ROUTES.listing}/${props.shortId}`;

	const displayPrice = getListingDisplayPrice(
		props.variations,
		props.combinations,
		props.priceCents,
	) ?? { priceCents: props.priceCents, isMinimum: false };

	const getImageSource = (uuid: string): ImageSource => ({
		url: listingImageUrl(props.shopShortId, uuid, ImageVariant.SMALL),
		fallback: listingImageUrl(
			props.shopShortId,
			uuid,
			ImageVariant.FULL,
		),
	});

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
			<MultiImage
				onImageClick={() => {
					navigate(listingUrl);
				}}
				aspectRatio={LISTING_IMAGE_ASPECT_RATIO}
				urls={
					props.multiImage
						? props.imageUuids.map(getImageSource)
						: [getImageSource(props.imageUuids[0])]
				}
			/>

			<Card.Body
				p={3}
				pb={2}
				gap={1.5}
			>
				<Stack gap={0}>
					<RouterLink to={listingUrl}>
						<Link asChild>
							<Heading
								size="2xl"
								fontWeight="semibold"
								truncate
								display="block"
							>
								{props.title}
							</Heading>
						</Link>
					</RouterLink>
					{showShopTitle && props.shopTitle && (
						<RouterLink
							to={`/${CLIENT_ROUTES.shop}/${props.shopShortId}`}
						>
							<Link asChild>
								<Heading
									truncate
									fontWeight="medium"
									lineHeight={1.1}
									display="block"
								>
									{props.shopTitle}
								</Heading>
							</Link>
						</RouterLink>
					)}
				</Stack>

				<Stack
					gap={1}
					justifyContent="space-between"
					flexGrow={1}
				>
					<Text
						lineClamp={2}
						fontSize={18}
					>
						{props.subtitle}
					</Text>
				</Stack>
			</Card.Body>
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
							priceCents={displayPrice.priceCents}
							isMinimum={displayPrice.isMinimum}
						/>
					</Box>
					<Box mb={2}>{actionMenu}</Box>
				</Flex>
			</Card.Body>
		</Card.Root>
	);
};
