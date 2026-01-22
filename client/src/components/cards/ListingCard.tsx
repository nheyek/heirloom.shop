import { Box, Card, Flex, IconButton, Link, Stack } from '@chakra-ui/react';
import { ListingCardData } from '@common/types/ListingCardData';
import { FaRegHeart } from 'react-icons/fa';
import { FaRegShareFromSquare } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { STANDARD_IMAGE_ASPECT_RATIO } from '../../constants';
import { ImageCarousel } from '../misc/ImageCarousel';
import { PriceTag } from '../misc/PriceTag';
import { AppCard } from './AppCard';

export const ListingCard = (props: ListingCardData) => {
	const navigate = useNavigate();

	return (
		<AppCard>
			<ImageCarousel
				aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
				urls={props.imageUuids.map(
					(uuid) => `${process.env.LISTING_IMAGES_URL}/${uuid}.jpg`,
				)}
			/>
			<Card.Body p={3} pr={2} pb={2}>
				<Stack gap={1}>
					<Card.Title truncate style={{ cursor: 'pointer' }} fontSize={20}>
						<Link onClick={() => navigate(`/listing/${props.id}`)}>{props.title}</Link>
					</Card.Title>
					{props.shopTitle && (
						<Link fontSize={18} onClick={() => navigate(`/shop/${props.shopId}`)}>
							{props.shopTitle}
						</Link>
					)}
					<Card.Description lineClamp={2} minHeight={45} fontSize={15}>
						{props.subtitle}
					</Card.Description>
					<Flex justifyContent="space-between" alignItems="center">
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
				</Stack>
			</Card.Body>
		</AppCard>
	);
};
