import { Box, Card, Flex, IconButton, Link } from '@chakra-ui/react';
import { ListingCardData } from '@common/types/ListingCardData';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FaRegShareFromSquare } from 'react-icons/fa6';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
	CLIENT_ROUTES,
	STANDARD_IMAGE_ASPECT_RATIO,
} from '../../constants';
import { useShareListing } from '../../hooks/useShareListing';
import { useFavorites } from '../../providers/FavoritesProvider';
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
	const navigate = useNavigate();

	return (
		<Box>
			<Card.Root
				variant="elevated"
				width={props.width}
			>
				<MultiImage
					onImageClick={() => navigate(listingUrl)}
					aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
					urls={
						props.multiImage
							? props.imageUuids.map(getImageUrl)
							: [getImageUrl(props.imageUuids[0])]
					}
				/>

				<Card.Body
					p={3}
					pr={2}
					pb={2}
					gap={1}
				>
					<Box>
						<Card.Title fontSize={22}>
							<Link
								truncate
								display="block"
								asChild
							>
								<RouterLink to={listingUrl}>
									{props.title}
								</RouterLink>
							</Link>
						</Card.Title>
						{props.shopTitle && (
							<Link
								fontSize={18}
								fontWeight={500}
								asChild
								cursor="button"
							>
								<RouterLink
									to={`/${CLIENT_ROUTES.shop}/${props.shopShortId}`}
								>
									{props.shopTitle}
								</RouterLink>
							</Link>
						)}
					</Box>

					<Card.Description
						lineClamp={2}
						minHeight={45}
						fontSize={16}
						fontWeight={500}
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
