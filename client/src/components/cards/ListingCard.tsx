import { AspectRatio, Box, Card, Flex, IconButton, Link } from '@chakra-ui/react';
import { ListingCardData } from '@common/types/ListingCardData';
import { FaRegHeart } from 'react-icons/fa';
import { FaRegShareFromSquare } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { ImageCarousel } from '../misc/ImageCarousel';
import { PriceTag } from '../misc/PriceTag';
import { AppCard } from './AppCard';

export const ListingCard = (props: ListingCardData) => {
	const navigate = useNavigate();

	return (
		<AppCard>
			<AspectRatio ratio={5 / 3}>
				{
					<ImageCarousel
						urls={props.imageUuids.map(
							(uuid) => `${process.env.LISTING_IMAGES_URL}/${uuid}.jpg`,
						)}
					/>
				}
			</AspectRatio>
			<Card.Body p={3} pr={2} pb={2}>
				<Card.Title truncate style={{ cursor: 'pointer' }} fontSize={20}>
					<Link onClick={() => navigate(`/listing/${props.id}`)}>{props.title}</Link>
				</Card.Title>
				{props.shopTitle && <Link fontSize={18}>{props.shopTitle}</Link>}
				<Card.Description lineClamp="2" mt={1} minHeight={45} fontSize={15}>
					{props.subtitle}
				</Card.Description>
				<Flex mt={2} justifyContent="space-between" alignItems="center">
					<PriceTag value={`$${props.priceDollars.toLocaleString()}`} />
					<Box>
						<IconButton variant="ghost" rounded="full" size="lg">
							<FaRegShareFromSquare />
						</IconButton>

						<IconButton variant="ghost" rounded="full" size="lg">
							<FaRegHeart />
						</IconButton>
					</Box>
				</Flex>
			</Card.Body>
		</AppCard>
	);
};
