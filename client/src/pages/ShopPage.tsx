import {
	AspectRatio,
	Box,
	Button,
	HStack,
	Skeleton,
	Stack,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { ListingGrid } from '@client/components/collections/ListingGrid';
import { AppError } from '@client/components/feedback/AppError';
import { CountryFlagIcon } from '@client/components/icons/CountryFlagIcon';
import { AppImage } from '@client/components/imageDisplay/AppImage';
import { ImagePlaceholder } from '@client/components/imageDisplay/ImagePlaceholder';
import { RichTextDialog } from '@client/components/richText/RichTextDialog';
import { CountryCode, STANDARD_GRID_GAP } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { useMinDuration } from '@client/hooks/useMinDuration';
import { useFavorites } from '@client/providers/FavoritesProvider';
import { displayFontFamily } from '@client/theme';
import { callApi } from '@client/utils/apiUtils';
import { shopProfileImageUrl } from '@client/utils/imageUtils';
import {
	ListingCardData,
	ShopCardData,
} from '@heirloom/common/contract';
import { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { FaHeart } from 'react-icons/fa';
import { FaShop } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';

const titleFontSize = {
	base: 40,
	md: 60,
};

export const ShopPage = () => {
	const { id } = useParams<{ id: string }>();
	const [aboutOpen, setAboutOpen] = useState(false);

	const apiClient = useApiClient();
	const { isFavoritedShop, toggleFavoriteShop } = useFavorites();

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

	const responsiveBannerAspectRatio = useBreakpointValue({
		base: 1.75,
		md: 2.25,
		lg: 2.75,
		xl: 3.25,
	});

	useEffect(() => {
		setShopDataLoading(true);
		setShopDataError(null);
		setListingsLoading(true);
		setListingsError(null);

		loadShopData();
		loadListings();
	}, [id]);

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

	const isLoading = useMinDuration(
		shopDataLoading || listingsLoading,
	);

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
				<Box
					position="relative"
					boxShadow="md"
				>
					<Box mx="auto">
						{shopData?.profileImageUuid ? (
							<AppImage
								aspectRatio={
									responsiveBannerAspectRatio
								}
								imageProps={{
									src: shopProfileImageUrl(
										shopData.profileImageUuid,
									),
								}}
							/>
						) : (
							<ImagePlaceholder
								aspectRatio={
									responsiveBannerAspectRatio
								}
							/>
						)}
					</Box>
					<Stack
						position="absolute"
						bottom={{ base: 5, md: 10 }}
						left={{ base: 5, md: 10 }}
						gap={5}
						alignItems="flex-start"
					>
						<Stack
							gap={0}
							fontFamily={displayFontFamily}
							textShadow="0 1px 2px rgba(0, 0, 0, 0.65), 0 2px 4px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(0, 0, 0, 0.35), 0 8px 16px rgba(0, 0, 0, 0.2);"
							color="#FFF"
						>
							<Text
								display="block"
								fontSize={titleFontSize}
								fontWeight={700}
								fontFamily={displayFontFamily}
								lineHeight={1}
							>
								{shopData?.title}
							</Text>
							<Stack gap={1}>
								<Text
									display="block"
									fontSize={Object.entries(
										titleFontSize,
									).reduce(
										(acc, [key, value]) => ({
											...acc,
											[key]: value * 0.65,
										}),
										{},
									)}
									fontWeight="600"
								>
									{shopData?.classification}
								</Text>
								<HStack gap={{ base: 3, md: 4 }}>
									<Box
										width={{
											base: 6,
											md: 8,
											lg: 9,
										}}
									>
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
										fontWeight={500}
										fontSize={Object.entries(
											titleFontSize,
										).reduce(
											(acc, [key, value]) => ({
												...acc,
												[key]: value * 0.55,
											}),
											{},
										)}
									>
										{shopData?.location}
									</Text>
								</HStack>
							</Stack>
						</Stack>
						<HStack gap={2}>
							{shopData?.profileRichText && (
								<ActionButton
									icon={FaShop}
									label="About"
									onClick={() => setAboutOpen(true)}
								/>
							)}
							<ActionButton
								icon={FaHeart}
								label={
									shopData &&
									isFavoritedShop(shopData.shortId)
										? 'Favorited'
										: 'Favorite'
								}
								iconColor={
									shopData &&
									isFavoritedShop(shopData.shortId)
										? 'red.600'
										: undefined
								}
								onClick={() =>
									shopData &&
									toggleFavoriteShop(shopData)
								}
							/>
						</HStack>
					</Stack>
				</Box>
			)}

			{shopData?.profileRichText && (
				<RichTextDialog
					title={shopData.title}
					open={aboutOpen}
					onClose={() => setAboutOpen(false)}
					htmlString={shopData.profileRichText}
				/>
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

const ActionButton = (props: {
	icon: IconType;
	label: String;
	iconColor?: string;
	onClick?: () => void;
}) => (
	<Button
		size={{ base: 'md', md: 'lg' }}
		variant="subtle"
		fontSize={{ base: 16, md: 18, lg: 20 }}
		onClick={props.onClick}
	>
		<Box color={props.iconColor}>
			<props.icon />
		</Box>
		{props.label}
	</Button>
);
