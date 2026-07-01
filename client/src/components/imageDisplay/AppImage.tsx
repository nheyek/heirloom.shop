import {
	Image,
	ImageProps,
	Skeleton,
	SkeletonProps,
} from '@chakra-ui/react';
import { STANDARD_IMAGE_ASPECT_RATIO } from '@client/constants';
import { useState } from 'react';

type Props = {
	aspectRatio?: number;
	containerProps?: SkeletonProps;
	imageProps?: ImageProps;
};

export const AppImage = ({
	aspectRatio = STANDARD_IMAGE_ASPECT_RATIO,
	...props
}: Props) => {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<Skeleton
			loading={isLoading}
			aspectRatio={aspectRatio}
			borderRadius={0}
			{...props.containerProps}
		>
			<Image
				width="100%"
				objectFit="cover"
				aspectRatio={aspectRatio}
				onLoad={() => {
					setIsLoading(false);
				}}
				{...props.imageProps}
			/>
		</Skeleton>
	);
};
