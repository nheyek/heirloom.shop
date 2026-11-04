import { Field, Fieldset, Stack } from '@chakra-ui/react';
import { CheckoutHeading } from '@client/components/checkout/CheckoutHeading';
import { CheckoutField } from '@client/components/checkout/CheckoutField';
import { CheckoutFieldError } from '@client/components/checkout/CheckoutFieldError';
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
		<Stack gap={3}>
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
