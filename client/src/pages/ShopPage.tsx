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
} from '@chakra-ui/react';
import { ListingGrid } from '@client/components/collections/ListingGrid';
import { AppError } from '@client/components/feedback/AppError';
import { CountryFlagIcon } from '@client/components/icons/CountryFlagIcon';
import { AppImage } from '@client/components/imageDisplay/AppImage';
import { RichTextDisplay } from '@client/components/richText/RichTextDisplay';
import { CountryCode, STANDARD_GRID_GAP } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { FONT_DECORATIVE } from '@client/theme';
import { callApi } from '@client/utils/apiUtils';
import {
	ListingCardData,
	ShopCardData,
} from '@heirloom/common/contract';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { FaHeart, FaInfoCircle } from 'react-icons/fa';
import { IoChatbox } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';
import { useParams } from 'react-router-dom';

const titleFontSize = {
	base: 44,
	md: 54,
	lg: 64,
};

export const ShopPage = () => {
	const { id } = useParams<{ id: string }>();
	const [aboutOpen, setAboutOpen] = useState(false);

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

		loadShopData();
		loadListings();
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
							position="absolute"
							bottom={[3, 5, 7]}
							left={[4, 6, 8, 10]}
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
								<Text
									display="block"
									fontSize={Object.entries(
										titleFontSize,
									).reduce(
										(acc, [key, value]) => ({
											...acc,
											[key]: (value * 2) / 3,
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
										fontWeight={500}
										fontSize={Object.entries(
											titleFontSize,
										).reduce(
											(acc, [key, value]) => ({
												...acc,
												[key]: value / 2,
											}),
											{},
										)}
									>
										{shopData?.location}
									</Text>
								</Box>
							</Stack>

							<HStack gap={2}>
								{shopData?.profileRichText && (
									<ActionButton
										icon={FaInfoCircle}
										label="About"
										onClick={() =>
											setAboutOpen(true)
										}
									/>
								)}
								<ActionButton
									icon={FaHeart}
									label="Favorite"
								/>
								<ActionButton
									icon={IoChatbox}
									label="Message"
								/>
							</HStack>
						</Stack>
					</Box>
				</motion.div>
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
								<Dialog.Title>
									About {shopData?.title}
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
	onClick?: () => void;
}) => (
	<Button
		size={{ base: 'md', md: 'lg' }}
		variant="subtle"
		fontSize={{ base: 18, md: 20 }}
		onClick={props.onClick}
	>
		<props.icon />
		{props.label}
	</Button>
);
