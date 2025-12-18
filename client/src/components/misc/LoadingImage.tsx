import { Image, ImageProps, Skeleton } from '@chakra-ui/react';
import React from 'react';

export const LoadingImage = (props: ImageProps) => {
	const [isLoaded, setIsLoaded] = React.useState(false);

	return (
		<Skeleton loading={!isLoaded} height="100%" width="100%">
			<Image onLoad={() => setIsLoaded(true)} {...props} />;
		</Skeleton>
	);
};
