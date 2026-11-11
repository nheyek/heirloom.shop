import { Span, SpanProps } from '@chakra-ui/react';
import { SINGLE_LINE_HEIGHT } from '@client/constants';

export const SingleLineText = (props: SpanProps) => (
	<Span
		lineHeight={SINGLE_LINE_HEIGHT}
		{...props}
	/>
);
