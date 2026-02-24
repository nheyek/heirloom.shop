import {
	Accordion,
	Box,
	Button,
	ButtonProps,
	createListCollection,
	Flex,
	GridItem,
	Heading,
	Link,
	Portal,
	Select,
	SimpleGrid,
	Skeleton,
	Stack,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { API_ROUTES } from '@common/constants';
import { ListingPageData } from '@common/types/ListingPageData';
import { formatDateRange } from '@common/utils';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BiSolidPackage } from 'react-icons/bi';
import { FaHeart, FaPlusCircle } from 'react-icons/fa';
import {
	FaCheck,
	FaHourglassStart,
	FaLocationDot,
	FaShare,
	FaTruck,
} from 'react-icons/fa6';
import { RxDotFilled } from 'react-icons/rx';
import { useNavigate, useParams } from 'react-router-dom';
import { AppError } from '../components/feedback/AppError';
import { CountryFlagIcon } from '../components/icons/CountryFlagIcon';
import { ImageCollage } from '../components/imageDisplay/ImageCollage';
import { MultiImage } from '../components/imageDisplay/MultiImage';
import { IconText } from '../components/textDisplay/IconText';
import { RichText } from '../components/textDisplay/RichText';
import {
	CLIENT_ROUTES,
	CountryCode,
	countryDisplayName,
	Layout,
	STANDARD_IMAGE_ASPECT_RATIO,
} from '../constants';
import useApi from '../hooks/useApi';
import { useShareListing } from '../hooks/useShareListing';
import { useFavorites } from '../providers/FavoritesProvider';
import { useShoppingCart } from '../providers/ShoppingCartProvider';
import { FONT_DECORATIVE, FONT_DISPLAY_SANS } from '../theme';
import { toaster } from '../toaster';
import { getListingDataForCart } from '../utils/typeUtils';

const MotionFlex = motion.create(Flex);

