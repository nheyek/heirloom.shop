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
import { FaPlusCircle } from 'react-icons/fa';
import { FaHourglassStart, FaLocationDot, FaShare, FaTruck } from 'react-icons/fa6';
import { IoIosHeart } from 'react-icons/io';
import { RxDotFilled } from 'react-icons/rx';
import { useNavigate, useParams } from 'react-router-dom';
import { CountryFlagIcon } from '../components/icons/CountryFlagIcon';
import { IconText } from '../components/misc/IconText';
import { ImageCarousel } from '../components/misc/ImageCarousel';
import { ImageCollage } from '../components/misc/ImageCollage';
import { RichTextRenderer } from '../components/misc/RichTextRenderer';
import { CLIENT_ROUTES, CountryCode, STANDARD_IMAGE_ASPECT_RATIO } from '../constants';
import useApi from '../hooks/useApi';

const MotionFlex = motion.create(Flex);

enum Layout {
	SINGLE_COLUMN,
	MULTI_COLUMN,
}

export const ListingPage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const layout = useBreakpointValue({
		base: Layout.SINGLE_COLUMN,
		md: Layout.MULTI_COLUMN,
	});

	const maxWidth = 1200;

	const [listingData, setListingData] = useState<ListingPageData | null>(null);
	const [listingDataLoading, setListingDataLoading] = useState<boolean>(true);
	const [listingDataError, setListingDataError] = useState<string | null>(null);

	const [selectedVariationOptions, setSelectedVariationOptions] = useState<{
		[variationId: number]: number;
	}>({});

	const { getPublicResource } = useApi();

	const loadListingData = async () => {
		const response = await getPublicResource(`${API_ROUTES.listings}/${id}`);
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

	const renderFullDescription = () => (
		<>
			<Accordion.Root variant="plain" collapsible defaultValue={['0']} multiple size="lg">
				{listingData?.fullDescr?.map((item, index) => (
					<Accordion.Item key={index} value={index.toString()}>
						<Accordion.ItemTrigger>
							<Text fontSize={18} fontWeight="bold" flex="1">
								{item.title}
							</Text>
							<Accordion.ItemIndicator />
						</Accordion.ItemTrigger>
						<Accordion.ItemContent>
							<Accordion.ItemBody pt={0} pb={2}>
								<RichTextRenderer htmlString={item.richText} />
							</Accordion.ItemBody>
						</Accordion.ItemContent>
					</Accordion.Item>
				))}
			</Accordion.Root>
		</>
	);

	if (listingDataLoading) {
		return <LoadingSkeleton maxWidth={maxWidth} layout={layout} />;
	}

	return (
		<MotionFlex
			flexDir="column"
			alignItems="start"
			width="fit-content"
			mx="auto"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1, ease: 'easeInOut' }}
		>
			{layout === Layout.MULTI_COLUMN && (
				<Box pt={5} px={5} mx="auto">
					<ImageCollage
						urls={imageUrls}
						maxWidth={maxWidth}
						aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
					/>
				</Box>
			)}
			{layout === Layout.SINGLE_COLUMN && (
				<ImageCarousel urls={imageUrls} aspectRatio={STANDARD_IMAGE_ASPECT_RATIO} />
			)}
			<Box p={{ base: 5, md: 7, lg: 9 }} pt={5} mx="auto" maxWidth={maxWidth}>
				<SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} gap={10}>
					<GridItem colSpan={{ base: 1, lg: 3 }}>
						<Stack gap={2}>
							<Heading mr={5} size="4xl">
								{listingData?.title}
							</Heading>

							<Flex alignItems="center" gap={2} fontSize={22}>
								<CountryFlagIcon
									countryCode={listingData?.countryCode as CountryCode}
									size={26}
								/>

								<Link
									onClick={() =>
										navigate(
											`/${CLIENT_ROUTES.shopManager}/${listingData?.shopId}`,
										)
									}
								>
									{listingData?.shopTitle}
								</Link>
							</Flex>

							<Text fontSize={18}>{listingData?.subtitle}</Text>

							{layout === Layout.MULTI_COLUMN && renderFullDescription()}
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
										textStyle="ornamental"
									>
										{' '}
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
												daysToDelivery!.min,
												daysToDelivery!.max,
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
					{layout === Layout.SINGLE_COLUMN && renderFullDescription()}
				</SimpleGrid>
			</Box>
		</MotionFlex>
	);
};

const ListingPageButton = (props: ButtonProps) => (
	<Button width="100%" fontWeight="bold" {...props} borderRadius="full" />
);

const LoadingSkeleton = (props: { layout?: Layout; maxWidth: number }) => {
	const renderBasicInfoSection = () => (
		<Stack gap={4}>
			<Skeleton width="80%" height="40px" />
			<Skeleton width="60%" height="35px" />
			<Stack gap={2}>
				<Skeleton width="90%" height="20px" />
				<Skeleton width="95%" height="20px" />
				<Skeleton width="75%" height="20px" />
			</Stack>
		</Stack>
	);

	const renderButtonsAndFulfillmentSection = () => (
		<Stack gap={6}>
			<Skeleton height="100px" />
			<Stack gap={3}>
				<Skeleton width="40%" height="20px" />
				<Skeleton width="60%" height="20px" />
				<Skeleton width="50%" height="20px" />
			</Stack>
		</Stack>
	);

	const renderFullDescriptionSection = () => (
		<Stack gap={6}>
			<Skeleton width="100%" height="50px" />
			<Stack gap={3}>
				<Skeleton width="90%" height="20px" />
				<Skeleton width="95%" height="20px" />
				<Skeleton width="75%" height="20px" />
			</Stack>
			<Skeleton width="100%" height="50px" />
			<Skeleton width="100%" height="50px" />
		</Stack>
	);

	if (props.layout === Layout.SINGLE_COLUMN) {
		return (
			<Stack gap={10}>
				<Skeleton width="100%" aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}></Skeleton>

				<Stack gap={10} mx={5}>
					{renderBasicInfoSection()}
					{renderButtonsAndFulfillmentSection()}
				</Stack>
			</Stack>
		);
	}

	return (
		<SimpleGrid maxW={props.maxWidth} columns={2} gap={10} p={10} mx="auto">
			<GridItem colSpan={2}>
				<SimpleGrid columns={4} gap={3}>
					<GridItem colSpan={2} rowSpan={2}>
						<Skeleton
							aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
							height="100%"
							width="100%"
						></Skeleton>
					</GridItem>
					<GridItem>
						<Skeleton aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}></Skeleton>
					</GridItem>
					<GridItem>
						<Skeleton aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}></Skeleton>
					</GridItem>
					<GridItem>
						<Skeleton aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}></Skeleton>
					</GridItem>
					<GridItem>
						<Skeleton aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}></Skeleton>
					</GridItem>
				</SimpleGrid>
			</GridItem>
			<GridItem>{renderBasicInfoSection()}</GridItem>
			<GridItem>{renderButtonsAndFulfillmentSection()}</GridItem>
		</SimpleGrid>
	);
};
