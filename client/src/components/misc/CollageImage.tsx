import { Image, ImageProps, Skeleton } from '@chakra-ui/react';
import { useState } from 'react';

export const CollageImage = (props: ImageProps) => {
	const [loading, setLoading] = useState<boolean>(true);
	return (
		<Skeleton loading={loading} height="100%" width="100%">
			<Image
				src={props.src}
				height="100%"
				width="100%"
				objectFit="cover"
				borderRadius={5}
				cursor="button"
				onClick={props.onClick}
				onLoad={() => setLoading(false)}
				{...props}
			/>
		</Skeleton>
	);
};
