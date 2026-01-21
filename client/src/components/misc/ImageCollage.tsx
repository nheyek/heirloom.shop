import { Box, Button, Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import { useState } from 'react';
import { FaImages } from 'react-icons/fa';
import { LightBox } from './LightBox';
import { LoadingImage } from './LoadingImage';

type Props = {
	aspectRatio: number;
	urls: string[];
};

export const ImageCollage = (props: Props) => {
	let numGridCols = 1;
	if (props.urls.length > 1) {
		numGridCols = useBreakpointValue({ base: 2, lg: 3 }) || 2;
	}

	const numThumbnails = Math.min(numGridCols * 2 - 2, props.urls.length - 1);
	const truncateImageList = props.urls.length > 1 + numThumbnails;

	const [lightBoxPage, setLightBoxPage] = useState<number | null>(null);

	const renderGridImage = (index: number) => (
		<LoadingImage
			src={props.urls[index]}
			aspectRatio={props.aspectRatio}
			height="100%"
			width="100%"
			objectFit="cover"
			borderRadius={5}
			cursor="pointer"
			onClick={() => setLightBoxPage(index)}
		/>
	);

	return (
		<>
			<LightBox {...props} page={lightBoxPage} setPage={setLightBoxPage} />
			<Box position="relative">
				<Grid
					templateRows="repeat(2, 1fr)"
					templateColumns={`repeat(${numGridCols + 1}, 1fr)`}
					maxH={500}
					height="100%"
					mx="auto"
					aspectRatio={
						props.urls.length === 1
							? props.aspectRatio.toString()
							: {
									md: props.aspectRatio * (3 / 2),
									lg:
										props.urls.length > 3
											? props.aspectRatio * 2
											: props.aspectRatio * (3 / 2),
								}
					}
					gap={3}
				>
					<GridItem
						rowSpan={2}
						colSpan={2}
						height="100%"
						width="100%"
						aspectRatio={props.aspectRatio}
					>
						{renderGridImage(0)}
					</GridItem>

					{Array.from({ length: numThumbnails }, (_, i) => i + 1).map((index) => (
						<GridItem
							rowSpan={1}
							colSpan={1}
							height="100%"
							width="100%"
							aspectRatio={props.aspectRatio}
						>
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
