import {
	Center,
	Image,
	ImageProps,
	Skeleton,
	SkeletonProps,
} from '@chakra-ui/react';
import { STANDARD_IMAGE_ASPECT_RATIO } from '@client/constants';
import { useMinDuration } from '@client/hooks/useMinDuration';
import { useState } from 'react';
import { FaRegImage } from 'react-icons/fa6';

enum ImageStatus {
	LOADING,
	LOADED,
	ERROR,
}

type Props = {
	aspectRatio?: number;
	containerProps?: SkeletonProps;
	imageProps?: ImageProps;
};

export const AppImage = ({
	aspectRatio = STANDARD_IMAGE_ASPECT_RATIO,
	...props
}: Props) => {
	const [status, setStatus] = useState(ImageStatus.LOADING);
	// Once an image reports loaded/error, keep showing the skeleton for a
	// short minimum stretch rather than flashing it on/off for images that
	// load near-instantly (e.g. from cache).
	const showSkeleton = useMinDuration(
		status === ImageStatus.LOADING,
	);

	if (status === ImageStatus.ERROR && !showSkeleton) {
		return (
			<Center
				aspectRatio={aspectRatio}
				bg="gray.100"
				color="gray.400"
				{...props.containerProps}
			>
				<FaRegImage size="20%" />
			</Center>
		);
	}

	return (
		<Skeleton
			loading={showSkeleton}
			aspectRatio={aspectRatio}
			borderRadius={0}
			{...props.containerProps}
		>
			<Image
				width="100%"
				objectFit="cover"
				aspectRatio={aspectRatio}
				{...props.imageProps}
				onLoad={(e) => {
					setStatus(ImageStatus.LOADED);
					props.imageProps?.onLoad?.(e);
				}}
				onError={(e) => {
					setStatus(ImageStatus.ERROR);
					props.imageProps?.onError?.(e);
				}}
			/>
		</Skeleton>
	);
};
