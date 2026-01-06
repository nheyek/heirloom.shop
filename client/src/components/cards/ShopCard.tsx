import { AspectRatio, Box, Card, Link, SimpleGrid, Text } from '@chakra-ui/react';
import { ShopCardData } from '@common/types/ShopCardData';
import { useNavigate } from 'react-router-dom';
import { CategoryIconCode, CountryCode } from '../../constants';
import { CategoryIcon } from '../icons/CategoryIcon';
import { CountryFlagIcon } from '../icons/CountryFlagIcon';
import { LoadingImage } from '../misc/LoadingImage';
import { AppCard } from './AppCard';

export const ShopCard = (props: ShopCardData) => {
	const navigate = useNavigate();
	const navigateToShop = () => navigate(`/shop/${props.id}`, { preventScrollReset: true });

	return (
		<AppCard>
			<AspectRatio ratio={3 / 2}>
				<LoadingImage
					style={{ cursor: 'pointer' }}
					src={`${process.env.SHOP_PROFILE_IMAGES_URL}/${props.profileImageUuid}.jpg`}
					onClick={navigateToShop}
				/>
			</AspectRatio>
			<Card.Body p={3}>
				<Card.Title truncate onClick={navigateToShop} fontSize={19}>
					<Link>{props.title}</Link>
				</Card.Title>
				<SimpleGrid columns={2} gap={2} gridTemplateColumns="22px 1fr" mt={2} fontSize={16}>
					<CategoryIcon
						iconCode={props.categoryIcon as CategoryIconCode | null}
						size={22}
					/>
					<Text>{props.classification}</Text>
					<Box width={22} height={22}>
						<CountryFlagIcon countryCode={props.countryCode as CountryCode | null} />
					</Box>
					<Text>{props.location}</Text>
				</SimpleGrid>
			</Card.Body>
		</AppCard>
	);
};
