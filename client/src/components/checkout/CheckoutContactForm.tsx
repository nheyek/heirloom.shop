import { Field, Fieldset, Stack } from '@chakra-ui/react';
import { CheckoutHeading } from '@client/components/checkout/CheckoutHeading';
import { CheckoutField } from '@client/components/checkout/CheckoutField';
import { CheckoutFieldError } from '@client/components/checkout/CheckoutFieldError';
import { CHECKOUT_FIELD_GAP } from '@client/components/checkout/checkoutLayout';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';

type Props = {
	disabled?: boolean;
};

export const CheckoutContactForm = (props: Props) => {
	const {
		checkoutEmail,
		checkoutEmailError,
		setCheckoutEmail,
		clearEmailError,
	} = useShoppingCart();

	return (
		<Stack gap={CHECKOUT_FIELD_GAP}>
			<CheckoutHeading>Contact</CheckoutHeading>
			<Fieldset.Root
				size="lg"
				disabled={props.disabled}
			>
				<Field.Root gap={0}>
					<CheckoutField
						placeholder="Email address"
						name="email"
						autoComplete="email"
						type="email"
						value={checkoutEmail}
						onChange={(e) => {
							setCheckoutEmail(e.target.value);
							clearEmailError();
						}}
						invalid={!!checkoutEmailError}
					/>
					<CheckoutFieldError
						errorText={checkoutEmailError}
					/>
				</Field.Root>
			</Fieldset.Root>
		</Stack>
	);
};
