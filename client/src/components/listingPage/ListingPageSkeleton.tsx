import {
	GridItem,
	SimpleGrid,
	Skeleton,
	Stack,
} from '@chakra-ui/react';
import {
	Layout,
	LISTING_IMAGE_ASPECT_RATIO,
} from '@client/constants';

export const ListingPageSkeleton = (props: {
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
		<SimpleGrid
			maxW={props.maxWidth}
			columns={2}
			gap={10}
			my={5}
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
							aspectRatio={LISTING_IMAGE_ASPECT_RATIO}
							height="100%"
							width="100%"
						></Skeleton>
					</GridItem>
					<GridItem>
						<Skeleton
							aspectRatio={LISTING_IMAGE_ASPECT_RATIO}
						></Skeleton>
					</GridItem>
					<GridItem>
						<Skeleton
							aspectRatio={LISTING_IMAGE_ASPECT_RATIO}
						></Skeleton>
					</GridItem>
					<GridItem>
						<Skeleton
							aspectRatio={LISTING_IMAGE_ASPECT_RATIO}
						></Skeleton>
					</GridItem>
					<GridItem>
						<Skeleton
							aspectRatio={LISTING_IMAGE_ASPECT_RATIO}
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
