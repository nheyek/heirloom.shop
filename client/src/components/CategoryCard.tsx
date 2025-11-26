import { Box, Image, Heading } from '@chakra-ui/react';
import { CategoryCardData } from '@common/types/CategoryCardData';

export const CategoryCard = (props: CategoryCardData) => {
	return (
		<Box
			borderRadius={5}
			overflow="hidden"
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
				paddingRight="15px"
				paddingBottom="7.5px"
				paddingTop="5px"
				borderRadius={'0 15px 15px 0'}
				fontSize="22px"
				fontWeight="500"
				style={{
					color: '#FFF',
					backdropFilter: 'blur(2.5px)',
				}}
			>
				{props.title}
			</Heading>
		</Box>
	);
};
