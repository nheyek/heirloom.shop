import { Card, Text, Flex, AspectRatio, Image, Table, SimpleGrid, Box } from '@chakra-ui/react';
import { CategoryCardData } from '@common/types/CategoryCardData';
import { ShopCardData } from '@common/types/ShopCardData';
import { CircleFlag } from 'react-circle-flags';
import { FaLocationDot } from 'react-icons/fa6';
import { MdCategory } from 'react-icons/md';
import { CountryFlagIcon } from './icons/CountryFlagIcon';
import { CategoryIconCode, CountryCode } from '../constants';
import { CategoryIcon } from './icons/CategoryIcon';

export const ShopCard = (props: ShopCardData) => {
	return (
		<Card.Root overflow="hidden" variant="elevated">
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
		</Card.Root>
	);
};
