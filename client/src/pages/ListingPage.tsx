import {
	Accordion,
	Box,
	Button,
	ButtonProps,
	Center,
	CheckboxCard,
	createListCollection,
	Flex,
	GridItem,
	HStack,
	Icon,
	Input,
	Link,
	Popover,
	Portal,
	Select,
	SimpleGrid,
	Skeleton,
	Span,
	Stack,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { Logo } from '@client/components/branding/Logo';
import { AppError } from '@client/components/feedback/AppError';
import { CountryFlagIcon } from '@client/components/icons/CountryFlagIcon';
import { ImageCollage } from '@client/components/imageDisplay/ImageCollage';
import { MultiImage } from '@client/components/imageDisplay/MultiImage';
import { FieldError } from '@client/components/input/FieldError';
import { CategoryBreadcrumb } from '@client/components/navigation/CategoryBreadcrumb';
import { RichTextDisplay } from '@client/components/richText/RichTextDisplay';
import { IconText } from '@client/components/textDisplay/IconText';
import {
	CLIENT_ROUTES,
	CountryCode,
	countryDisplayName,
	Layout,
	STANDARD_IMAGE_ASPECT_RATIO,
	STANDARD_RETURN_POLICY_HTML,
} from '@client/constants';
import { HEIRLOOM_LISTING_PROFILES } from '@client/constants/heirloomProfiles';
import { useApiClient } from '@client/hooks/useApiClient';
import { useShareListing } from '@client/hooks/useShareListing';
import { useCategories } from '@client/providers/CategoriesProvider';
import { useFavorites } from '@client/providers/FavoritesProvider';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';
import {
	COLOR_BRAND,
	FIELD_ERROR_COLOR,
	FONT_DECORATIVE,
} from '@client/theme';
import { toaster } from '@client/toaster';
import { callApi } from '@client/utils/apiUtils';
import { getListingDataForCart } from '@client/utils/mappers';
import { ReturnPolicyType } from '@heirloom/common/constants';
import { ListingPageData } from '@heirloom/common/contract';
import {
	getCombinationKey,
	getListingDisplayPrice,
	ListingDisplayPrice,
	resolveEffectiveCombinationImage,
} from '@heirloom/common/domain/listing';
import { calculateDeliveryEstimate } from '@heirloom/common/utils/dateUtils';
import { formatCentsAsDollars } from '@heirloom/common/utils/priceDisplay';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
	FaBan,
	FaExchangeAlt,
	FaHeart,
	FaPlusCircle,
	FaShareAlt,
	FaSignature,
} from 'react-icons/fa';
import {
	FaCheck,
	FaCheckDouble,
	FaCircleInfo,
	FaHourglassStart,
	FaLocationDot,
	FaShop,
	FaTruck,
} from 'react-icons/fa6';
import { RxDotFilled } from 'react-icons/rx';
import { useNavigate, useParams } from 'react-router-dom';

const MotionFlex = motion.create(Flex);

