import { Image, ImageProps, Skeleton } from '@chakra-ui/react';
import { useState } from 'react';

export const LoadingImage = (props: ImageProps) => {
	const [isLoaded, setIsLoaded] = useState(false);

	return (
		<>
			{!isLoaded && (
				<Skeleton
					height="100%"
					width="100%"
					aspectRatio={props.aspectRatio}
					objectFit="cover"
				></Skeleton>
			)}

			<Image
				{...props}
				onLoad={() => {
					setIsLoaded(true);
				}}
				visibility={isLoaded ? 'visible' : 'hidden'}
			/>
		</>
	);
};
