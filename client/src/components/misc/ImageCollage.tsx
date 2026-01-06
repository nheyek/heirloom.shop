import { Grid, GridItem, Image, useBreakpointValue } from '@chakra-ui/react';

type Props = {
	aspectRatio: string;
	urls: string[];
};

export const ImageCollage = (props: Props) => {
	const thumbnailMenuCols = useBreakpointValue({ md: 1, xl: 2 }) || 0;
	const menuGapSize = 10;
	return (
		<Grid
			gap={2}
			aspectRatio="3/1"
			templateRows="repeat(2, 1fr)"
			templateColumns="repeat(4, 1fr)"
			maxH={400}
		>
			<GridItem rowSpan={2} colSpan={2} aspectRatio={props.aspectRatio}>
				<Image src={props.urls[0]} objectFit="cover" />
			</GridItem>
			{props.urls.slice(1).map((url) => (
				<Image
					aspectRatio={props.aspectRatio}
					src={url}
					objectFit="cover"
					borderRadius={5}
				/>
			))}
		</Grid>
	);
};