export const ListingPage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const layout = useBreakpointValue({
		base: Layout.COMPACT,
		md: Layout.STANDARD,
	});

	const maxWidth = 1200;

	const [personalizationEnabled, setPersonalizationEnabled] =
		useState(false);
	const [personalizationText, setPersonalizationText] =
		useState('');
	const [personalizationTextError, setPersonalizationTextError] =
		useState<string | null>(null);

	const [listingData, setListingData] =
		useState<ListingPageData | null>(null);
	const [listingDataLoading, setListingDataLoading] =
		useState<boolean>(true);
	const [listingDataError, setListingDataError] = useState<
		string | null
	>(null);

	const [selectedVariationOptions, setSelectedVariationOptions] =
		useState<Record<string, string>>({});

	const apiClient = useApiClient();
	const shareListing = useShareListing();
	const { getCategory, getAncestorCategories, categoriesLoading } =
		useCategories();
	const shoppingCart = useShoppingCart();
	const { favoriteIds, toggleFavorite } = useFavorites();
	const isFavorited = id && favoriteIds.has(id);

	const handleAddToCart = () => {
		if (!listingData) return;

		if (personalizationEnabled && !personalizationText.trim()) {
			setPersonalizationTextError('This field is required.');
			return;
		}

		shoppingCart.addToCart(
			getListingDataForCart(listingData),
			selectedVariationOptions,
			personalizationEnabled
				? personalizationText.trim() || undefined
				: undefined,
		);

		toaster.create({
			title: 'Added to Cart',
			description: listingData.title,
			type: 'success',
			action: {
				label: 'View',
				onClick: shoppingCart.openDrawer,
			},
		});
	};

	const loadListingData = async () => {
		if (!id) return;

		const result = await callApi(
			apiClient.listings.getById({ params: { id } }),
		);
		if (result.error !== null) {
			setListingDataError(result.error);
		} else {
			setListingData(result.data);
		}
		setListingDataLoading(false);
	};

	useEffect(() => {
		setListingDataLoading(true);
		setListingDataError(null);

		loadListingData();
	}, [id]);

	useEffect(() => {
		setSelectedVariationOptions({});
	}, [listingData]);

	const effectiveImageUuid = listingData
		? resolveEffectiveCombinationImage(
				selectedVariationOptions,
				listingData.combinations,
				listingData.variations,
			)
		: null;

	const orderedImageUuids = listingData
		? effectiveImageUuid
			? [
					effectiveImageUuid,
					...listingData.imageUuids.filter(
						(uuid) => uuid !== effectiveImageUuid,
					),
				]
			: listingData.imageUuids
		: [];

	const imageUrls = listingData
		? orderedImageUuids.map(
				(uuid) =>
					`${process.env.LISTING_IMAGES_URL}/${listingData.shopShortId}/${uuid}.jpg`,
			)
		: [];

	type VariationCollectionItem = {
		value: string;
		label: string;
		disabled: boolean;
	};
	const variationCollections: Array<{
		id: string;
		name: string;
		collection: ReturnType<
			typeof createListCollection<VariationCollectionItem>
		>;
	}> = listingData
		? Object.entries(listingData.variations)
				.sort(([, a], [, b]) => a.order - b.order)
				.map(([varId, variation]) => {
					// Options can only be marked unavailable once every
					// other variation has a selection — before that the
					// combination key is incomplete.
					const othersSelected = Object.keys(
						listingData.variations,
					)
						.filter((id) => id !== varId)
						.every(
							(id) =>
								selectedVariationOptions[id] != null,
						);
					return {
						id: varId,
						name: variation.name,
						collection: createListCollection({
							items: Object.entries(variation.options)
								.sort(
									([, a], [, b]) =>
										a.order - b.order,
								)
								.map(([optId, option]) => {
									const key = getCombinationKey({
										...selectedVariationOptions,
										[varId]: optId,
									});
									return {
										value: optId,
										label: option.name,
										disabled: othersSelected
											? (listingData
													.combinations[key]
													?.disabled ??
												true)
											: false,
									};
								}),
						}),
					};
				})
		: [];

	const allVariationsSelected = listingData
		? Object.keys(listingData.variations).every(
				(id) => selectedVariationOptions[id] != null,
			)
		: false;

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
					selected: personalizationEnabled,
				},
			)
		: null;

	const profiles = listingData
		? listingData.directFulfillment
			? listingData.profiles
			: HEIRLOOM_LISTING_PROFILES
		: null;

	const deliveryEstimate =
		profiles?.processing && profiles?.shipping
			? calculateDeliveryEstimate(
					profiles.processing,
					profiles.shipping,
				)
			: 'Delivery estimate unavailable';

	const returnPolicy = profiles?.returns;
	let returnPolicyText = returnPolicy
		? 'No returns'
		: 'Returns info unavailable';
	if (
		returnPolicy &&
		returnPolicy.policyType !== ReturnPolicyType.NO_RETURNS &&
		(returnPolicy.returnWindowDays ?? 0) > 0
	) {
		returnPolicyText = `Returns accepted within ${returnPolicy.returnWindowDays} days`;
	}
	const returnPolicyDescrHtml =
		returnPolicy?.policyType === ReturnPolicyType.STANDARD
			? STANDARD_RETURN_POLICY_HTML
			: returnPolicy?.policyType === ReturnPolicyType.CUSTOM
				? (returnPolicy.policyDescrRichText ?? null)
				: null;

	const renderFullDescription = () => (
		<>
			<Accordion.Root
				variant="plain"
				collapsible
				multiple
				size="lg"
				defaultValue={
					listingData?.fullDescr?.length ? ['0'] : undefined
				}
			>
				{listingData?.fullDescr?.map((item, index) => (
					<Accordion.Item
						key={index}
						value={index.toString()}
					>
						<Accordion.ItemTrigger>
							<Text
								flex="1"
								fontSize={20}
							>
								{item.title}
							</Text>
							<Accordion.ItemIndicator />
						</Accordion.ItemTrigger>
						<Accordion.ItemContent>
							<Accordion.ItemBody
								pt={0}
								pb={2}
							>
								<RichTextDisplay
									htmlString={item.richText}
								/>
							</Accordion.ItemBody>
						</Accordion.ItemContent>
					</Accordion.Item>
				))}
			</Accordion.Root>
		</>
	);

	if (listingDataError) {
		return (
			<AppError
				title="Failed to load listing"
				content={listingDataError}
			/>
		);
	}

	if (listingDataLoading || categoriesLoading) {
		return (
			<LoadingSkeleton
				maxWidth={maxWidth}
				layout={layout}
			/>
		);
	}

	return (
		<MotionFlex
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
							aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
						/>
					</Center>
				</Box>
			)}
			{layout === Layout.COMPACT && (
				<MultiImage
					urls={imageUrls}
					aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
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
								fontFamily={FONT_DECORATIVE}
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
								fontFamily={FONT_DECORATIVE}
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

							{layout === Layout.STANDARD &&
								renderFullDescription()}
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
											<Select.Root
												key={variation.id}
												variant="subtle"
												collection={
													variation.collection
												}
												size="lg"
												value={
													selectedVariationOptions[
														variation.id
													] != null
														? [
																selectedVariationOptions[
																	variation
																		.id
																],
															]
														: []
												}
												onValueChange={(
													e,
												) => {
													setSelectedVariationOptions(
														{
															...selectedVariationOptions,
															[variation.id]:
																e
																	.value[0] ??
																'',
														},
													);
												}}
											>
												<Select.HiddenSelect />
												<Select.Label
													fontSize={16}
												>
													{variation.name}
												</Select.Label>
												<Select.Control>
													<Select.Trigger cursor="button">
														<Select.ValueText
															placeholder={`Select ${variation.name.toLowerCase()}`}
															color={
																selectedVariationOptions[
																	variation
																		.id
																] ==
																null
																	? 'fg.muted'
																	: undefined
															}
														/>
													</Select.Trigger>
													<Select.IndicatorGroup>
														<Select.Indicator />
													</Select.IndicatorGroup>
													<Portal>
														<Select.Positioner>
															<Select.Content>
																{variation.collection.items.map(
																	(
																		option,
																	) => (
																		<Select.Item
																			item={
																				option
																			}
																			key={
																				option.value
																			}
																		>
																			{
																				option.label
																			}
																			<Select.ItemIndicator />
																		</Select.Item>
																	),
																)}
															</Select.Content>
														</Select.Positioner>
													</Portal>
												</Select.Control>
											</Select.Root>
										),
									)}
								</Stack>
							)}
							{personalizationProfile && (
								<CheckboxCard.Root
									checked={personalizationEnabled}
									onCheckedChange={(e) => {
										setPersonalizationEnabled(
											!!e.checked,
										);
										if (!e.checked)
											setPersonalizationTextError(
												null,
											);
									}}
									size="md"
								>
									<CheckboxCard.HiddenInput />
									<CheckboxCard.Control>
										<Stack
											width="100%"
											gap={3}
										>
											<HStack justifyContent="space-between">
												<HStack gap={1}>
													<Flex px={1}>
														<Icon
															h={5}
															w={5}
															as={
																FaSignature
															}
														/>
													</Flex>

													<CheckboxCard.Label
														fontWeight={
															500
														}
														fontSize={16}
													>
														{
															personalizationProfile.name
														}{' '}
													</CheckboxCard.Label>
												</HStack>

												<HStack gap={3}>
													<Text fontSize={18}>
														{formatCentsAsDollars(
															personalizationProfile.costCents,
														)}
													</Text>
													<CheckboxCard.Indicator />
												</HStack>
											</HStack>

											{personalizationEnabled && (
												<Stack
													gap={2}
													onPointerDownCapture={(
														e,
													) =>
														e.stopPropagation()
													}
												>
													<Input
														variant="outline"
														size="lg"
														width="100%"
														fontSize={18}
														value={
															personalizationText
														}
														onChange={(
															e,
														) => {
															setPersonalizationText(
																e
																	.target
																	.value,
															);
															if (
																e.target.value.trim()
															)
																setPersonalizationTextError(
																	null,
																);
														}}
														placeholder={
															personalizationProfile.name
														}
														borderColor={
															personalizationTextError
																? FIELD_ERROR_COLOR
																: undefined
														}
													/>
													{personalizationTextError && (
														<FieldError>
															{
																personalizationTextError
															}
														</FieldError>
													)}
													{personalizationProfile.helperText && (
														<Text
															fontSize={
																16
															}
															color="fg.muted"
														>
															{
																personalizationProfile.helperText
															}
														</Text>
													)}
												</Stack>
											)}
										</Stack>
									</CheckboxCard.Control>
								</CheckboxCard.Root>
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
													FONT_DECORATIVE
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

							<Stack gap={1}>
								<IconText icon={FaHourglassStart}>
									{profiles?.processing &&
									profiles?.shipping ? (
										<>
											Estimated delivery{' '}
											<b>{deliveryEstimate}</b>
										</>
									) : (
										deliveryEstimate
									)}
								</IconText>
								<IconText icon={FaTruck}>
									{profiles?.shipping ? (
										<>
											Ships to continental US
											for{' '}
											<b>
												{profiles.shipping
													.shippingRate
													? formatCentsAsDollars(
															profiles
																.shipping
																.shippingRate,
														)
													: 'Free'}
											</b>
										</>
									) : (
										'Shipping info unavailable'
									)}
								</IconText>
								<IconText icon={FaExchangeAlt}>
									{returnPolicyText}
									{returnPolicyDescrHtml && (
										<Popover.Root
											positioning={{
												placement: 'top',
											}}
										>
											<Popover.Trigger
												pl={1}
												cursor="pointer"
											>
												<FaCircleInfo
													size={16}
												/>
											</Popover.Trigger>
											<Portal>
												<Popover.Positioner>
													<Popover.Content
														maxWidth={300}
													>
														<Popover.Arrow />
														<Popover.Body>
															<RichTextDisplay
																htmlString={
																	returnPolicyDescrHtml
																}
																fontSize={
																	16
																}
															/>
														</Popover.Body>
													</Popover.Content>
												</Popover.Positioner>
											</Portal>
										</Popover.Root>
									)}
								</IconText>
								{listingData?.directFulfillment ? (
									profiles?.shipping && (
										<IconText
											icon={FaLocationDot}
										>
											Ships from
											<b>
												{
													profiles.shipping
														.originZip
												}
											</b>
										</IconText>
									)
								) : (
									<IconText icon={FaCheckDouble}>
										<HStack gap={1}>
											Fulfilled by
											<Box width={76}>
												<Logo
													fill={COLOR_BRAND}
												/>
											</Box>
										</HStack>
									</IconText>
								)}
							</Stack>
						</Stack>
					</Box>
					{layout === Layout.COMPACT &&
						renderFullDescription()}
				</Flex>
			</Box>
		</MotionFlex>
	);
};

