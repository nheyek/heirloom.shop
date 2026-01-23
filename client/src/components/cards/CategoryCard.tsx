import { Heading } from '@chakra-ui/react';
import { CategoryCardData } from '@common/types/CategoryCardData';
import { useNavigate } from 'react-router-dom';
import { STANDARD_IMAGE_ASPECT_RATIO } from '../../constants';
import { AppImage } from '../misc/AppImage';
import { AppCard } from './AppCard';

export const CategoryCard = (props: CategoryCardData) => {
	const navigate = useNavigate();

	return (
		<AppCard
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
			<Heading
				position="absolute"
				bottom={2}
				left={3}
				paddingBottom={{ base: 0, lg: 2 }}
				paddingLeft={{ base: 0.5, lg: 2 }}
				fontSize={{ base: 24, sm: 26, lg: 30, xl: 34 }}
				fontWeight="700"
				color="#FFF"
				textShadow="0 1px 2px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.35), 0 4px 8px rgba(0, 0, 0, 0.25), 0 8px 16px rgba(0, 0, 0, 0.15);"
			>
				{props.title}
			</Heading>
		</AppCard>
	);
};
