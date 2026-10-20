import { Skeleton, Stack, Wrap } from '@chakra-ui/react';
import {
	FORM_FIELD_GAP,
	LISTING_IMAGE_ASPECT_RATIO,
} from '@client/constants';

const SkeletonField = ({
	inputHeight,
	inputWidth = '100%',
}: {
	inputHeight: number;
	inputWidth?: number | string;
}) => (
	<Stack gap={2}>
		<Skeleton
			h={8}
			w={200}
		/>
		<Skeleton
			h={inputHeight}
			w={inputWidth}
			borderRadius="md"
		/>
	</Stack>
);

export const ListingFormSkeleton = () => (
	<Stack gap={FORM_FIELD_GAP}>
		<Stack
			gap={FORM_FIELD_GAP}
			maxW={500}
		>
			<SkeletonField inputHeight={12} />
			<SkeletonField inputHeight={24} />
			<SkeletonField inputHeight={12} />
			<SkeletonField
				inputHeight={12}
				inputWidth={100}
			/>
		</Stack>

		<SkeletonField
			inputHeight={12}
			inputWidth={150}
		/>

		<SkeletonField
			inputHeight={12}
			inputWidth={135}
		/>

		<Stack gap={2}>
			<Skeleton
				h={8}
				w={200}
			/>
			<Wrap gap={FORM_FIELD_GAP}>
				<Skeleton
					w={225}
					aspectRatio={LISTING_IMAGE_ASPECT_RATIO}
					borderRadius="md"
				/>
				<Skeleton
					w={225}
					aspectRatio={LISTING_IMAGE_ASPECT_RATIO}
					borderRadius="md"
				/>
				<Skeleton
					w={225}
					aspectRatio={LISTING_IMAGE_ASPECT_RATIO}
					borderRadius="md"
				/>
			</Wrap>
		</Stack>

		<Skeleton
			h={6}
			w={180}
		/>

		<SkeletonField
			inputHeight={12}
			inputWidth={250}
		/>
	</Stack>
);
