import {
	AspectRatio,
	Box,
	Heading,
	Skeleton,
	Stack,
	Text,
} from '@chakra-ui/react';
import { ListingGrid } from '@client/components/collections/ListingGrid';
import { AppError } from '@client/components/feedback/AppError';
import { CountryFlagIcon } from '@client/components/icons/CountryFlagIcon';
import { AppImage } from '@client/components/imageDisplay/AppImage';
import { CountryCode, STANDARD_GRID_GAP } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { FONT_DECORATIVE } from '@client/theme';
import { callApi } from '@client/utils/apiUtils';
import { ListingCardData, ShopCardData } from '@heirloom/common/contract';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const ShopPage = () => {
	const { id } = useParams<{ id: string }>();

	const apiClient = useApiClient();

	const [shopData, setShopData] = useState<ShopCardData | null>(
		null,
	);
	const [shopDataLoading, setShopDataLoading] =
		useState<boolean>(true);
	const [shopDataError, setShopDataError] = useState<string | null>(
		null,
	);

	const [listings, setListings] = useState<ListingCardData[]>([]);
	const [listingsLoading, setListingsLoading] =
		useState<boolean>(true);
	const [listingsError, setListingsError] = useState<string | null>(
		null,
	);

	const loadShopData = async () => {
		const result = await callApi(
			apiClient.shops.getById({ params: { id: id! } }),
		);
		if (result.error !== null) {
			setShopDataError(result.error);
		} else {
			setShopData(result.data);
		}
		setShopDataLoading(false);
	};

	const loadListings = async () => {
		const result = await callApi(
			apiClient.shops.getListings({ params: { id: id! } }),
		);
		if (result.error !== null) {
			setListingsError(result.error);
		} else {
			setListings(result.data);
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

	const responsiveBannerAspectRatio = [1.75, 2.25, 2.75, 3.25];

	if (shopDataError) {
		return (
			<AppError
				title="Failed to shop data"
				content={shopDataError}
			/>
		);
	}

	return (
		<>
			{isLoading && (
				<AspectRatio ratio={responsiveBannerAspectRatio}>
					<Skeleton width="100%" />
				</AspectRatio>
			)}
			{!isLoading && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: 0.25,
						ease: 'easeInOut',
					}}
				>
					<Box
						position="relative"
						boxShadow="md"
					>
						<Box mx="auto">
							<AppImage
								imageProps={{
									aspectRatio:
										responsiveBannerAspectRatio,
									src: `${process.env.SHOP_PROFILE_IMAGES_URL}/${shopData?.profileImageUuid}.jpg`,
								}}
							/>
						</Box>
						<Stack
							gap={{ base: 0, md: 0.5, lg: 1 }}
							position="absolute"
							bottom={[3, 5, 7]}
							left={[4, 6, 8, 10]}
							fontFamily={FONT_DECORATIVE}
							textShadow="0 1px 2px rgba(0, 0, 0, 0.65), 0 2px 4px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(0, 0, 0, 0.35), 0 8px 16px rgba(0, 0, 0, 0.2);"
							color="#FFF"
						>
							<Stack gap={{ base: 1, md: 4, lg: 6 }}>
								<Heading
									fontSize={{
										base: '36px',
										md: '48px',
										lg: '64px',
									}}
									fontWeight="700"
									fontFamily={FONT_DECORATIVE}
								>
									{shopData?.title}
								</Heading>
								<Heading
									fontSize={{
										base: '24px',
										md: '32px',
										lg: '36px',
									}}
									fontWeight="600"
								>
									{shopData?.classification}
								</Heading>
							</Stack>

							<Box
								display="flex"
								alignItems="center"
								gap={{ base: 2, lg: 3 }}
								fontWeight="600"
							>
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

								<Text
									fontSize={{
										base: '20px',
										md: '28px',
										lg: '32px',
									}}
								>
									{shopData?.location}
								</Text>
							</Box>
						</Stack>
					</Box>
				</motion.div>
			)}

			{listingsError ? (
				<AppError
					title="Failed to load listings"
					content={listingsError}
				/>
			) : (
				<Box
					py={5}
					px={STANDARD_GRID_GAP}
				>
					<ListingGrid
						listings={listings}
						isLoading={isLoading}
					/>
				</Box>
			)}
		</>
	);
};
