import {
	Image,
	ImageProps,
	Skeleton,
	SkeletonProps,
} from '@chakra-ui/react';
import { useState } from 'react';
import { STANDARD_IMAGE_ASPECT_RATIO } from '../../constants';

type Props = {
	containerProps?: SkeletonProps;
	imageProps?: ImageProps;
};

export const AppImage = (props: Props) => {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<Skeleton
			loading={isLoading}
			{...props.containerProps}
			borderRadius={0}
		>
			<Image
				height="100%"
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
