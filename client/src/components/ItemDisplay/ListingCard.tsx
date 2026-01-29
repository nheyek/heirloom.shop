import { Box, Card, Flex, IconButton, Link } from '@chakra-ui/react';
import { ListingCardData } from '@common/types/ListingCardData';
import { FaRegHeart } from 'react-icons/fa';
import { FaRegShareFromSquare } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ROUTES, STANDARD_IMAGE_ASPECT_RATIO } from '../../constants';
import { useShareListing } from '../../hooks/useShareListing';
import { ImageCarousel } from '../ImageDisplay/ImageCarousel';
import { PriceTag } from '../TextDisplay/PriceTagText';

export const ListingCard = (props: ListingCardData & { width?: number; multiImage?: boolean }) => {
	const navigate = useNavigate();
	const shareListing = useShareListing();
	const navigateToListing = () => navigate(`/${CLIENT_ROUTES.listing}/${props.id}`);

	const getImageUrl = (uuid: string) => `${process.env.LISTING_IMAGES_URL}/${uuid}.jpg`;

	return (
		<Box>
			<Card.Root variant="elevated" width={props.width}>
				<Box cursor="pointer">
					<ImageCarousel
						aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
						urls={
							props.multiImage
								? props.imageUuids.map(getImageUrl)
								: [getImageUrl(props.imageUuids[0])]
						}
						onImageClick={navigateToListing}
					/>
				</Box>

				<Card.Body p={3} pr={2} pb={2} gap={1}>
					<Box>
						<Card.Title fontSize={21}>
							<Link truncate display="block" onClick={navigateToListing}>
								{props.title}
							</Link>
						</Card.Title>
						{props.shopTitle && (
							<Link
								fontSize={18}
								fontWeight={500}
								onClick={() => navigate(`/${CLIENT_ROUTES.shop}/${props.shopId}`)}
							>
								{props.shopTitle}
							</Link>
						)}
					</Box>

					<Card.Description lineClamp={2} minHeight={45} fontSize={16}>
						{props.subtitle}
					</Card.Description>
					<Flex justifyContent="space-between" alignItems="center">
						<PriceTag value={`$${props.priceDollars.toLocaleString()}`} />
						<Box>
							<IconButton
								variant="ghost"
								rounded="full"
								size="lg"
								onClick={() => shareListing(props)}
							>
								<FaRegShareFromSquare />
							</IconButton>

							<IconButton variant="ghost" rounded="full" size="lg">
								<FaRegHeart />
							</IconButton>
						</Box>
					</Flex>
				</Card.Body>
			</Card.Root>
		</Box>
	);
};
