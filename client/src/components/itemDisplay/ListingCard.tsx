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
};

export const ListingCard = ({ actionMenu, ...props }: Props) => {
	const navigate = useNavigate();

	const listingUrl = `/${CLIENT_ROUTES.listing}/${props.shortId}`;

	const getImageUrl = (uuid: string) =>
		`${process.env.LISTING_IMAGES_URL}/${props.shopShortId}/${uuid}.jpg`;

	return (
		<Card.Root variant="elevated">
			<Box opacity={props.active ? 1 : 0.45}>
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
			</Box>

			<Card.Body
				p={3}
				pb={2}
				gap={1.5}
				opacity={props.active ? 1 : 0.45}
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
					{props.shopTitle && (
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
				pt={0}
				pb={2}
				px={3}
			>
				<Flex
					justifyContent="space-between"
					alignItems="center"
				>
					<Box opacity={props.active ? 1 : 0.5}>
						<PriceTag priceCents={props.priceCents} />
					</Box>
					{actionMenu}
				</Flex>
			</Card.Body>
		</Card.Root>
	);
};
