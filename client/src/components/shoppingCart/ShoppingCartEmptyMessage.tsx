import { Button, Center, Text } from '@chakra-ui/react';
import { displayFontFamily } from '@client/theme';
import { FaArrowLeft } from 'react-icons/fa6';

type Props = {
	onClick?: () => void;
};
export const ShoppingCartEmptyMessage = (props: Props) => (
	<Center
		flexDir="column"
		height="100%"
		gap={3}
		fontFamily={displayFontFamily}
	>
		<Text fontSize={36}>Your cart is empty</Text>
		<Button
			onClick={props.onClick}
			size="md"
			fontSize={18}
		>
			<FaArrowLeft />
			Keep Looking
		</Button>
	</Center>
);
