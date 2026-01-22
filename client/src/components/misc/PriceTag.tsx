import { Flex, Text } from '@chakra-ui/react';

type PriceTagProps = {
	value: string;
};

export function PriceTag({ value }: PriceTagProps) {
	return (
		<Flex
			position="relative"
			borderRadius={5}
			bg="brand"
			color="#FFFFFF"
			padding={1}
			paddingLeft={6}
			style={{
				clipPath: 'polygon(0 50%, 10px 100%, 100% 100%, 100% 0, 10px 0)',
			}}
			_after={{
				content: '""',
				position: 'absolute',
				left: '10px',
				top: '50%',
				transform: 'translateY(-50%)',
				width: '7px',
				height: '7px',
				bg: '#FFFFFF',
				borderRadius: 'full',
			}}
		>
			<Text
				fontSize={20}
				fontFamily="Alegreya"
				fontWeight={600}
				paddingLeft={0.5}
				paddingRight={1.5}
				paddingBottom={0.5}
				lineHeight={1.1}
			>
				{value}
			</Text>
		</Flex>
	);
}
