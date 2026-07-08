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
	STANDARD_IMAGE_ASPECT_RATIO,
} from '@client/constants';
import { FONT_DISPLAY_SANS } from '@client/theme';
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
};

export const ListingCard = ({
	actionMenu,
	showShopTitle,
	topRight,
	...props
}: Props) => {
	const navigate = useNavigate();

	const listingUrl = `/${CLIENT_ROUTES.listing}/${props.shortId}`;

	const displayPrice = getListingDisplayPrice(
		props.variations,
		props.combinations,
		props.priceCents,
	) ?? { priceCents: props.priceCents, isMinimum: false };

	const getImageUrl = (uuid: string) =>
		`${process.env.LISTING_IMAGES_URL}/${props.shopShortId}/${uuid}.jpg`;

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
			<MultiImage
				onImageClick={() => {
					navigate(listingUrl);
				}}
				aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
				urls={
					props.multiImage
						? props.imageUuids.map(getImageUrl)
						: [getImageUrl(props.imageUuids[0])]
				}
			/>

			<Card.Body
				p={3}
				pb={2}
				gap={1.5}
			>
				<Stack gap={0}>
					<RouterLink
						to={listingUrl}
						viewTransition
					>
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
						fontFamily={FONT_DISPLAY_SANS}
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
