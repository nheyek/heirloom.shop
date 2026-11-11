import { Span, SpanProps } from '@chakra-ui/react';

const SINGLE_LINE_HEIGHT = 1.1;

export const SingleLineText = (props: SpanProps) => (
	<Span
		lineHeight={SINGLE_LINE_HEIGHT}
		{...props}
	/>
);
