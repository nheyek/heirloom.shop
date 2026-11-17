import { Heading, HeadingProps } from '@chakra-ui/react';

export const MultiLineHeading = (props: HeadingProps) => (
	<Heading
		overflow="visible"
		textOverflow="clip"
		whiteSpace="normal"
		{...props}
	/>
);
