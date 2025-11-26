import {
	Box,
	Card,
	Image,
	Text,
	Button,
	AspectRatio,
	HStack,
	Avatar,
	Stack,
	Flex,
} from '@chakra-ui/react';
import { ListingCardData } from '@common/types/ListingCardData';
import { motion } from 'framer-motion';
import { MdAdd } from 'react-icons/md';
import { IoStorefront } from 'react-icons/io5';
import { FaShop } from 'react-icons/fa6';
import { PriceTag } from './PriceTag';

const MotionCard = motion(Card.Root);

export const ListingCard = (props: ListingCardData & { showMaker?: boolean }) => {
	return (
		<MotionCard
			key={props.id}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1, ease: 'easeInOut' }}
			overflow="hidden"
			borderRadius="5px"
		>
			<AspectRatio ratio={3 / 2}>
				<Image
					style={{ cursor: 'pointer' }}
					src={`${process.env.LISTING_IMAGES_URL}/${props.primaryImageUuid}.jpg`}
				/>
			</AspectRatio>
			<Card.Body p={3}>
				<Card.Title truncate style={{ cursor: 'pointer' }}>
					{props.title}
				</Card.Title>
				{props.showMaker && (
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
		</MotionCard>
	);
};
