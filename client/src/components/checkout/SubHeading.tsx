import { Span, SpanProps } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type Props = {
	icon?: IconType;
	children: string;
} & SpanProps;

export const SubHeading = (props: Props) => (
	<Span
		fontSize={24}
		fontWeight={500}
		{...props}
	>
		{props.children}
	</Span>
);
