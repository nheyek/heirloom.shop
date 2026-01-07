import { Box, Button, Grid, GridItem, Image, useBreakpointValue } from '@chakra-ui/react';
import { useState } from 'react';
import { FaImages } from 'react-icons/fa';
import { LightBox } from './LightBox';

type Props = {
	aspectRatio: number;
	urls: string[];
};

export const ImageCollage = (props: Props) => {
	let numGridCols = 1;
	if (props.urls.length > 1) {
		numGridCols = useBreakpointValue({ base: 2, lg: 3 }) || 2;
	}
	const thumnNailImageUrls = props.urls.slice(1, numGridCols * 2 - 1);
	const imageListTruncated = props.urls.length > 1 + thumnNailImageUrls.length;

	const [lightBoxPage, setLightBoxPage] = useState<number | null>(null);

	return (
		<>
			<LightBox {...props} page={lightBoxPage} setPage={setLightBoxPage} />
			<Box position="relative">
				<Grid
					aspectRatio={props.urls.length > 1 ? props.aspectRatio * 2 : props.aspectRatio}
					templateRows="repeat(2, 1fr)"
					templateColumns={`repeat(${numGridCols + 1}, 1fr)`}
					maxH={500}
					gap={3}
				>
					<GridItem
						rowSpan={2}
						colSpan={2}
						aspectRatio={props.aspectRatio}
						width="100%"
						height="100%"
					>
						<GridImage
							src={props.urls[0]}
							aspectRatio={props.aspectRatio}
							onClick={() => setLightBoxPage(0)}
						/>
					</GridItem>
					{thumnNailImageUrls.map((url, index) => (
						<GridImage
							src={url}
							aspectRatio={props.aspectRatio}
							onClick={() => setLightBoxPage(index + 1)}
						/>
					))}
				</Grid>
				{imageListTruncated && (
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

const GridImage = (props: { src: string; aspectRatio: number; onClick: () => void }) => (
	<Image
		{...props}
		width="100%"
		height="100%"
		objectFit="cover"
		borderRadius={5}
		cursor="pointer"
	/>
);
