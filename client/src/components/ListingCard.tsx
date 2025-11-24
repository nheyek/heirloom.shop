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

const MotionCard = motion(Card.Root);

export const ListingCard = (props: ListingCardData) => {
	return (
		<MotionCard
			key={props.id}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1, ease: 'easeInOut' }}
			overflow="hidden"
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
				<Card.Description lineClamp="2">{props.subtitle}</Card.Description>
				<Flex direction={'row'} alignItems="center" mt={2} gap={2} cursor="pointer">
					<FaShop />
					<Text fontWeight="semibold" textStyle="sm" letterSpacing="tight">
						{props.shopTitle}
					</Text>
				</Flex>

				<Text textStyle="xl" fontWeight="medium" mt={2}>
					{`$${props.priceDollars.toLocaleString()}`}
				</Text>
			</Card.Body>
		</MotionCard>
	);
};
