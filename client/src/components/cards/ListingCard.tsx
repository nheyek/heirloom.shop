import { AspectRatio, Box, Card, Flex, IconButton, Link } from '@chakra-ui/react';
import { ListingCardData } from '@common/types/ListingCardData';
import { FaRegHeart } from 'react-icons/fa';
import { FaRegShareFromSquare } from 'react-icons/fa6';
import { LoadingImage } from '../misc/LoadingImage';
import { PriceTag } from '../misc/PriceTag';
import { AppCard } from './AppCard';

export const ListingCard = (props: ListingCardData) => {
	return (
		<AppCard>
			<AspectRatio ratio={3 / 2}>
				<LoadingImage
					style={{ cursor: 'pointer' }}
					src={`${process.env.LISTING_IMAGES_URL}/${props.primaryImageUuid}.jpg`}
				/>
			</AspectRatio>
			<Card.Body p={3} pr={2} pb={2}>
				<Card.Title truncate style={{ cursor: 'pointer' }}>
					{props.title}
				</Card.Title>
				{props.shopTitle && <Link fontSize={16}>{props.shopTitle}</Link>}
				<Card.Description lineClamp="2" mt={1} minHeight={45}>
					{props.subtitle}
				</Card.Description>
				<Flex mt={2} justifyContent="space-between" alignItems="center">
					<PriceTag value={`$${props.priceDollars.toLocaleString()}`} />
					<Box>
						<IconButton variant="ghost" rounded="full">
							<FaRegShareFromSquare />
						</IconButton>

						<IconButton variant="ghost" rounded="full">
							<FaRegHeart />
						</IconButton>
					</Box>
				</Flex>
			</Card.Body>
		</AppCard>
	);
};
