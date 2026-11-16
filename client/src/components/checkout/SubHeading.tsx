import { Span } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type Props = {
	Icon?: IconType;
	children: string;
};

export const SubHeading = (props: Props) => (
	<Span
		fontSize={24}
		fontWeight={500}
	>
		{props.children}
	</Span>
);
