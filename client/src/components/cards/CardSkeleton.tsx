import { Box, Skeleton, SkeletonProps } from '@chakra-ui/react';
import { CARD_WIDTH } from '@client/constants';

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
		width={CARD_WIDTH}
		{...rest}
	>
		<Box aspectRatio={aspectRatio} />
		{bodyHeight && <Box height={bodyHeight} />}
	</Skeleton>
);
