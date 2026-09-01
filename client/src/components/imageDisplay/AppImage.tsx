import {
	Center,
	Image,
	ImageProps,
	Skeleton,
	SkeletonProps,
} from '@chakra-ui/react';
import { STANDARD_IMAGE_ASPECT_RATIO } from '@client/constants';
import { useMinDuration } from '@client/hooks/useMinDuration';
import { useEffect, useState } from 'react';
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
	fallbackSrc?: string;
};

export const AppImage = ({
	aspectRatio = STANDARD_IMAGE_ASPECT_RATIO,
	fallbackSrc,
	...props
}: Props) => {
	const [status, setStatus] = useState(ImageStatus.LOADING);
	const [url, setUrl] = useState(props.imageProps?.src);
	const showSkeleton = useMinDuration(
		status === ImageStatus.LOADING,
	);

	useEffect(() => {
		setUrl(props.imageProps?.src);
	}, [props.imageProps?.src]);

	if (status === ImageStatus.ERROR && !showSkeleton) {
		return (
			<Center
				aspectRatio={aspectRatio}
				bg="gray.100"
				color="fg.muted"
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
				src={url}
				onLoad={(e) => {
					setStatus(ImageStatus.LOADED);
					props.imageProps?.onLoad?.(e);
				}}
				onError={(e) => {
					if (fallbackSrc) {
						setUrl(fallbackSrc);
						return;
					}
					setStatus(ImageStatus.ERROR);
					props.imageProps?.onError?.(e);
				}}
			/>
		</Skeleton>
	);
};
