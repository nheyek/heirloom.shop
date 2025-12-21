import { Box, Text } from '@chakra-ui/react';

type PriceTagProps = {
	value: string;
};

export function PriceTag({ value }: PriceTagProps) {
	const cornerSize = '16px';

	return (
		<Box style={{}}>
			<Box
				position="relative"
				display="flex"
				borderRadius="5px"
				bg="brand"
				color="#FFFFFF"
				width="fit-content"
				paddingLeft="25px"
				paddingRight="7.5px"
				paddingY="2.5px"
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
					//boxShadow: '#6b6b6b 0 -1px 1.5px inset',
				}}
			>
				<Text
					fontSize="16px"
					fontFamily="Alegreya"
					fontWeight="600"
					height="25px"
					paddingRight="2px"
					lineHeight="1.45"
				>
					{value}
				</Text>
			</Box>
		</Box>
	);
}
