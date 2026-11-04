import { Box, Skeleton, SkeletonProps } from '@chakra-ui/react';

type Props = SkeletonProps & {
	aspectRatio: number;
	bodyHeight?: number;
};

export const CardSkeleton = ({
	aspectRatio,
	bodyHeight,
	...rest
}: Props) => (
	<Skeleton
		width="100%"
		{...rest}
	>
		<Box aspectRatio={aspectRatio} />
		{bodyHeight && <Box height={bodyHeight} />}
	</Skeleton>
);
