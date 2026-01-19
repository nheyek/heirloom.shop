import {
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
import { ListingPageData } from '@common/types/ListingPageData';
import { formatDateRange } from '@common/utils';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BiSolidPackage } from 'react-icons/bi';
import { FaPlusCircle } from 'react-icons/fa';
import { FaHourglassStart, FaLocationDot, FaShare, FaTruck } from 'react-icons/fa6';
import { IoIosHeart } from 'react-icons/io';
import { RxDotFilled } from 'react-icons/rx';
import { useNavigate, useParams } from 'react-router-dom';
import { CountryFlagIcon } from '../components/icons/CountryFlagIcon';
import { IconText } from '../components/misc/IconText';
import { ImageCarousel } from '../components/misc/ImageCarousel';
import { ImageCollage } from '../components/misc/ImageCollage';
import { CountryCode } from '../constants';
import useApi from '../hooks/useApi';

const MotionBox = motion.create(Box);

enum ImageComponent {
	CAROUSEL,
	COLLAGE,
}

export const ListingPage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const imageComponent = useBreakpointValue({
		base: ImageComponent.CAROUSEL,
		md: ImageComponent.COLLAGE,
	});

	const [listingData, setListingData] = useState<ListingPageData | null>(null);
	const [listingDataLoading, setListingDataLoading] = useState<boolean>(true);
	const [listingDataError, setListingDataError] = useState<string | null>(null);

	const [selectedVariationOptions, setSelectedVariationOptions] = useState<{
		[variationId: number]: number;
	}>({});

	const { getPublicResource } = useApi();

	const loadListingData = async () => {
		const response = await getPublicResource(`listings/${id}`);
		if (response.error) {
			setListingDataError(response.data);
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
							acc[variation.id] = variation.options[0].id;
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
		const selectedOptionId = selectedVariationOptions[variation.id];
		const selectedOption = variation.options.find((option) => option.id === selectedOptionId);
		if (variation.pricesVary && selectedOption) {
			totalPriceDollars += selectedOption.additionalPriceDollars;
		}
	}

	const imageUrls =
		listingData?.imageUuids.map((uuid) => `${process.env.LISTING_IMAGES_URL}/${uuid}.jpg`) ||
		[];

	const variationCollections =
		listingData?.variations.map((variation) => ({
			id: variation.id,
			name: variation.name,
			pricesVary: variation.pricesVary,
			collection: createListCollection({
				items: variation.options
					.sort(
						(optionA, optionB) =>
							optionA.additionalPriceDollars - optionB.additionalPriceDollars,
					)
					.map((option) => ({
						label:
							variation.pricesVary && option.additionalPriceDollars > 0
								? `${option.name} (+$${option.additionalPriceDollars})`
								: option.name,
						value: option.id.toString(),
					})),
			}),
		})) || [];

	const daysToDelivery = listingData?.shippingDetails
		? {
				min: listingData.leadTimeDaysMin + listingData.shippingDetails.shipTimeDaysMin,
				max: listingData.leadTimeDaysMax + listingData.shippingDetails.shipTimeDaysMax,
			}
		: null;

	const returnPolicy = listingData?.returnExchangePolicy;
	let returnPolicyText = 'No returns or exchanges';
	if (
		returnPolicy &&
		(returnPolicy.exchangesAccepted || returnPolicy.returnsAccepted) &&
		returnPolicy.returnWindowDays > 0
	) {
		let preface;
		if (returnPolicy.returnsAccepted && returnPolicy.exchangesAccepted) {
			preface = 'Returns & exchanges';
		} else if (returnPolicy.returnsAccepted) {
			preface = 'Returns accepted';
		} else {
			preface = 'Exchanges accepted';
		}

		returnPolicyText = `${preface} within ${returnPolicy.returnWindowDays} days`;
	}

	return (
		<Flex flexDir="column" alignItems="start" width="fit-content" mx="auto">
			{listingDataLoading && <Skeleton width="100vw" height={500} />}
			{!listingDataLoading && (
				<MotionBox
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, ease: 'easeInOut' }}
					mx="auto"
				>
					{imageComponent === ImageComponent.COLLAGE && (
						<Box pt={5} px={5} mx="auto">
							<ImageCollage urls={imageUrls} aspectRatio={3 / 2} />
						</Box>
					)}
					{imageComponent === ImageComponent.CAROUSEL && (
						<ImageCarousel urls={imageUrls} aspectRatio={3 / 2} />
					)}
				</MotionBox>
			)}
			<Box p={{ base: 5, md: 7, lg: 9 }} pt={10} mx="auto" maxWidth={1200}>
				<SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} gap={10}>
					<GridItem colSpan={{ base: 1, lg: 3 }}>
						<Stack gap={3}>
							<Heading mr={5} size="4xl">
								{listingData?.title}
							</Heading>

							<Flex alignItems="center" gap={3} fontSize={22}>
								<CountryFlagIcon countryCode={CountryCode.US} size={26} />

								<Link onClick={() => navigate(`/shop/${listingData?.shopId}`)}>
									{listingData?.shopTitle}
								</Link>
							</Flex>

							<Text fontSize={18}>{listingData?.subtitle}</Text>
						</Stack>
					</GridItem>
					<GridItem colSpan={{ base: 1, lg: 2 }}>
						<Stack gap={6} width="100%">
							{variationCollections.length > 0 && (
								<Stack gap={3}>
									{variationCollections.map((variation) => (
										<Select.Root
											key={variation.id}
											variant="subtle"
											collection={variation.collection}
											size="lg"
											value={[
												selectedVariationOptions[variation.id]?.toString(),
											]}
											onValueChange={(e) => {
												setSelectedVariationOptions({
													...selectedVariationOptions,
													[variation.id]: Number(e.value),
												});
											}}
										>
											<Select.HiddenSelect />
											<Select.Label fontSize={16} fontWeight="bold">
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
																(option) => (
																	<Select.Item
																		item={option}
																		key={option.value}
																	>
																		{option.label}
																		<Select.ItemIndicator />
																	</Select.Item>
																),
															)}
														</Select.Content>
													</Select.Positioner>
												</Portal>
											</Select.Control>
										</Select.Root>
									))}
								</Stack>
							)}

							<Stack gap={3}>
								<ListingPageButton size="xl">
									<FaPlusCircle />
									Add to Cart
									<RxDotFilled />
									<Text
										height="28px"
										fontSize="28px"
										fontWeight={600}
										fontFamily="Alegreya"
									>
										${totalPriceDollars.toLocaleString()}
									</Text>
								</ListingPageButton>
								<SimpleGrid columns={2} gap={3}>
									<ListingPageButton size="lg">
										<IoIosHeart />
										Save
									</ListingPageButton>
									<ListingPageButton size="lg">
										<FaShare />
										Share
									</ListingPageButton>
								</SimpleGrid>
							</Stack>

							<Stack gap={1.5} pl={2}>
								{daysToDelivery && (
									<IconText icon={FaHourglassStart}>
										Estimated delivery
										<b>
											{formatDateRange(
												daysToDelivery.min,
												daysToDelivery.max,
											)}
										</b>
									</IconText>
								)}
								{listingData?.originZip && (
									<IconText icon={FaLocationDot}>
										Ships from
										<b>{listingData?.originZip}</b>
									</IconText>
								)}
								{listingData?.shippingDetails && (
									<IconText icon={FaTruck}>
										Ships to continental US for
										<b>{listingData?.shippingDetails?.shippingRate}</b>
									</IconText>
								)}
								<IconText icon={BiSolidPackage}>{returnPolicyText}</IconText>
							</Stack>
						</Stack>
					</GridItem>
					<GridItem colSpan={{ base: 1, lg: 3 }}>
						<Box>[Full description]</Box>
					</GridItem>
				</SimpleGrid>
			</Box>
		</Flex>
	);
};

const ListingPageButton = (props: ButtonProps) => (
	<Button width="100%" fontWeight="bold" {...props} borderRadius="full" />
);
