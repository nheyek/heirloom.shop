import { Box, Text } from '@chakra-ui/react';

type PriceTagProps = {
	value: string;
};

export function PriceTag({ value }: PriceTagProps) {
	const cornerSize = '16px';

	return (
		<Box style={{ filter: 'drop-shadow(0px 1px 2px #7a7a7a)' }}>
			<Box
				position="relative"
				display="flex"
				borderRadius="5px"
				bg="brand"
				color="#FFFFFF"
				width="fit-content"
				paddingLeft="27.5px"
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
					boxShadow: '#7a7a7a 0 -1px 2px inset',
				}}
			>
				<Text fontSize="14px" fontWeight="semibold">
					{value}
				</Text>
			</Box>
		</Box>
	);
}
