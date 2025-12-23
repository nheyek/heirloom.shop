import { AspectRatio, Box, Card, Link } from '@chakra-ui/react';
import { ListingCardData } from '@common/types/ListingCardData';
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
			<Card.Body p={3}>
				<Card.Title truncate style={{ cursor: 'pointer' }}>
					{props.title}
				</Card.Title>
				{props.shopTitle && <Link fontSize={16}>{props.shopTitle}</Link>}
				<Box mt={2}>
					<PriceTag value={`$${props.priceDollars.toLocaleString()}`} />
				</Box>
			</Card.Body>
		</AppCard>
	);
};
