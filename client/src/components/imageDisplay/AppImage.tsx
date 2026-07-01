import {
	Image,
	ImageProps,
	Skeleton,
	SkeletonProps,
} from '@chakra-ui/react';
import { STANDARD_IMAGE_ASPECT_RATIO } from '@client/constants';
import { useState } from 'react';

type Props = {
	containerProps?: SkeletonProps;
	imageProps?: ImageProps;
};

export const AppImage = (props: Props) => {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<Skeleton
			loading={isLoading}
			aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
			borderRadius={0}
			{...props.containerProps}
		>
			<Image
				width="100%"
				objectFit="cover"
				aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
				onLoad={() => {
					setIsLoading(false);
				}}
				{...props.imageProps}
			/>
		</Skeleton>
	);
};
