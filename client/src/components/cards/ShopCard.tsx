import { AspectRatio, Box, Card, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { ShopCardData } from '@common/types/ShopCardData';
import { CategoryIconCode, CountryCode } from '../../constants';
import { CategoryIcon } from '../icons/CategoryIcon';
import { CountryFlagIcon } from '../icons/CountryFlagIcon';
import { HeirloomCard } from './HeirloomCard';

export const ShopCard = (props: ShopCardData) => {
	return (
		<HeirloomCard>
			<AspectRatio ratio={3 / 2}>
				<Image
					style={{ cursor: 'pointer' }}
					src={`${process.env.SHOP_PROFILE_IMAGES_URL}/${props.profileImageUuid}.jpg`}
				/>
			</AspectRatio>
			<Card.Body p={3}>
				<Card.Title truncate style={{ cursor: 'pointer' }}>
					{props.title}
				</Card.Title>
				<SimpleGrid columns={2} gap="6px 8px" gridTemplateColumns="20px 1fr" mt="5px">
					<Box display="flex" alignItems="center" height="25px" justifyContent="center">
						<CategoryIcon
							iconCode={props.categoryIcon as CategoryIconCode | null}
							size={20}
						/>
					</Box>
					<Box display="flex" alignItems="center">
						<Text fontWeight="500" textStyle="sm" letterSpacing="tight">
							{props.classification}
						</Text>
					</Box>
					<Box display="flex" alignItems="center">
						<CountryFlagIcon countryCode={props.countryCode as CountryCode | null} />
					</Box>
					<Box display="flex" alignItems="center">
						<Text fontWeight="500" textStyle="sm" letterSpacing="tight">
							{props.location}
						</Text>
					</Box>
				</SimpleGrid>
			</Card.Body>
		</HeirloomCard>
	);
};
