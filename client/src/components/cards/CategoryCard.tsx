import { Heading, Image } from '@chakra-ui/react';
import { CategoryCardData } from '@common/types/CategoryCardData';
import { useNavigate } from 'react-router-dom';
import { HeirloomCard } from '../cards/HeirloomCard';

export const CategoryCard = (props: CategoryCardData) => {
	const navigate = useNavigate();

	return (
		<HeirloomCard
			onClick={() => navigate(`/category/${props.id.toLowerCase()}`)}
			position="relative"
			cursor="pointer"
			aspectRatio={3 / 2}
			width="100%"
		>
			<Image
				height="100%"
				width="100%"
				objectFit="cover"
				src={`https://dev.cdn.heirloom.shop/category-images/${props.imageUuid}.jpg`}
			></Image>
			<Heading
				position="absolute"
				bottom="0"
				left="0"
				paddingLeft="15px"
				paddingRight="12.5px"
				paddingBottom="7.5px"
				paddingTop="2.5px"
				borderRadius="0 5px 0 0"
				fontSize="22px"
				fontWeight="500"
				style={{
					color: '#FFF',
					backdropFilter: 'blur(5px)',
				}}
			>
				{props.title}
			</Heading>
		</HeirloomCard>
	);
};
