import { Flex, Text } from '@chakra-ui/react';
import { displayFontFamily } from '@client/theme';
import { formatCentsAsDollars } from '@heirloom/common/utils/priceDisplay';

type Props = {
	priceCents: number;
	quantity?: number;
	isMinimum?: boolean;
};

export const PriceTag = (props: Props) => {
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
				fontWeight={500}
				fontFamily={displayFontFamily}
				paddingLeft={6}
				paddingRight="10px"
				paddingTop="3px"
				paddingBottom="5px"
			>
				{formatCentsAsDollars(props.priceCents)}
				{props.isMinimum && '+'}
				{props.quantity &&
					props.quantity > 1 &&
					`(${props.quantity})`}
			</Text>
		</Flex>
	);
};
