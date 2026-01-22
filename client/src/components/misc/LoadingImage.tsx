import { Image, ImageProps, Skeleton } from '@chakra-ui/react';
import { useState } from 'react';
import { STANDARD_IMAGE_ASPECT_RATIO } from '../../constants';

export const LoadingImage = (props: ImageProps) => {
	const [isLoaded, setIsLoaded] = useState(false);

	const basicProps = {
		height: '100%',
		width: '100%',
		objectFit: 'cover',
		aspectRatio: STANDARD_IMAGE_ASPECT_RATIO,
	};

	return (
		<>
			{!isLoaded && <Skeleton {...basicProps}></Skeleton>}

			<Image
				{...basicProps}
				{...props}
				onLoad={() => {
					setIsLoaded(true);
				}}
				visibility={isLoaded ? 'visible' : 'hidden'}
			/>
		</>
	);
};
