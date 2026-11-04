import { Input, InputProps } from '@chakra-ui/react';
import { CHECKOUT_FIELD_HEIGHT } from '@client/components/checkout/checkoutLayout';
import { fieldErrorColor, sansFontFamily } from '@client/theme';

export const CheckoutField = ({
	invalid,
	...rest
}: InputProps & { invalid?: boolean }) => (
	<Input
		variant="subtle"
		fontFamily={sansFontFamily}
		fontSize={16}
		p={3}
		height={CHECKOUT_FIELD_HEIGHT}
		borderRadius={5}
		border={invalid ? `1px solid ${fieldErrorColor}` : undefined}
		{...rest}
	/>
);
