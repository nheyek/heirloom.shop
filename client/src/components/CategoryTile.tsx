import { Flex, Heading } from '@chakra-ui/react';
import { CategoryCardData as CategoryTileData } from '@common/types/CategoryTileData';
import { useNavigate } from 'react-router-dom';
import { STANDARD_IMAGE_ASPECT_RATIO } from '../constants';
import { AppImage } from './misc/AppImage';

export const CategoryTile = (props: CategoryTileData) => {
	const navigate = useNavigate();

	return (
		<Flex
			onClick={() => navigate(`/category/${props.id.toLowerCase()}`)}
			position="relative"
			cursor="pointer"
			aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
			width="100%"
		>
			<AppImage
				imageProps={{
					src: `https://dev.cdn.heirloom.shop/category-images/${props.imageUuid}.jpg`,
				}}
			></AppImage>
			<Flex
				position="absolute"
				width="100%"
				height="100%"
				justifyContent="center"
				alignItems="end"
			>
				<Heading
					fontSize={{ base: 28, sm: 32, lg: 36, xl: 42 }}
					paddingBottom={{ base: 3, md: 4, lg: 5 }}
					fontWeight="600"
					color="#FFF"
					textShadow="0 1px 2px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.4), 0 4px 8px rgba(0, 0, 0, 0.3), 0 8px 16px rgba(0, 0, 0, 0.2);"
				>
					{props.title}
				</Heading>
			</Flex>
		</Flex>
	);
};
