import { Flex, Text } from '@chakra-ui/react';
import { FONT_DECORATIVE } from '../../theme';

type Props = {
	value: number;
	quantity?: number;
};

export const PriceTag = (props: Props) => (
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
			fontWeight={500}
			fontFamily={FONT_DECORATIVE}
			paddingLeft={6}
			paddingRight={2.5}
			paddingBottom="3px"
		>
			${props.value.toLocaleString()}.00
			{props.quantity &&
				props.quantity > 1 &&
				`(${props.quantity})`}
		</Text>
	</Flex>
);
