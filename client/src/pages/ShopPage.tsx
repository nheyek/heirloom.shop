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
import { CategoryFilterMenu } from '@client/components/collections/CategoryFilterMenu';
import { GridHeader } from '@client/components/collections/GridHeader';
import { ListingGrid } from '@client/components/collections/ListingGrid';
import { AppError } from '@client/components/feedback/AppError';
import { CountryFlagIcon } from '@client/components/icons/CountryFlagIcon';
import { AppImage } from '@client/components/imageDisplay/AppImage';
import { ImagePlaceholder } from '@client/components/imageDisplay/ImagePlaceholder';
import { SortFilterDrawer } from '@client/components/input/SortFilterDrawer';
import { RichTextDialog } from '@client/components/richText/RichTextDialog';
import {
	CountryCode,
	GRID_PAGE_PADDING_Y,
	STANDARD_GRID_GAP,
} from '@client/constants';
import { LISTING_SORT_LABELS } from '@client/domain/listingSort';
import { useApiClient } from '@client/hooks/useApiClient';
import { useListingView } from '@client/hooks/useListingView';
import { useMinDuration } from '@client/hooks/useMinDuration';
import { useFavorites } from '@client/providers/FavoritesProvider';
import { DISPLAY_FONT_FAMILY } from '@client/theme';
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
	base: 36,
	md: 64,
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
		base: 1.5,
		md: 2.0,
		lg: 2.5,
		xl: 3.0,
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
			setListings(result.data.listings);
		}
		setListingsLoading(false);
	};

	const listingView = useListingView(listings);

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
							gap={1}
							textShadow="0 1px 2px rgba(0, 0, 0, 0.65), 0 2px 4px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(0, 0, 0, 0.35), 0 8px 16px rgba(0, 0, 0, 0.2);"
							color="#FFF"
							fontWeight={600}
						>
							<Text
								display="block"
								fontSize={titleFontSize}
								lineHeight={1.1}
								fontFamily={DISPLAY_FONT_FAMILY}
							>
								{shopData?.title}
							</Text>
							<Text
								display="block"
								fontSize={Object.entries(
									titleFontSize,
								).reduce(
									(acc, [key, value]) => ({
										...acc,
										[key]: value * 0.75,
									}),
									{},
								)}
								fontFamily={DISPLAY_FONT_FAMILY}
							>
								{shopData?.classification}
							</Text>
							<HStack gap={{ base: 3, md: 4 }}>
								<Box
									width={{
										base: 6,
										md: 8,
										lg: 10,
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
									fontSize={Object.entries(
										titleFontSize,
									).reduce(
										(acc, [key, value]) => ({
											...acc,
											[key]: value * 0.65,
										}),
										{},
									)}
									fontWeight={500}
								>
									{shopData?.location}
								</Text>
							</HStack>
						</Stack>
						<HStack gap={2}>
							{shopData?.profileRichText && (
								<HeaderButton
									icon={FaShop}
									label="About"
									onClick={() => setAboutOpen(true)}
								/>
							)}
							<HeaderButton
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
				<Stack
					pt={GRID_PAGE_PADDING_Y}
					px={STANDARD_GRID_GAP}
					width="100%"
				>
					<Stack alignSelf="center">
						<ListingGrid
							center
							listings={listingView.listings}
							isLoading={
								isLoading || listingView.isApplying
							}
							header={
								<GridHeader mb={2.5}>
									{(isLoading ||
										listingView.category.options
											.length > 0) && (
										<CategoryFilterMenu
											{...listingView.category}
										/>
									)}
									{(isLoading ||
										listingView.listings.length >
											0) && (
										<SortFilterDrawer
											options={
												LISTING_SORT_LABELS
											}
											value={
												listingView.sort.value
											}
											onChange={
												listingView.sort
													.onChange
											}
											priceFilter={
												listingView.price
											}
										/>
									)}
								</GridHeader>
							}
						/>
					</Stack>
				</Stack>
			)}
		</>
	);
};

const HeaderButton = (props: {
	icon: IconType;
	label: String;
	iconColor?: string;
	onClick?: () => void;
}) => (
	<Button
		size="lg"
		fontSize={20}
		variant="subtle"
		onClick={props.onClick}
	>
		<Box color={props.iconColor}>
			<props.icon />
		</Box>
		{props.label}
	</Button>
);
