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
				bottom="0"
				left="0"
				paddingLeft="12.5px"
				paddingRight="10px"
				paddingBottom="5px"
				paddingTop="2.5px"
				borderRadius="0 5px 0 0"
				fontSize="20px"
				fontWeight="500"
				style={{
					color: '#FFF',
					backdropFilter: 'blur(5px)',
				}}
			>
				{props.title}
			</Heading>
		</AppCard>
	);
};
