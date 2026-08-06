import {
	Box,
	Button,
	Grid,
	GridItem,
	useBreakpointValue,
} from '@chakra-ui/react';
import { sansFontFamily } from '@client/theme';
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
	numGridCols = Math.min(numGridCols, props.urls.length);

	const numThumbnailTiles = numGridCols * 2 - 2;
	const numSecondaryImages = props.urls.length - 1;

	const numThumbnails = Math.min(
		numThumbnailTiles,
		numSecondaryImages,
	);
	const truncateImageList = numThumbnailTiles < numSecondaryImages;

	const [lightBoxPage, setLightBoxPage] = useState<number | null>(
		null,
	);

	let maxWidth = props.maxWidth;
	if (numGridCols <= 2) {
		maxWidth /= 4 / 3;
	}
	if (numGridCols === 1) {
		maxWidth /= 3 / 2;
	}

	const renderCollageImage = (index: number) => (
		<AppImage
			aspectRatio={props.aspectRatio}
			imageProps={{
				src: props.urls[index],
				onClick: () => setLightBoxPage(index),
				borderRadius: 5,
				cursor: 'button',
			}}
			containerProps={{
				height: '100%',
				width: '100%',
				borderRadius: 'md',
			}}
		/>
	);

	return (
		<>
			<LightBox
				{...props}
				page={lightBoxPage}
				setPage={setLightBoxPage}
			/>
			{props.urls.length === 1 ? (
				<Box
					width="100%"
					maxWidth={maxWidth}
					aspectRatio={props.aspectRatio}
				>
					{renderCollageImage(0)}
				</Box>
			) : (
				<Box
					position="relative"
					width="100%"
					maxW={maxWidth}
				>
					<Grid
						templateRows="repeat(2, 1fr)"
						templateColumns={`repeat(${numGridCols + 1}, 1fr)`}
						mx="auto"
						gap={3}
					>
						<GridItem
							rowSpan={2}
							colSpan={2}
						>
							{renderCollageImage(0)}
						</GridItem>

						{Array.from(
							{ length: numThumbnails },
							(_, i) => i + 1,
						).map((index) => (
							<GridItem
								key={index}
								rowSpan={1}
								colSpan={1}
							>
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
							onClick={() => setLightBoxPage(0)}
							fontFamily={sansFontFamily}
							fontSize={16}
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
