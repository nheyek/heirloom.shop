import { Input, InputProps } from '@chakra-ui/react';
import { fieldErrorColor, sansFontFamily } from '@client/theme';

export const CheckoutShippingField = ({
	invalid,
	...rest
}: InputProps & { invalid?: boolean }) => (
	<Input
		variant="subtle"
		fontFamily={sansFontFamily}
		fontSize={16}
		p={3}
		height={12}
		borderRadius={5}
		border={invalid ? `1px solid ${fieldErrorColor}` : undefined}
		{...rest}
	/>
);
