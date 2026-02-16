import {
	Box,
	Card,
	Flex,
	Heading,
	IconButton,
	Link,
	Stack,
} from '@chakra-ui/react';
import { ListingCardData } from '@common/types/ListingCardData';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FaRegShareFromSquare } from 'react-icons/fa6';
import { Link as RouterLink } from 'react-router-dom';
import {
	CLIENT_ROUTES,
	STANDARD_IMAGE_ASPECT_RATIO,
} from '../../constants';
import { useShareListing } from '../../hooks/useShareListing';
import { useFavorites } from '../../providers/FavoritesProvider';
import { FONT_DISPLAY_SLAB } from '../../theme';
import { MultiImage } from '../imageDisplay/MultiImage';
import { PriceTag } from '../textDisplay/PriceTag';

export const ListingCard = (
	props: ListingCardData & {
		width?: number;
		multiImage?: boolean;
	},
) => {
	const shareListing = useShareListing();
	const { favoriteIds, toggleFavorite } = useFavorites();
	const isSaved = favoriteIds.has(props.shortId);

	const listingUrl = `/${CLIENT_ROUTES.listing}/${props.shortId}`;

	const getImageUrl = (uuid: string) =>
		`${process.env.LISTING_IMAGES_URL}/${uuid}.jpg`;

	return (
		<Box>
			<Card.Root
				variant="elevated"
				width={props.width}
			>
				<RouterLink to={listingUrl}>
					<MultiImage
						aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
						urls={
							props.multiImage
								? props.imageUuids.map(getImageUrl)
								: [getImageUrl(props.imageUuids[0])]
						}
					/>
				</RouterLink>

				<Card.Body
					p={3}
					gap={1}
				>
					<Stack gap={0}>
						<RouterLink to={listingUrl}>
							<Link asChild>
								<Heading
									size="2xl"
									fontWeight="semibold"
									truncate
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
										lineHeight={1.2}
									>
										{props.shopTitle}
									</Heading>
								</Link>
							</RouterLink>
						)}
					</Stack>

					<Card.Description
						lineClamp={2}
						fontSize={16}
						fontFamily={FONT_DISPLAY_SLAB}
					>
						{props.subtitle}
					</Card.Description>
					<Flex
						justifyContent="space-between"
						alignItems="center"
					>
						<PriceTag value={props.priceDollars} />
						<Box>
							<IconButton
								variant="ghost"
								size="lg"
								onClick={() => shareListing(props)}
							>
								<FaRegShareFromSquare />
							</IconButton>

							<IconButton
								variant="ghost"
								size="lg"
								onClick={() =>
									toggleFavorite(props.shortId)
								}
								color={
									isSaved ? 'red.600' : undefined
								}
							>
								{isSaved ? (
									<FaHeart />
								) : (
									<FaRegHeart />
								)}
							</IconButton>
						</Box>
					</Flex>
				</Card.Body>
			</Card.Root>
		</Box>
	);
};
