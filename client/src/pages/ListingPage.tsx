import { Box, Skeleton, useBreakpointValue } from '@chakra-ui/react';
import { ListingCardData } from '@common/types/ListingCardData';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ImageCarousel } from '../components/misc/ImageCarousel';
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
		<Box mx="auto" p={5}>
			{listingDataLoading && <Skeleton width="100%" height={500} />}
			{!listingDataLoading && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, ease: 'easeInOut' }}
				>
					<ImageCarousel
						withThumbnailMenu={renderCarouselWithThumbnails}
						urls={listingData!.imageUuids.map(
							(uuid) => `${process.env.LISTING_IMAGES_URL}/${uuid}.jpg`,
						)}
						aspectRatio="5/3"
					/>
				</motion.div>
			)}
		</Box>
	);
};
