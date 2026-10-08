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
	LISTING_IMAGE_ASPECT_RATIO,
} from '@client/constants';

export const ListingPageSkeleton = (props: {
	layout?: Layout;
	maxWidth: number;
}) => {
	const numThumbnailColumns =
		useBreakpointValue(THUMBNAIL_COLUMNS_BY_BREAKPOINT, {
			ssr: false,
		}) ?? 1;

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

	if (props.layout === Layout.MOBILE) {
		return (
			<Stack gap={10}>
				<Skeleton
					width="100%"
					aspectRatio={LISTING_IMAGE_ASPECT_RATIO}
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
		<Flex
			flexDir="column"
			alignItems="center"
			mx="auto"
		>
			<Box
				px={5}
				mt={5}
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
				p={5}
			>
				<Flex
					direction={{ base: 'column', md: 'row' }}
					gap={10}
					width="100%"
					maxW={props.maxWidth}
				>
					<Box
						flex="1"
						minW={0}
					>
						{renderBasicInfoSection()}
					</Box>
					<Box
						flexShrink={0}
						width={{ base: '100%', md: 375 }}
					>
						{renderButtonsAndFulfillmentSection()}
					</Box>
				</Flex>
			</Center>
		</Flex>
	);
};
