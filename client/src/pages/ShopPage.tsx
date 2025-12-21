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

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [shopData, setShopData] = useState<ShopCardData | null>(null);
	const [listings, setListings] = useState<ListingCardData[]>([]);

	const loadShopData = async () => {
		setIsLoading(true);

		const [shopDataResponse, listingsResponse] = await Promise.all([
			getPublicResource(`shops/${id}`),
			getPublicResource(`shops/${id}/listings`),
		]);

		setShopData(shopDataResponse.data);
		setListings(listingsResponse.data);

		setIsLoading(false);
	};

	useEffect(() => {
		loadShopData();
	}, [id]);

	return (
		<>
			<Box width="100%" maxWidth="1200px" overflow="hidden" mx="auto" p="16px">
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
									borderRadius="5px"
									src={`${process.env.SHOP_PROFILE_IMAGES_URL}/${shopData?.profileImageUuid}.jpg`}
								/>
							</AspectRatio>
							<Box
								position="absolute"
								bottom={[2, 4, 6]}
								left={[4, 6, 8]}
								fontFamily="Alegreya"
								textShadow="0 1px 2px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.35), 0 4px 8px rgba(0, 0, 0, 0.25), 0 8px 16px rgba(0, 0, 0, 0.15);"
								color="#FFF"
							>
								<Text
									fontSize={['36px', '42px', '48px']}
									fontWeight="700"
									fontFamily="Alegreya"
									lineHeight={1}
								>
									{shopData?.title}
								</Text>
								<Text
									fontSize={['24px', '28px', '32px']}
									fontWeight="600"
									lineHeight={1.25}
								>
									{shopData?.classification}
								</Text>
								<Box display="flex" alignItems="center" gap={2} fontWeight="600">
									<Box width={[6, 7, 8]}>
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

									<Text fontSize={['20px', '24px', '28px']}>
										{shopData?.location}
									</Text>
								</Box>
							</Box>
						</Box>
					</motion.div>
				)}

				<Box marginTop="16px">
					<ListingGrid listings={listings} isLoading={isLoading} />
				</Box>
			</Box>
		</>
	);
};
