import { Image, ImageProps, Skeleton } from '@chakra-ui/react';
import { useState } from 'react';

export const LoadingImage = (props: ImageProps) => {
	const [isLoaded, setIsLoaded] = useState(false);

	return (
		<>
			{!isLoaded && <Skeleton width="100%" height="100%"></Skeleton>}

			<Image
				{...props}
				onLoad={() => setIsLoaded(true)}
				visibility={isLoaded ? 'visible' : 'hidden'}
			/>
		</>
	);
};
