import { AspectRatio, Box, Text } from '@chakra-ui/react';
import { ShopCardData } from '@common/types/ShopCardData';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CountryFlagIcon } from '../components/icons/CountryFlagIcon';
import { LoadingImage } from '../components/misc/LoadingImage';
import { CountryCode } from '../constants';
import useApi from '../hooks/useApi';

export const ShopPage = () => {
	const { id } = useParams<{ id: string }>();

	const { getPublicResource } = useApi();

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [shopData, setShopData] = useState<ShopCardData | null>(null);

	const loadShopData = async () => {
		setIsLoading(true);

		const response = await getPublicResource(`shops/${id}`);
		setShopData(response.data);

		setIsLoading(false);
	};

	useEffect(() => {
		loadShopData();
	}, [id]);

	return (
		<>
			<Box width="100%" maxWidth="1200px" overflow="hidden" mx="auto">
				<Box position="relative">
					<AspectRatio ratio={5 / 2} m="15px">
						<LoadingImage
							boxShadow="md"
							borderRadius="5px"
							src={`${process.env.SHOP_PROFILE_IMAGES_URL}/${shopData?.profileImageUuid}.jpg`}
						/>
					</AspectRatio>
					<Box
						position="absolute"
						bottom="15px"
						left="30px"
						fontFamily="Alegreya"
						textShadow="0 1px 2px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.35), 0 4px 8px rgba(0, 0, 0, 0.25), 0 8px 16px rgba(0, 0, 0, 0.15);"
						color="#FFF"
					>
						<Text fontSize="48px" fontWeight="700" fontFamily="Alegreya" lineHeight={1}>
							{shopData?.title}
						</Text>
						<Text fontSize="24px" fontWeight="600">
							{shopData?.classification}
						</Text>
						<Box mt="5px" display="flex" alignItems="center" gap="5px" fontWeight="600">
							<CountryFlagIcon
								countryCode={shopData?.countryCode as CountryCode | null}
								svgProps={{
									width: '25px',
									height: '25px',
									style: {
										filter: 'drop-shadow( 1px 1px 2px rgba(0, 0, 0, .7))',
									},
								}}
							/>
							<Text fontSize="20px">{shopData?.location}</Text>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	);
};
