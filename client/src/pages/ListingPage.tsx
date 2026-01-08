import {
	Box,
	Button,
	ButtonProps,
	Flex,
	Grid,
	GridItem,
	Heading,
	Link,
	SimpleGrid,
	Skeleton,
	Stack,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { ListingCardData } from '@common/types/ListingCardData';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { FaShare } from 'react-icons/fa6';
import { GoBookmarkFill } from 'react-icons/go';
import { RxDotFilled } from 'react-icons/rx';
import { useParams } from 'react-router-dom';
import { CountryFlagIcon } from '../components/icons/CountryFlagIcon';
import { ImageCarousel } from '../components/misc/ImageCarousel';
import { ImageCollage } from '../components/misc/ImageCollage';
import { CountryCode } from '../constants';
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
						<Box pt={5} px={5} mx="auto">
							<ImageCollage urls={imageUrls} aspectRatio={3 / 2} />
						</Box>
					)}
					{imageComponent === ImageComponent.CAROUSEL && (
						<ImageCarousel urls={imageUrls} aspectRatio={3 / 2} />
					)}
				</motion.div>
			)}
			<Box p={{ base: 5, md: 7, lg: 9 }} pt={10} mx="auto" maxWidth={1200}>
				<SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} gap={10}>
					<GridItem colSpan={{ base: 1, lg: 3 }}>
						<Stack gap={3}>
							<Heading mr={5} size="4xl">
								{listingData?.title}
							</Heading>

							<Flex alignItems="center" gap={3} fontSize={22}>
								<CountryFlagIcon countryCode={CountryCode.US} size={26} />

								<Link>James & James</Link>
							</Flex>

							<Text fontSize={18}>{listingData?.subtitle}</Text>
						</Stack>
					</GridItem>
					<GridItem colSpan={{ base: 1, lg: 2 }}>
						<Stack gap={7} width="100%">
							<Stack gap={2}>
								<ListingPageButton size="xl">
									<FaPlusCircle />
									Add to Cart
									<RxDotFilled />
									<Text
										height="28px"
										fontSize="28px"
										fontWeight={600}
										fontFamily="Alegreya"
									>
										${listingData?.priceDollars.toLocaleString()}
									</Text>
								</ListingPageButton>
								<SimpleGrid columns={2} gap={2}>
									<ListingPageButton size="lg">
										<GoBookmarkFill />
										Save
									</ListingPageButton>
									<ListingPageButton size="lg">
										<FaShare />
										Share
									</ListingPageButton>
								</SimpleGrid>
							</Stack>

							<Stack gap={2}>
								<Text fontSize={20} fontWeight="bold">
									Production & Delivery
								</Text>
								<Grid templateColumns="100px 1fr" fontSize={17}>
									<Text>Lead time:</Text>
									<Text fontWeight="bold">3-5 weeks</Text>
									<Text>Delivery:</Text>
									<Text fontWeight="bold">5-7 days</Text>
									<Text>Shipping:</Text>
									<Text fontWeight="bold">$235</Text>
								</Grid>
							</Stack>
						</Stack>
					</GridItem>
					<GridItem colSpan={{ base: 1, lg: 3 }}>
						<Box>[Full description]</Box>
					</GridItem>
					<GridItem colSpan={{ base: 1, lg: 2 }}>
						<Box>[Feedback]</Box>
					</GridItem>
				</SimpleGrid>
			</Box>
		</Flex>
	);
};

const ListingPageButton = (props: ButtonProps) => (
	<Button width="100%" fontWeight="bold" {...props} borderRadius="full" />
);
