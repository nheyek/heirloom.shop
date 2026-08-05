import { Skeleton, Stack, Wrap } from '@chakra-ui/react';
import { LISTING_IMAGE_ASPECT_RATIO } from '@client/constants';

export const ListingFormSkeleton = () => (
	<Stack gap={5}>
		<Stack
			gap={5}
			maxW={500}
		>
			<Stack gap={2}>
				<Skeleton
					h={8}
					w={200}
				/>
				<Skeleton
					h={12}
					w="100%"
					borderRadius="md"
				/>
			</Stack>

			<Stack gap={2}>
				<Skeleton
					h={8}
					w={200}
				/>
				<Skeleton
					h={24}
					w="100%"
					borderRadius="md"
				/>
			</Stack>

			<Stack gap={2}>
				<Skeleton
					h={8}
					w={200}
				/>
				<Skeleton
					h={12}
					w="100%"
					borderRadius="md"
				/>
			</Stack>
		</Stack>

		<Stack gap={2}>
			<Skeleton
				h={8}
				w={200}
			/>
			<Wrap gap={5}>
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
	</Stack>
);
