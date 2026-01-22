import { Box, Button, Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import { useState } from 'react';
import { FaImages } from 'react-icons/fa';
import { CollageImage } from './CollageImage';
import { LightBox } from './LightBox';

type Props = {
	aspectRatio: number;
	maxHeight: number;
	maxWidth: number;
	urls: string[];
};

export const ImageCollage = (props: Props) => {
	if (props.urls.length === 1) {
		return (
			<Box height={props.maxHeight} aspectRatio={props.aspectRatio}>
				<CollageImage src={props.urls[0]} />
			</Box>
		);
	}

	let numGridCols = useBreakpointValue({ base: 2, lg: 3 }) || 2;

	const numThumbnailTiles = numGridCols * 2 - 2;
	const numSecondaryImages = props.urls.length - 1;
	const numThumbnails = Math.min(numThumbnailTiles, numSecondaryImages);
	const truncateImageList = numThumbnailTiles < numSecondaryImages;

	const [lightBoxPage, setLightBoxPage] = useState<number | null>(null);

	const renderGridImage = (index: number) => (
		<CollageImage
			src={props.urls[index]}
			aspectRatio={props.aspectRatio}
			onClick={() => setLightBoxPage(index)}
		/>
	);

	return (
		<>
			<LightBox {...props} page={lightBoxPage} setPage={setLightBoxPage} />
			<Box position="relative" maxW={props.maxWidth} maxH={props.maxHeight}>
				<Grid
					templateRows="repeat(2, 1fr)"
					templateColumns={`repeat(${numGridCols + 1}, 1fr)`}
					mx="auto"
					gap={3}
				>
					<GridItem rowSpan={2} colSpan={2}>
						{renderGridImage(0)}
					</GridItem>

					{Array.from({ length: numThumbnails }, (_, i) => i + 1).map((index) => (
						<GridItem rowSpan={1} colSpan={1}>
							{renderGridImage(index)}
						</GridItem>
					))}
				</Grid>
				{truncateImageList && (
					<Button
						variant="subtle"
						position="absolute"
						right={3}
						bottom={3}
						fontWeight="bold"
						onClick={() => setLightBoxPage(0)}
					>
						<FaImages />
						{props.urls.length} images
					</Button>
				)}
			</Box>
		</>
	);
};
