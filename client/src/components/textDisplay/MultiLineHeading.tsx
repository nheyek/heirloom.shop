import { Heading, HeadingProps } from '@chakra-ui/react';
import { MULTI_LINE_HEIGHT } from '@client/constants';

export const MultiLineHeading = (props: HeadingProps) => (
	<Heading
		lineHeight={MULTI_LINE_HEIGHT}
		overflow="visible"
		textOverflow="clip"
		whiteSpace="normal"
		{...props}
	/>
);
