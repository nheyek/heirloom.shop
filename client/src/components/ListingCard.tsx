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
} from '@chakra-ui/react';
import { ListingCardData } from '@common/types/ListingCardData';
import { motion } from 'framer-motion';
import { MdAdd } from 'react-icons/md';
import { IoStorefront } from 'react-icons/io5';

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
			<AspectRatio ratio={1 / 1}>
				<Image
					style={{ cursor: 'pointer' }}
					src={`${process.env.LISTING_IMAGES_URL}/${props.primaryImageUuid}.jpg`}
				/>
			</AspectRatio>
			<Card.Body p={3}>
				<HStack mb={3} gap={3} style={{ cursor: 'pointer' }}>
					<Avatar.Root>
						<Avatar.Image
							src={`${process.env.SHOP_PROFILE_IMAGES_URL}/${props.shopProfileImageUuid}.jpg`}
						/>
						<Avatar.Fallback>
							<IoStorefront />
						</Avatar.Fallback>
					</Avatar.Root>
					<Stack gap="0">
						<Text fontWeight="semibold" textStyle="sm" letterSpacing="tight">
							{props.shopTitle}
						</Text>
					</Stack>
				</HStack>
				<Card.Title truncate style={{ cursor: 'pointer' }}>
					{props.title}
				</Card.Title>
				<Card.Description lineClamp="2">{props.subtitle}</Card.Description>
			</Card.Body>
			<Card.Footer p={3}>
				<Box justifyContent="space-between" alignItems="center" display="flex" width="100%">
					<Text textStyle="xl" fontWeight="medium" letterSpacing="tight">
						{`$${props.priceDollars.toLocaleString()}`}
					</Text>
					<Button variant="solid" size="xs" letterSpacing="tight">
						<MdAdd />
						Add to cart
					</Button>
				</Box>
			</Card.Footer>
		</MotionCard>
	);
};