const ListingPageButton = (props: ButtonProps) => (
	<Button
		width="100%"
		fontSize={20}
		{...props}
	/>
);

const LoadingSkeleton = (props: {
	layout?: Layout;
	maxWidth: number;
}) => {
	const renderBasicInfoSection = () => (
		<Stack gap={4}>
			<Stack gap={2}>
				<Skeleton
					width="80%"
					height="50px"
				/>
				<Skeleton
					width="55%"
					height="30px"
				/>
				<Skeleton
					width="65%"
					height="30px"
				/>
			</Stack>
			<Stack gap={1}>
				<Skeleton
					width="90%"
					height="20px"
				/>
				<Skeleton
					width="95%"
					height="20px"
				/>
				<Skeleton
					width="75%"
					height="20px"
				/>
			</Stack>
		</Stack>
	);

	const renderButtonsAndFulfillmentSection = () => (
		<Stack gap={6}>
			<Skeleton height="100px" />
			<Stack gap={3}>
				<Skeleton
					width="40%"
					height="20px"
				/>
				<Skeleton
					width="60%"
					height="20px"
				/>
				<Skeleton
					width="50%"
					height="20px"
				/>
			</Stack>
		</Stack>
	);

	if (props.layout === Layout.COMPACT) {
		return (
			<Stack gap={10}>
				<Skeleton
					width="100%"
					aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
				></Skeleton>

				<Stack
					gap={10}
					mx={5}
				>
					{renderBasicInfoSection()}
					{renderButtonsAndFulfillmentSection()}
				</Stack>
			</Stack>
		);
	}

	return (
		<SimpleGrid
			maxW={props.maxWidth}
			columns={2}
			gap={10}
			p={10}
			mx="auto"
		>
			<GridItem colSpan={2}>
				<SimpleGrid
					columns={4}
					gap={3}
				>
					<GridItem
						colSpan={2}
						rowSpan={2}
					>
						<Skeleton
							aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
							height="100%"
							width="100%"
						></Skeleton>
					</GridItem>
					<GridItem>
						<Skeleton
							aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
						></Skeleton>
					</GridItem>
					<GridItem>
						<Skeleton
							aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
						></Skeleton>
					</GridItem>
					<GridItem>
						<Skeleton
							aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
						></Skeleton>
					</GridItem>
					<GridItem>
						<Skeleton
							aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
						></Skeleton>
					</GridItem>
				</SimpleGrid>
			</GridItem>
			<GridItem>{renderBasicInfoSection()}</GridItem>
			<GridItem>
				{renderButtonsAndFulfillmentSection()}
			</GridItem>
		</SimpleGrid>
	);
};
