import {
	AspectRatio,
	Box,
	Button,
	Dialog,
	HStack,
	Icon,
	IconButton,
	Portal,
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
import { RichTextDisplay } from '@client/components/richText/RichTextDisplay';
import { CountryCode, STANDARD_GRID_GAP } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { useFavorites } from '@client/providers/FavoritesProvider';
import { FONT_DECORATIVE } from '@client/theme';
import { callApi } from '@client/utils/apiUtils';
import {
	ListingCardData,
	ShopCardData,
} from '@heirloom/common/contract';
import { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { FaHeart } from 'react-icons/fa';
import { FaShop } from 'react-icons/fa6';
import { IoChatbox } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';
import { useParams } from 'react-router-dom';

const titleFontSize = {
	base: 36,
	md: 48,
	lg: 64,
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

	const isLoading = shopDataLoading || listingsLoading;

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
									src: `${process.env.SHOP_PROFILE_IMAGES_URL}/${shopData.profileImageUuid}.jpg`,
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
						bottom={{ base: 5, lg: 10 }}
						left={{ base: 5, lg: 10 }}
						gap={5}
						alignItems="flex-start"
					>
						{/* Text block */}
						<Stack
							gap={0}
							fontFamily={FONT_DECORATIVE}
							textShadow="0 1px 2px rgba(0, 0, 0, 0.65), 0 2px 4px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(0, 0, 0, 0.35), 0 8px 16px rgba(0, 0, 0, 0.2);"
							color="#FFF"
						>
							<Text
								display="block"
								fontSize={titleFontSize}
								fontWeight={700}
								fontFamily={FONT_DECORATIVE}
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
								<Box
									display="flex"
									alignItems="center"
									gap={{ base: 2, lg: 3 }}
								>
									<Box
										width={{
											base: 6,
											md: 7,
											lg: 8,
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
								</Box>
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
							<ActionButton
								icon={IoChatbox}
								label="Message"
							/>
						</HStack>
					</Stack>
				</Box>
			)}

			<Dialog.Root
				open={aboutOpen}
				onOpenChange={(e) => setAboutOpen(e.open)}
				scrollBehavior="inside"
				size={{ base: 'full', md: 'lg' }}
			>
				<Portal>
					<Dialog.Backdrop />
					<Dialog.Positioner>
						<Dialog.Content>
							<Dialog.Header>
								<Dialog.Title fontSize={20}>
									{shopData?.title}
								</Dialog.Title>
								<Dialog.CloseTrigger asChild>
									<IconButton
										variant="ghost"
										w={10}
										h={10}
									>
										<Icon
											h={6}
											w={6}
										>
											<MdClose />
										</Icon>
									</IconButton>
								</Dialog.CloseTrigger>
							</Dialog.Header>
							<Dialog.Body>
								{shopData?.profileRichText && (
									<RichTextDisplay
										htmlString={
											shopData.profileRichText
										}
									/>
								)}
							</Dialog.Body>
						</Dialog.Content>
					</Dialog.Positioner>
				</Portal>
			</Dialog.Root>

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
		size={{ base: 'sm', md: 'md', lg: 'lg' }}
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
