import { Box, Image, Heading, Card, Flex } from '@chakra-ui/react';
import { CategoryCardData } from '@common/types/CategoryCardData';
import { GiGemNecklace } from 'react-icons/gi';
import { BsHandbagFill } from 'react-icons/bs';
export const CategoryCard = (props: CategoryCardData) => {
	return (
		<Card.Root
			variant="elevated"
			borderRadius="5px"
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
		</Card.Root>
	);
};
