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
				bottom="5px"
				left="5px"
				paddingLeft="10px"
				paddingRight="10px"
				paddingBottom="2.5px"
				paddingTop="2.5px"
				borderRadius="full"
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