export const ListingPage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const layout = useBreakpointValue({
		base: Layout.SINGLE_COLUMN,
		md: Layout.MULTI_COLUMN,
	});

	const maxWidth = 1100;

	const [listingData, setListingData] =
		useState<ListingPageData | null>(null);
	const [listingDataLoading, setListingDataLoading] =
		useState<boolean>(true);
	const [listingDataError, setListingDataError] = useState<
		string | null
	>(null);

	const [selectedVariationOptions, setSelectedVariationOptions] =
		useState<{
			[variationId: number]: number;
		}>({});

	const { getPublicResource } = useApi();
	const shareListing = useShareListing();
	const shoppingCart = useShoppingCart();
	const { favoriteIds, toggleFavorite } = useFavorites();
	const isFavorited = id && favoriteIds.has(id);

	const handleAddToCart = () => {
		if (!listingData) return;

		shoppingCart.addToCart(
			getListingDataForCart(listingData),
			selectedVariationOptions,
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
		const response = await getPublicResource(
			`${API_ROUTES.listings.base}/${id}`,
		);
		if (response.error) {
			setListingDataError(response.error.message);
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

	useEffect(() => {
		if (listingData) {
			setSelectedVariationOptions(
				listingData.variations.reduce(
					(acc, variation) => {
						if (variation.options.length > 0) {
							acc[variation.id] =
								variation.options[0].id;
						}
						return acc;
					},
					{} as { [variationId: number]: number },
				),
			);
		}
	}, [listingData]);

	let totalPriceDollars = listingData?.priceDollars || 0;
	for (const variation of listingData?.variations || []) {
		const selectedOptionId =
			selectedVariationOptions[variation.id];
		const selectedOption = variation.options.find(
			(option) => option.id === selectedOptionId,
		);
		if (variation.pricesVary && selectedOption) {
			totalPriceDollars +=
				selectedOption.additionalPriceDollars;
		}
	}

	const imageUrls =
		listingData?.imageUuids.map(
			(uuid) => `${process.env.LISTING_IMAGES_URL}/${uuid}.jpg`,
		) || [];

	const variationCollections =
		listingData?.variations.map((variation) => ({
			id: variation.id,
			name: variation.name,
			pricesVary: variation.pricesVary,
			collection: createListCollection({
				items: variation.options
					.sort(
						(optionA, optionB) =>
							optionA.additionalPriceDollars -
							optionB.additionalPriceDollars,
					)
					.map((option) => ({
						label:
							variation.pricesVary &&
							option.additionalPriceDollars > 0
								? `${option.name} (+$${option.additionalPriceDollars})`
								: option.name,
						value: option.id.toString(),
					})),
			}),
		})) || [];

	const daysToDelivery = listingData?.shippingDetails
		? {
				min:
					listingData.leadTimeDaysMin +
					listingData.shippingDetails.shipTimeDaysMin,
				max:
					listingData.leadTimeDaysMax +
					listingData.shippingDetails.shipTimeDaysMax,
			}
		: null;

	const returnPolicy = listingData?.returnExchangePolicy;
	let returnPolicyText = 'No returns or exchanges';
	if (
		returnPolicy &&
		(returnPolicy.exchangesAccepted ||
			returnPolicy.returnsAccepted) &&
		returnPolicy.returnWindowDays > 0
	) {
		let preface;
		if (
			returnPolicy.returnsAccepted &&
			returnPolicy.exchangesAccepted
		) {
			preface = 'Returns & exchanges';
		} else if (returnPolicy.returnsAccepted) {
			preface = 'Returns accepted';
		} else {
			preface = 'Exchanges accepted';
		}

		returnPolicyText = `${preface} within ${returnPolicy.returnWindowDays} days`;
	}

	const renderFullDescription = () => (
		<>
			<Accordion.Root
				variant="plain"
				collapsible
				multiple
				size="lg"
			>
				{listingData?.fullDescr?.map((item, index) => (
					<Accordion.Item
						key={index}
						value={index.toString()}
						fontFamily={FONT_DISPLAY_SANS}
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
								<RichText
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

	if (listingDataLoading) {
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
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1, ease: 'easeInOut' }}
		>
			{layout === Layout.MULTI_COLUMN && (
				<Box
					mx={5}
					mt={10}
				>
					<ImageCollage
						urls={imageUrls}
						maxWidth={maxWidth}
						aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
					/>
				</Box>
			)}
			{layout === Layout.SINGLE_COLUMN && (
				<MultiImage
					urls={imageUrls}
					aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
				/>
			)}
			<Box
				m={5}
				mt={10}
				maxWidth={maxWidth}
			>
				<SimpleGrid
					columns={{ base: 1, md: 2, lg: 5 }}
					gap={10}
				>
					<GridItem colSpan={{ base: 1, lg: 3 }}>
						<Stack gap={4}>
							<Flex direction="column">
								<Heading
									size="4xl"
									mr={5}
								>
									{listingData?.title}
								</Heading>

								<Heading
									size="2xl"
									fontWeight="medium"
								>
									<Link
										onClick={() =>
											navigate(
												`/${CLIENT_ROUTES.shop}/${listingData?.shopShortId}`,
											)
										}
									>
										{listingData?.shopTitle}
									</Link>
								</Heading>
							</Flex>
							<Stack
								fontSize={20}
								gap={1.5}
								fontFamily={FONT_DISPLAY_SANS}
							>
								{listingData?.subtitle}
								{listingData?.countryCode && (
									<Flex
										alignItems="center"
										gap={2.5}
										fontWeight={500}
									>
										<CountryFlagIcon
											countryCode={
												listingData.countryCode as CountryCode
											}
											size={24}
										/>
										Made in{' '}
										{
											countryDisplayName[
												listingData.countryCode as CountryCode
											]
										}
									</Flex>
								)}
							</Stack>

							{layout === Layout.MULTI_COLUMN &&
								renderFullDescription()}
						</Stack>
					</GridItem>
					<GridItem colSpan={{ base: 1, lg: 2 }}>
						<Stack
							gap={6}
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
												value={[
													selectedVariationOptions[
														variation.id
													]?.toString(),
												]}
												onValueChange={(
													e,
												) => {
													setSelectedVariationOptions(
														{
															...selectedVariationOptions,
															[variation.id]:
																Number(
																	e.value,
																),
														},
													);
												}}
											>
												<Select.HiddenSelect />
												<Select.Label>
													{variation.name}
												</Select.Label>
												<Select.Control>
													<Select.Trigger cursor="button">
														<Select.ValueText placeholder="Select an option" />
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

							<Stack gap={3}>
								<ListingPageButton
									size="xl"
									onClick={handleAddToCart}
								>
									<FaPlusCircle />
									Add to Cart
									<RxDotFilled />
									<Text
										fontSize={26}
										fontWeight={600}
										fontFamily={FONT_DECORATIVE}
										paddingBottom={1}
									>
										{' '}
										$
										{totalPriceDollars.toLocaleString()}
										.00
									</Text>
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
										<FaShare />
										Share
									</ListingPageButton>
								</SimpleGrid>
							</Stack>

							<Stack
								gap={1}
								fontFamily={FONT_DISPLAY_SANS}
							>
								{daysToDelivery && (
									<IconText icon={FaHourglassStart}>
										Estimated delivery
										<b>
											{formatDateRange(
												daysToDelivery!.min,
												daysToDelivery!.max,
											)}
										</b>
									</IconText>
								)}
								{listingData?.originZip && (
									<IconText icon={FaLocationDot}>
										Ships from
										<b>
											{listingData?.originZip}
										</b>
									</IconText>
								)}
								{listingData?.shippingDetails && (
									<IconText icon={FaTruck}>
										Ships to continental US for
										<b>
											{
												listingData
													?.shippingDetails
													?.shippingRate
											}
										</b>
									</IconText>
								)}
								<IconText icon={BiSolidPackage}>
									{returnPolicyText}
								</IconText>
							</Stack>
						</Stack>
					</GridItem>
					{layout === Layout.SINGLE_COLUMN &&
						renderFullDescription()}
				</SimpleGrid>
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
			<Skeleton
				width="80%"
				height="40px"
			/>
			<Skeleton
				width="60%"
				height="35px"
			/>
			<Stack gap={2}>
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

	if (props.layout === Layout.SINGLE_COLUMN) {
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
