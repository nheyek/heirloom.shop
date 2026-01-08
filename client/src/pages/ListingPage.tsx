import {
	Box,
	Button,
	ButtonProps,
	Flex,
	GridItem,
	Heading,
	SimpleGrid,
	Skeleton,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { ListingCardData } from '@common/types/ListingCardData';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaBookmark } from 'react-icons/fa';
import { FaShare } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import { ImageCarousel } from '../components/misc/ImageCarousel';
import { ImageCollage } from '../components/misc/ImageCollage';
import useApi from '../hooks/useApi';

enum ImageComponent {
	CAROUSEL,
	COLLAGE,
}

export const ListingPage = () => {
	const { id } = useParams<{ id: string }>();

	const imageComponent = useBreakpointValue({
		base: ImageComponent.CAROUSEL,
		md: ImageComponent.COLLAGE,
	});

	const [listingData, setListingData] = useState<ListingCardData | null>(null);
	const [listingDataLoading, setListingDataLoading] = useState<boolean>(true);
	const [listingDataError, setListingDataError] = useState<string | null>(null);

	const { getPublicResource } = useApi();

	const loadListingData = async () => {
		const response = await getPublicResource(`listings/${id}`);
		if (response.error) {
			setListingDataError(response.data);
		} else {
			setListingData(response.data);
		}
		setListingDataLoading(false);
	};

	useEffect(() => {
		setListingDataLoading(true);
		setListingDataError(null);

		setTimeout(() => {
			loadListingData();
		}, 500);
	}, [id]);

	const imageUrls =
		listingData?.imageUuids.map((uuid) => `${process.env.LISTING_IMAGES_URL}/${uuid}.jpg`) ||
		[];

	return (
		<Flex flexDir="column" alignItems="start" width="fit-content" mx="auto">
			{listingDataLoading && <Skeleton width="100vw" height={500} />}
			{!listingDataLoading && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, ease: 'easeInOut' }}
				>
					{imageComponent === ImageComponent.COLLAGE && (
						<Box p={5} mx="auto">
							<ImageCollage urls={imageUrls} aspectRatio={3 / 2} />
						</Box>
					)}
					{imageComponent === ImageComponent.CAROUSEL && (
						<ImageCarousel urls={imageUrls} aspectRatio={3 / 2} />
					)}
				</motion.div>
			)}
			<Box p={10} mx="auto" maxWidth={1200}>
				<SimpleGrid columns={{ base: 1, md: 6 }} gap={10}>
					<GridItem colSpan={{ base: 1, md: 4 }}>
						<Heading fontSize={36} mb={5}>
							{listingData?.title}
						</Heading>
						<Text fontSize={18}>{listingData?.subtitle}</Text>
						<Text fontSize={16}>{listingData?.shopTitle}</Text>
						<Text fontSize={16}>{listingData?.countryCode}</Text>
					</GridItem>
					<GridItem colSpan={{ base: 1, md: 2 }} display="flex">
						<SimpleGrid columns={2} gap={3} width="100%" maxWidth={500}>
							<ListingPageButton>
								<FaBookmark />
								Save
							</ListingPageButton>
							<ListingPageButton>
								<FaShare />
								Share
							</ListingPageButton>
						</SimpleGrid>
					</GridItem>
					<Box>Full description</Box>
					<Box>Feedback</Box>
				</SimpleGrid>
			</Box>
		</Flex>
	);
};

const ListingPageButton = (props: ButtonProps) => (
	<Button width="100%" fontSize={16} fontWeight="bold" {...props} height={10} />
);
