import { Heading } from '@chakra-ui/react';
import { CategoryCardData } from '@common/types/CategoryCardData';
import { useNavigate } from 'react-router-dom';
import { LoadingImage } from '../misc/LoadingImage';
import { AppCard } from './AppCard';

export const CategoryCard = (props: CategoryCardData) => {
	const navigate = useNavigate();

	return (
		<AppCard
			onClick={() => navigate(`/category/${props.id.toLowerCase()}`)}
			position="relative"
			cursor="pointer"
			aspectRatio={3 / 2}
			width="100%"
		>
			<LoadingImage
				height="100%"
				width="100%"
				objectFit="cover"
				src={`https://dev.cdn.heirloom.shop/category-images/${props.imageUuid}.jpg`}
			></LoadingImage>
			<Heading
				position="absolute"
				bottom="10px"
				left="15px"
				padding={0}
				lineHeight={1}
				fontSize="24px"
				fontWeight="600"
				textShadow="0 1px 2px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1);"
				style={{
					color: '#FFF',
					backdropFilter: 'blur(2px)',
				}}
			>
				{props.title}
			</Heading>
		</AppCard>
	);
};
