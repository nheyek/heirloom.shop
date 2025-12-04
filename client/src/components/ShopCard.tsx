import { Card, Text, Flex, AspectRatio, Image, Table, SimpleGrid, Box } from '@chakra-ui/react';
import { CategoryCardData } from '@common/types/CategoryCardData';
import { ShopCardData } from '@common/types/ShopCardData';
import { FaLocationDot } from 'react-icons/fa6';
import { MdCategory } from 'react-icons/md';

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
				<SimpleGrid columns={2} gap="5px" gridTemplateColumns="20px 1fr" mt="5px">
					<Box display="flex" alignItems="center">
						<MdCategory />
					</Box>
					<Box>
						<Text fontWeight="500" textStyle="sm" letterSpacing="tight">
							{props.classification}
						</Text>
					</Box>
					<Box display="flex" alignItems="center">
						<FaLocationDot />
					</Box>
					<Box>
						<Text fontWeight="500" textStyle="sm" letterSpacing="tight">
							{props.location}
						</Text>
					</Box>
				</SimpleGrid>
			</Card.Body>
		</Card.Root>
	);
};
