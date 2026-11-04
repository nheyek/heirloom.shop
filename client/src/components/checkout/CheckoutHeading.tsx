import { Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type Props = {
	Icon?: IconType;
	children: string;
};

export const CheckoutHeading = (props: Props) => (
	<Text
		fontSize={22}
		fontWeight={500}
	>
		{props.children}
	</Text>
);
