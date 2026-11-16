import { Stack, StackProps } from '@chakra-ui/react';
import { CheckoutContactForm } from '@client/components/checkout/CheckoutContactForm';
import { CheckoutShippingForm } from '@client/components/checkout/CheckoutShippingForm';
import { Layout } from '@client/constants';

type Props = StackProps & {
	layout?: Layout;
	disabled?: boolean;
};

export const CheckoutDetailsForm = ({
	layout,
	disabled,
	...props
}: Props) => (
	<Stack
		as="form"
		onSubmit={(e) => e.preventDefault()}
		{...props}
	>
		<CheckoutContactForm disabled={disabled} />
		<CheckoutShippingForm
			layout={layout}
			disabled={disabled}
		/>
	</Stack>
);
