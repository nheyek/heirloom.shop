import { Box, Image, Heading } from '@chakra-ui/react';
import { CategoryCardData } from '@common/types/CategoryCardData';

export const CategoryCard = (props: CategoryCardData) => {
	return (
		<Box
			borderRadius="5px"
			overflow="hidden"
			position="relative"
			cursor="pointer"
			aspectRatio={3 / 2}
			width="100%"
			style={{
				boxShadow: 'rgba(0, 0, 0, 0.25) 0px 1px 3px, rgba(0, 0, 0, 0.125) 0px 1px 2px',
			}}
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
				paddingRight="10px"
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
		</Box>
	);
};
