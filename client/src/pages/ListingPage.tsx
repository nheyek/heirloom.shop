import {
	Box,
	Button,
	ButtonProps,
	Center,
	Flex,
	HStack,
	Icon,
	Link,
	SimpleGrid,
	Span,
	Stack,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { AppError } from '@client/components/feedback/AppError';
import { CountryFlagIcon } from '@client/components/icons/CountryFlagIcon';
import { ImageCollage } from '@client/components/imageDisplay/ImageCollage';
import { MultiImage } from '@client/components/imageDisplay/MultiImage';
import { ListingFulfillmentInfo } from '@client/components/listingPage/ListingFulfillmentInfo';
import { ListingFullDescription } from '@client/components/listingPage/ListingFullDescription';
import { ListingPageSkeleton } from '@client/components/listingPage/ListingPageSkeleton';
import { PersonalizationOption } from '@client/components/listingPage/PersonalizationOption';
import { useListingData } from '@client/components/listingPage/useListingData';
import { usePersonalization } from '@client/components/listingPage/usePersonalization';
import { useVariationSelection } from '@client/components/listingPage/useVariationSelection';
import { VariationSelect } from '@client/components/listingPage/VariationSelect';
import { CategoryBreadcrumb } from '@client/components/navigation/CategoryBreadcrumb';
import {
	CLIENT_ROUTES,
	CountryCode,
	countryDisplayName,
	Layout,
	LISTING_IMAGE_ASPECT_RATIO,
} from '@client/constants';
import {
	getDeliveryEstimateDisplay,
	getReturnPolicyDisplay,
	resolveEffectiveProfiles,
} from '@client/domain/listingPage';
import { useMinDuration } from '@client/hooks/useMinDuration';
import { useShareListing } from '@client/hooks/useShareListing';
import { useCategories } from '@client/providers/CategoriesProvider';
import { useFavorites } from '@client/providers/FavoritesProvider';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';
import { displayFontFamily } from '@client/theme';
import { toastSuccess } from '@client/toaster';
import { listingImageUrl } from '@client/utils/imageUtils';
import { getListingDataForCart } from '@client/utils/mappers';
import {
	getListingDisplayPrice,
	ListingDisplayPrice,
} from '@heirloom/common/domain/listing';
import { formatCentsAsDollars } from '@heirloom/common/utils/priceDisplay';
import {
	FaBan,
	FaHeart,
	FaPlusCircle,
	FaShareAlt,
} from 'react-icons/fa';
import { FaCheck, FaShop } from 'react-icons/fa6';
import { RxDotFilled } from 'react-icons/rx';
import { useNavigate, useParams } from 'react-router-dom';

export const ListingPage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const layout = useBreakpointValue({
		base: Layout.COMPACT,
		md: Layout.STANDARD,
	});

	const maxWidth = 1200;

	const { listingData, listingDataLoading, listingDataError } =
		useListingData(id);
	const {
		selectedVariationOptions,
		selectOption,
		orderedImageUuids,
		variationCollections,
		allVariationsSelected,
	} = useVariationSelection(listingData);
	const personalization = usePersonalization();

	const shareListing = useShareListing();
	const { getCategory, getAncestorCategories, categoriesLoading } =
		useCategories();
	const showSkeleton = useMinDuration(
		listingDataLoading || categoriesLoading,
	);
	const shoppingCart = useShoppingCart();
	const { favoriteIds, toggleFavorite } = useFavorites();
	const isFavorited = id && favoriteIds.has(id);

	const handleAddToCart = () => {
		if (!listingData) return;
		if (!personalization.validate()) return;

		shoppingCart.addToCart(
			getListingDataForCart(listingData),
			selectedVariationOptions,
			personalization.enabled
				? personalization.text.trim() || undefined
				: undefined,
		);

		toastSuccess('Added to Cart', listingData.title, {
			action: {
				label: 'View',
				onClick: shoppingCart.openDrawer,
			},
		});
	};

	const imageUrls = listingData
		? orderedImageUuids.map((uuid) =>
				listingImageUrl(listingData.shopShortId, uuid),
			)
		: [];

	const personalizationProfile =
		listingData?.profiles?.personalization;

	const displayPrice: ListingDisplayPrice = listingData
		? getListingDisplayPrice(
				listingData.variations,
				listingData.combinations,
				listingData.priceCents,
				selectedVariationOptions,
				{
					costCents: personalizationProfile?.costCents,
					selected: personalization.enabled,
				},
			)
		: null;

	const profiles = listingData
		? resolveEffectiveProfiles(listingData)
		: null;

	const deliveryEstimate = getDeliveryEstimateDisplay(profiles);
	const returnPolicyDisplay = getReturnPolicyDisplay(
		profiles?.returns,
	);

	if (listingDataError) {
		return (
			<AppError
				title="Failed to load listing"
				content={listingDataError}
			/>
		);
	}

	if (showSkeleton) {
		return (
			<ListingPageSkeleton
				maxWidth={maxWidth}
				layout={layout}
			/>
		);
	}

	return (
		<Flex
			flexDir="column"
			width="fit-content"
			alignItems="center"
			mx="auto"
		>
			{layout === Layout.STANDARD && (
				<Box
					mx={5}
					mt={5}
					width="100%"
				>
					<Center>
						<ImageCollage
							urls={imageUrls}
							maxWidth={maxWidth}
							aspectRatio={LISTING_IMAGE_ASPECT_RATIO}
						/>
					</Center>
				</Box>
			)}
			{layout === Layout.COMPACT && (
				<MultiImage
					urls={imageUrls}
					aspectRatio={LISTING_IMAGE_ASPECT_RATIO}
				/>
			)}
			<Box
				m={5}
				maxWidth={maxWidth}
			>
				<Flex
					direction={{ base: 'column', md: 'row' }}
					gap={layout === Layout.COMPACT ? 5 : 10}
				>
					<Box
						flex="1"
						minW={0}
					>
						<Stack gap={4}>
							<Stack
								gap={1}
								fontFamily={displayFontFamily}
								mr={5}
							>
								<Text
									fontSize={36}
									fontWeight={600}
								>
									{listingData?.title}
								</Text>

								<HStack
									fontWeight={500}
									fontSize={24}
								>
									<Icon as={FaShop} />
									<Link
										onClick={() =>
											navigate(
												`/${CLIENT_ROUTES.shop}/${listingData?.shopShortId}`,
											)
										}
									>
										{listingData?.shopTitle}
									</Link>
								</HStack>

								{listingData && (
									<CategoryBreadcrumb
										categoryId={
											listingData.categoryId
										}
										fontSize={22}
										currentIsLink
									/>
								)}
							</Stack>
							<Stack
								fontSize={20}
								fontFamily={displayFontFamily}
								gap={1.5}
							>
								<Text>{listingData?.subtitle}</Text>
								{listingData?.countryCode && (
									<HStack gap={2.5}>
										<CountryFlagIcon
											countryCode={
												listingData.countryCode as CountryCode
											}
											size={22}
										/>
										<Span fontWeight={500}>
											Made in{' '}
											{
												countryDisplayName[
													listingData.countryCode as CountryCode
												]
											}
										</Span>
									</HStack>
								)}
							</Stack>

							{layout === Layout.STANDARD && (
								<ListingFullDescription
									fullDescr={listingData?.fullDescr}
								/>
							)}
						</Stack>
					</Box>
					<Box
						flexShrink={0}
						width={{ base: '100%', md: 375 }}
					>
						<Stack
							gap={5}
							width="100%"
						>
							{variationCollections.length > 0 && (
								<Stack gap={3}>
									{variationCollections.map(
										(variation) => (
											<VariationSelect
												key={variation.id}
												variation={variation}
												value={
													selectedVariationOptions[
														variation.id
													]
												}
												onChange={(
													optionId,
												) =>
													selectOption(
														variation.id,
														optionId,
													)
												}
											/>
										),
									)}
								</Stack>
							)}
							{personalizationProfile && (
								<PersonalizationOption
									profile={personalizationProfile}
									enabled={personalization.enabled}
									text={personalization.text}
									textError={
										personalization.textError
									}
									onToggle={
										personalization.onToggle
									}
									onTextChange={
										personalization.onTextChange
									}
								/>
							)}

							<Stack gap={3}>
								<ListingPageButton
									size="xl"
									onClick={handleAddToCart}
									disabled={
										!listingData?.available ||
										!profiles?.shipping ||
										!allVariationsSelected ||
										!displayPrice
									}
								>
									{listingData?.available &&
									displayPrice ? (
										<>
											<FaPlusCircle />
											Add to Cart
											<RxDotFilled />
											<Text
												fontSize={26}
												fontWeight={600}
												fontFamily={
													displayFontFamily
												}
												paddingBottom={1}
											>
												{formatCentsAsDollars(
													displayPrice.priceCents,
												)}
												{displayPrice.isMinimum &&
													'+'}
											</Text>
										</>
									) : (
										<>
											<FaBan />
											<Text>
												Currently Unavailable
											</Text>
										</>
									)}
								</ListingPageButton>
								<SimpleGrid
									columns={2}
									gap={3}
								>
									<ListingPageButton
										size="lg"
										onClick={() =>
											listingData &&
											toggleFavorite(
												listingData,
											)
										}
										variant={
											isFavorited
												? 'outline'
												: 'solid'
										}
									>
										{isFavorited ? (
											<>
												<FaCheck />
												Favorited
											</>
										) : (
											<>
												<FaHeart />
												Favorite
											</>
										)}
									</ListingPageButton>
									<ListingPageButton
										size="lg"
										onClick={() =>
											listingData &&
											shareListing(listingData)
										}
									>
										<FaShareAlt />
										Share
									</ListingPageButton>
								</SimpleGrid>
							</Stack>

							<ListingFulfillmentInfo
								profiles={profiles}
								deliveryEstimate={deliveryEstimate}
								returnPolicy={returnPolicyDisplay}
								directFulfillment={
									!!listingData?.directFulfillment
								}
							/>
						</Stack>
					</Box>
					{layout === Layout.COMPACT && (
						<ListingFullDescription
							fullDescr={listingData?.fullDescr}
						/>
					)}
				</Flex>
			</Box>
		</Flex>
	);
};

const ListingPageButton = (props: ButtonProps) => (
	<Button
		width="100%"
		fontSize={20}
		{...props}
	/>
);
