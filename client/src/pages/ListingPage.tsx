import { Flex, Skeleton, useBreakpointValue } from '@chakra-ui/react';
import { ListingCardData } from '@common/types/ListingCardData';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ImageCollage } from '../components/misc/ImageCollage';
import useApi from '../hooks/useApi';

export const ListingPage = () => {
	const { id } = useParams<{ id: string }>();

	const renderCarouselWithThumbnails = useBreakpointValue({
		base: false,
		lg: true,
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

	return (
		<Flex p={5} flexDir="column" alignItems="start" width="fit-content" mx="auto">
			{listingDataLoading && <Skeleton width="100%" height={400} />}
			{!listingDataLoading && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, ease: 'easeInOut' }}
				>
					<ImageCollage
						urls={listingData!.imageUuids.map(
							(uuid) => `${process.env.LISTING_IMAGES_URL}/${uuid}.jpg`,
						)}
						aspectRatio={3 / 2}
					/>
				</motion.div>
			)}
			{/* <Heading size="4xl">{listingData?.title}</Heading> */}
		</Flex>
	);
};
