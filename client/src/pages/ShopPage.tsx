import { AspectRatio, Box, Skeleton, Text } from '@chakra-ui/react';
import { ListingCardData } from '@common/types/ListingCardData';
import { ShopCardData } from '@common/types/ShopCardData';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ListingGrid } from '../components/grids/ListingGrid';
import useApi from '../hooks/useApi';

import { motion } from 'framer-motion';
import { CountryFlagIcon } from '../components/icons/CountryFlagIcon';
import { LoadingImage } from '../components/misc/LoadingImage';
import { CountryCode } from '../constants';

export const ShopPage = () => {
	const { id } = useParams<{ id: string }>();

	const { getPublicResource } = useApi();

	const [shopData, setShopData] = useState<ShopCardData | null>(null);
	const [shopDataLoading, setShopDataLoading] = useState<boolean>(true);
	const [shopDataError, setShopDataError] = useState<string | null>(null);

	const [listings, setListings] = useState<ListingCardData[]>([]);
	const [listingsLoading, setListingsLoading] = useState<boolean>(true);
	const [listingsError, setListingsError] = useState<string | null>(null);

	const loadShopData = async () => {
		const response = await getPublicResource(`shops/${id}`);
		if (response.error) {
			setShopDataError('Failed to load maker info');
		} else {
			setShopData(response.data);
		}
		setShopDataLoading(false);
	};

	const loadListings = async () => {
		const response = await getPublicResource(`shops/${id}/listings`);
		if (response.error) {
			setListingsError('Failed to load listings');
		} else {
			setListings(response.data);
		}
		setListingsLoading(false);
	};

	useEffect(() => {
		setShopDataLoading(true);
		setShopDataError(null);
		setListingsLoading(true);
		setListingsError(null);

		setTimeout(() => {
			loadShopData();
			loadListings();
		}, 500);
	}, [id]);

	const isLoading = shopDataLoading || listingsLoading;

	return (
		<>
			<Box width="100%" maxWidth={1000} overflow="hidden" mx="auto" p={5}>
				{isLoading && (
					<AspectRatio ratio={5 / 2}>
						<Skeleton width="100%" />
					</AspectRatio>
				)}
				{!isLoading && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1, ease: 'easeInOut' }}
					>
						<Box position="relative">
							<AspectRatio ratio={5 / 2}>
								<LoadingImage
									boxShadow="md"
									borderRadius={3}
									src={`${process.env.SHOP_PROFILE_IMAGES_URL}/${shopData?.profileImageUuid}.jpg`}
								/>
							</AspectRatio>
							<Box
								position="absolute"
								bottom={[2, 4, 6]}
								left={[4, 6, 8, 10]}
								fontFamily="Alegreya"
								textShadow="0 1px 2px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.35), 0 4px 8px rgba(0, 0, 0, 0.25), 0 8px 16px rgba(0, 0, 0, 0.15);"
								color="#FFF"
							>
								<Text
									fontSize={['36px', '42px', '48px', '54px']}
									fontWeight="700"
									fontFamily="Alegreya"
									lineHeight={1}
								>
									{shopData?.title}
								</Text>
								<Text
									fontSize={['24px', '28px', '32px', '36px']}
									fontWeight="600"
									lineHeight={1.25}
								>
									{shopData?.classification}
								</Text>
								<Box display="flex" alignItems="center" gap={2} fontWeight="600">
									<Box width={[5, 6, 7, 8]}>
										<CountryFlagIcon
											countryCode={
												shopData?.countryCode as CountryCode | null
											}
											svgProps={{
												style: {
													filter: 'drop-shadow( 1px 1px 2px rgba(0, 0, 0, .7))',
												},
											}}
										/>
									</Box>

									<Text fontSize={['16px', '20px', '24px', '28px']}>
										{shopData?.location}
									</Text>
								</Box>
							</Box>
						</Box>
					</motion.div>
				)}

				<Box marginTop={5}>
					<ListingGrid listings={listings} isLoading={isLoading} />
				</Box>
			</Box>
		</>
	);
};
