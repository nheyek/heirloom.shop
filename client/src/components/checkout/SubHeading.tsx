import { Span, SpanProps } from '@chakra-ui/react';

export const SubHeading = (props: SpanProps) => (
	<Span
		fontSize={24}
		fontWeight={500}
		{...props}
	/>
);
