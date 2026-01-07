import { Box, Button, Grid, GridItem, Image, useBreakpointValue } from '@chakra-ui/react';
import { FaImages } from 'react-icons/fa';

type Props = {
	aspectRatio: number;
	urls: string[];
};

export const ImageCollage = (props: Props) => {
	const numGridCols = useBreakpointValue({ base: 2, lg: 3 }) || 2;
	const thumnNailImageUrls = props.urls.slice(1, numGridCols * 2 - 1);
	const imageListTruncated = props.urls.length > 1 + thumnNailImageUrls.length;

	return (
		<Box position="relative">
			<Grid
				aspectRatio={props.aspectRatio * 2}
				templateRows="repeat(2, 1fr)"
				templateColumns={`repeat(${numGridCols + 1}, 1fr)`}
				maxH={500}
				gap={2}
			>
				<GridItem rowSpan={2} colSpan={2} aspectRatio={props.aspectRatio}>
					<Image src={props.urls[0]} objectFit="cover" width="100%" height="100%" />
				</GridItem>
				{thumnNailImageUrls.map((url) => (
					<Image
						aspectRatio={props.aspectRatio}
						src={url}
						objectFit="cover"
						borderRadius={5}
					/>
				))}
			</Grid>
			{imageListTruncated && (
				<Button
					variant="subtle"
					position="absolute"
					right={2.5}
					bottom={2.5}
					fontWeight="bold"
				>
					<FaImages />
					{props.urls.length} images
				</Button>
			)}
		</Box>
	);
};
