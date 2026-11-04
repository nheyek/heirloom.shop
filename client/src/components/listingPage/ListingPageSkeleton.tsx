import {
	Box,
	Center,
	Flex,
	Grid,
	GridItem,
	Skeleton,
	Stack,
	useBreakpointValue,
} from '@chakra-ui/react';
import {
	collageGridProps,
	THUMBNAIL_COLUMNS_BY_BREAKPOINT,
	THUMBNAIL_ROWS,
} from '@client/components/imageDisplay/ImageCollage';
import {
	Layout,
	LISTING_COLUMN_GAP_DESKTOP,
	LISTING_COLUMN_GAP_MOBILE,
	LISTING_IMAGE_ASPECT_RATIO,
	LISTING_PAGE_PADDING,
	LISTING_PURCHASE_COLUMN_WIDTH,
	LISTING_VARIATION_GAP,
} from '@client/constants';

const TITLE_SKELETON_HEIGHT = 50;
const SHOP_SKELETON_HEIGHT = 30;
const DETAIL_SKELETON_HEIGHT = 25;
const DESCRIPTION_ROW_SKELETON_HEIGHT = 50;
const ADD_TO_CART_BUTTON_SKELETON_HEIGHT = 50;
const SECONDARY_BUTTONS_SKELETON_HEIGHT = 45;
const FULFILLMENT_LINE_SKELETON_HEIGHT = 30;
const VARIATION_SELECT_SKELETON_HEIGHT = 75;
const VARIATION_SELECT_SKELETON_COUNT = 2;

export const ListingPageSkeleton = (props: {
	layout?: Layout;
	maxWidth: number;
}) => {
	const numThumbnailColumns =
		useBreakpointValue(THUMBNAIL_COLUMNS_BY_BREAKPOINT, {
			ssr: false,
		}) ?? 1;

	const renderBasicInfoSection = () => (
		<Stack gap={2}>
			<Stack gap={2}>
				<Skeleton
					width="80%"
					height={TITLE_SKELETON_HEIGHT}
				/>
				<Skeleton
					width="55%"
					height={SHOP_SKELETON_HEIGHT}
				/>
				<Skeleton
					width="65%"
					height={SHOP_SKELETON_HEIGHT}
				/>
			</Stack>
			<Stack gap={1}>
				<Skeleton
					width="90%"
					height={DETAIL_SKELETON_HEIGHT}
				/>
				<Skeleton
					width="95%"
					height={DETAIL_SKELETON_HEIGHT}
				/>
				<Skeleton
					width="75%"
					height={DETAIL_SKELETON_HEIGHT}
				/>
			</Stack>
		</Stack>
	);

	const renderDescriptionSection = () => (
		<Stack gap={1}>
			{Array.from({ length: 4 }, (_, i) => (
				<Skeleton
					key={i}
					height={DESCRIPTION_ROW_SKELETON_HEIGHT}
				/>
			))}
		</Stack>
	);

	const renderButtonsAndFulfillmentSection = () => (
		<Stack gap={5}>
			<Stack gap={LISTING_VARIATION_GAP}>
				{Array.from(
					{ length: VARIATION_SELECT_SKELETON_COUNT },
					(_, i) => (
						<Skeleton
							key={i}
							height={VARIATION_SELECT_SKELETON_HEIGHT}
						/>
					),
				)}
			</Stack>
			<Skeleton height={ADD_TO_CART_BUTTON_SKELETON_HEIGHT} />
			<Skeleton height={SECONDARY_BUTTONS_SKELETON_HEIGHT} />
			<Stack gap={1}>
				<Skeleton
					width="40%"
					height={FULFILLMENT_LINE_SKELETON_HEIGHT}
				/>
				<Skeleton
					width="60%"
					height={FULFILLMENT_LINE_SKELETON_HEIGHT}
				/>
				<Skeleton
					width="50%"
					height={FULFILLMENT_LINE_SKELETON_HEIGHT}
				/>
			</Stack>
		</Stack>
	);

	if (props.layout === Layout.MOBILE) {
		return (
			<Stack gap={0}>
				<Skeleton
					width="100%"
					aspectRatio={LISTING_IMAGE_ASPECT_RATIO}
				></Skeleton>

				<Stack
					gap={LISTING_COLUMN_GAP_MOBILE}
					p={LISTING_PAGE_PADDING}
				>
					{renderBasicInfoSection()}
					{renderButtonsAndFulfillmentSection()}
					{renderDescriptionSection()}
				</Stack>
			</Stack>
		);
	}

	return (
		<Flex
			flexDir="column"
			alignItems="center"
			mx="auto"
		>
			<Box
				px={LISTING_PAGE_PADDING}
				my={LISTING_PAGE_PADDING}
				width="100%"
			>
				<Grid
					{...collageGridProps(
						LISTING_IMAGE_ASPECT_RATIO,
						numThumbnailColumns,
					)}
				>
					<GridItem rowSpan={THUMBNAIL_ROWS}>
						<Skeleton height="100%" />
					</GridItem>
					{Array.from(
						{
							length:
								numThumbnailColumns * THUMBNAIL_ROWS,
						},
						(_, i) => i,
					).map((i) => (
						<GridItem key={i}>
							<Skeleton height="100%" />
						</GridItem>
					))}
				</Grid>
			</Box>
			<Center
				width="100%"
				p={LISTING_PAGE_PADDING}
			>
				<Flex
					direction={{ base: 'column', md: 'row' }}
					gap={LISTING_COLUMN_GAP_DESKTOP}
					width="100%"
					maxW={props.maxWidth}
				>
					<Box
						flex="1"
						minW={0}
					>
						<Stack gap={2}>
							{renderBasicInfoSection()}
							{renderDescriptionSection()}
						</Stack>
					</Box>
					<Box
						flexShrink={0}
						width={{
							base: '100%',
							md: LISTING_PURCHASE_COLUMN_WIDTH,
						}}
					>
						{renderButtonsAndFulfillmentSection()}
					</Box>
				</Flex>
			</Center>
		</Flex>
	);
};
