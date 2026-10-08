import {
	Box,
	Grid,
	GridItem,
	HStack,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { chakraSpacingUnit, defaultFontFamily } from '@client/theme';
import { useState } from 'react';
import { FaImages } from 'react-icons/fa6';
import { AppImage } from './AppImage';
import { LightBox } from './LightBox';

const COLLAGE_HEIGHT = 550;
const COLLAGE_GAP = 3;
const COLLAGE_GAP_PX = COLLAGE_GAP * chakraSpacingUnit;
const THUMBNAIL_ROWS = 2;
const THUMBNAIL_HEIGHT =
	(COLLAGE_HEIGHT - COLLAGE_GAP_PX * (THUMBNAIL_ROWS - 1)) /
	THUMBNAIL_ROWS;
export const MAX_COLLAGE_WIDTH = COLLAGE_HEIGHT * 2 + COLLAGE_GAP_PX;

type Props = {
	aspectRatio: number;
	urls: string[];
};

export const ImageCollage = (props: Props) => {
	const numThumbnailColumns =
		useBreakpointValue(
			{ base: 1, lg: 2, xl: 3 },
			{ ssr: false },
		) ?? 1;

	const [lightBoxPage, setLightBoxPage] = useState<number | null>(
		null,
	);

	const numThumbnails = Math.min(
		numThumbnailColumns * THUMBNAIL_ROWS,
		props.urls.length - 1,
	);
	const numHiddenImages = props.urls.length - 1 - numThumbnails;

	const renderTile = (index: number) => (
		<Box
			position="relative"
			height="100%"
		>
			<AppImage
				aspectRatio={props.aspectRatio}
				imageProps={{
					src: props.urls[index],
					loading: index === 0 ? undefined : 'lazy',
					onClick: () => setLightBoxPage(index),
					borderRadius: 5,
					cursor: 'button',
					height: '100%',
					aspectRatio: 'auto',
				}}
				containerProps={{
					height: '100%',
					borderRadius: 'md',
				}}
			/>
			{numHiddenImages > 0 && index === numThumbnails && (
				<HStack
					position="absolute"
					inset={0}
					justifyContent="center"
					bg="blackAlpha.600"
					color="white"
					borderRadius="md"
					cursor="button"
					fontFamily={defaultFontFamily}
					fontSize={24}
					onClick={() => setLightBoxPage(index)}
				>
					<FaImages />
					<Text>
						+{numHiddenImages} image
						{numHiddenImages > 1 ? 's' : ''}
					</Text>
				</HStack>
			)}
		</Box>
	);

	return (
		<>
			<LightBox
				{...props}
				page={lightBoxPage}
				setPage={setLightBoxPage}
			/>
			<Grid
				w="fit-content"
				mx="auto"
				gap={COLLAGE_GAP}
				gridAutoFlow="column"
				gridTemplateRows={`repeat(${THUMBNAIL_ROWS}, ${THUMBNAIL_HEIGHT}px)`}
				gridTemplateColumns={`${COLLAGE_HEIGHT * props.aspectRatio}px`}
				gridAutoColumns={`${THUMBNAIL_HEIGHT * props.aspectRatio}px`}
			>
				<GridItem rowSpan={THUMBNAIL_ROWS}>
					{renderTile(0)}
				</GridItem>
				{Array.from(
					{ length: numThumbnails },
					(_, i) => i + 1,
				).map((index) => (
					<GridItem key={props.urls[index]}>
						{renderTile(index)}
					</GridItem>
				))}
			</Grid>
		</>
	);
};
