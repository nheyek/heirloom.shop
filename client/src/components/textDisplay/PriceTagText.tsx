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
			style={{
				clipPath:
					'polygon(0 50%, 10px 100%, 100% 100%, 100% 0, 10px 0)',
			}}
			_after={{
				content: '""',
				position: 'absolute',
				left: '10px',
				top: '50%',
				transform: 'translateY(-50%)',
				width: '6px',
				height: '6px',
				bg: '#FFFFFF',
				borderRadius: 'full',
			}}
		>
			<Text
				fontSize={20}
				fontWeight={600}
				paddingLeft="24px"
				paddingRight="8px"
				paddingBottom="3px"
				lineHeight={1.4}
				textStyle="ornamental"
			>
				{value}
			</Text>
		</Flex>
	);
}
