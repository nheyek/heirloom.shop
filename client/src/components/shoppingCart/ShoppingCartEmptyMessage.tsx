import { Button, Center, Text } from '@chakra-ui/react';
import { TbArrowBack } from 'react-icons/tb';

type Props = {
	onClick?: () => void;
};
export const ShoppingCartEmptyMessage = (props: Props) => (
	<Center
		flexDir="column"
		height="100%"
		gap={5}
	>
		<Text
			fontSize={30}
			fontWeight={300}
		>
			Your cart is empty
		</Text>
		<Button
			onClick={props.onClick}
			size="md"
			fontSize={18}
		>
			<TbArrowBack />
			Keep looking
		</Button>
	</Center>
);
