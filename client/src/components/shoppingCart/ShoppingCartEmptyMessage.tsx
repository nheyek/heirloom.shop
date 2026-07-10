import { Button, Center, Text } from '@chakra-ui/react';
import { FONT_DISPLAY_SANS } from '@client/theme';
import { FaArrowTurnDown } from 'react-icons/fa6';

type Props = {
	onClick?: () => void;
};
export const ShoppingCartEmptyMessage = (props: Props) => (
	<Center
		flexDir="column"
		height="100%"
		gap={3}
		fontFamily={FONT_DISPLAY_SANS}
	>
		<Text
			fontSize={36}
			fontWeight={300}
		>
			Your cart is empty
		</Text>
		<Button
			onClick={props.onClick}
			size="md"
			fontSize={18}
		>
			<FaArrowTurnDown transform="rotate(90)" />
			Keep Looking
		</Button>
	</Center>
);
