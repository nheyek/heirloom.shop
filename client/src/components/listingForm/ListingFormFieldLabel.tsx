import { Text, TextProps } from '@chakra-ui/react';

export const ListingFormFieldLabel = (props: TextProps) => (
	<Text
		fontSize={20}
		fontWeight={500}
		{...props}
	/>
);
