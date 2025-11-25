import { Box, Image, Heading } from '@chakra-ui/react';
import { CategoryCardData } from '@common/types/CategoryCardData';

export const CategoryCard = (props: CategoryCardData) => {
	return (
		<Box borderRadius={5} overflow="hidden" position="relative" cursor="pointer">
			<Image
				aspectRatio={3 / 2}
				src={`https://dev.cdn.heirloom.shop/category-images/${props.imageUuid}.jpg`}
			></Image>
			<Heading
				size="2xl"
				position="absolute"
				bottom="0"
				left="0"
				paddingLeft="15px"
				paddingRight="20px"
				paddingBottom="10px"
				paddingTop="5px"
				borderRadius={'0 25px 25px 0'}
				fontWeight="500"
				style={{
					color: '#FFF',
					backdropFilter: 'blur(3px)',
				}}
			>
				{props.title}
			</Heading>
		</Box>
	);
};
