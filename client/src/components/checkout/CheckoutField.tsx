import {
	FIELD_ERROR_COLOR,
	SANS_FONT_FAMILY,
} from '@client/constants';
import { Input, InputProps } from '@chakra-ui/react';
import { CHECKOUT_FIELD_HEIGHT } from '@client/components/checkout/checkoutLayout';

export const CheckoutField = ({
	invalid,
	...rest
}: InputProps & { invalid?: boolean }) => (
	<Input
		variant="subtle"
		fontFamily={SANS_FONT_FAMILY}
		fontSize={16}
		p={3}
		height={CHECKOUT_FIELD_HEIGHT}
		borderRadius={5}
		border={
			invalid ? `1px solid ${FIELD_ERROR_COLOR}` : undefined
		}
		{...rest}
	/>
);
