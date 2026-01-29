import { Box, Button, Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import { useState } from 'react';
import { FaImages } from 'react-icons/fa';
import { AppImage } from './AppImage';
import { LightBox } from './LightBox';

type Props = {
	aspectRatio: number;
	maxWidth: number;
	urls: string[];
};

export const ImageCollage = (props: Props) => {
	let numGridCols = useBreakpointValue({ base: 2, lg: 3 }) || 2;

	const numThumbnailTiles = numGridCols * 2 - 2;
	const numSecondaryImages = props.urls.length - 1;
	const numThumbnails = Math.min(numThumbnailTiles, numSecondaryImages);
	const truncateImageList = numThumbnailTiles < numSecondaryImages;

	const [lightBoxPage, setLightBoxPage] = useState<number | null>(null);

	const renderCollageImage = (index: number) => (
		<AppImage
			imageProps={{
				src: props.urls[index],
				onClick: () => setLightBoxPage(index),
				borderRadius: 5,
				cursor: 'button',
				aspectRatio: props.aspectRatio,
			}}
			containerProps={{
				height: '100%',
				width: '100%',
			}}
		/>
	);

	/* Proportional maximum height with a single thumbnail column */
	const maxHeight = props.maxWidth * (4 / 9);

	return (
		<>
			<LightBox {...props} page={lightBoxPage} setPage={setLightBoxPage} />
			{props.urls.length === 1 ? (
				<Box height={maxHeight} aspectRatio={props.aspectRatio}>
					{renderCollageImage(0)}
				</Box>
			) : (
				<Box position="relative" maxW={props.maxWidth} maxH={maxHeight}>
					<Grid
						templateRows="repeat(2, 1fr)"
						templateColumns={`repeat(${numGridCols + 1}, 1fr)`}
						mx="auto"
						gap={3}
					>
						<GridItem rowSpan={2} colSpan={2}>
							{renderCollageImage(0)}
						</GridItem>

						{Array.from({ length: numThumbnails }, (_, i) => i + 1).map((index) => (
							<GridItem rowSpan={1} colSpan={1}>
								{renderCollageImage(index)}
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
			)}
		</>
	);
};
