import { AspectRatio, Box, Card, Flex, Text } from '@chakra-ui/react';
import { ListingCardData } from '@common/types/ListingCardData';
import { FaShop } from 'react-icons/fa6';
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
				{props.shopTitle && (
					<Flex
						direction={'row'}
						alignItems="center"
						gap="7px"
						cursor="pointer"
						mt={1}
						mb={1}
					>
						<FaShop />
						<Text fontWeight="500" textStyle="sm" letterSpacing="tight">
							{props.shopTitle}
						</Text>
					</Flex>
				)}
				<Card.Description lineClamp="2">{props.subtitle}</Card.Description>
				<Box marginTop="10px">
					<PriceTag value={`$${props.priceDollars.toLocaleString()}`} />
				</Box>
			</Card.Body>
		</AppCard>
	);
};
