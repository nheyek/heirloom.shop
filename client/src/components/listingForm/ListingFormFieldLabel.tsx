import { Text, TextProps } from '@chakra-ui/react';

export const ListingFormFieldLabel = (props: TextProps) => (
	<Text
		fontSize={18}
		fontWeight={500}
		{...props}
	/>
);
