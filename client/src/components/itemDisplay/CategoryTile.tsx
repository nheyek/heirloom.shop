import { Box, Flex, Heading } from '@chakra-ui/react';
import { CategoryTileData } from '@common/types/CategoryTileData';
import { Link } from 'react-router-dom';
import {
	CLIENT_ROUTES,
	STANDARD_IMAGE_ASPECT_RATIO,
} from '../../constants';
import { AppImage } from '../imageDisplay/AppImage';

export const CategoryTile = (props: CategoryTileData) => {
	return (
		<Link
			to={`/${CLIENT_ROUTES.category}/${props.id.toLowerCase()}`}
		>
			<Box
				position="relative"
				cursor="pointer"
				width="100%"
				aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
				textDecoration="none"
			>
				<AppImage
					imageProps={{
						src: `https://dev.cdn.heirloom.shop/category-images/${props.imageUuid}.jpg`,
					}}
				></AppImage>
				<Flex
					position="absolute"
					top={0}
					width="100%"
					height="100%"
					justifyContent="center"
					alignItems="end"
				>
					<Heading
						fontSize={{
							base: 28,
							sm: 32,
							lg: 36,
							xl: 42,
						}}
						paddingBottom={{
							base: 3,
							md: 4,
							lg: 5,
						}}
						fontWeight="600"
						color="#FFF"
						textShadow="0 1px 2px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.4), 0 4px 8px rgba(0, 0, 0, 0.3), 0 8px 16px rgba(0, 0, 0, 0.2);"
					>
						{props.title}
					</Heading>
				</Flex>
			</Box>
		</Link>
	);
};
