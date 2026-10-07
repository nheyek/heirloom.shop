import { Button, ButtonProps, Icon } from '@chakra-ui/react';
import { PaymentRequest } from '@stripe/stripe-js';
import { FaApplePay } from 'react-icons/fa6';

type Props = {
	paymentRequest: PaymentRequest;
	disabled: boolean;
	loading: boolean;
} & ButtonProps;

export const ApplePayButton = ({
	paymentRequest,
	disabled,
	loading,
}: Props) => (
	<Button
		variant="outline"
		onClick={() => paymentRequest.show()}
		disabled={disabled}
		loading={loading}
	>
		<Icon
			w={16}
			h={16}
		>
			<FaApplePay />
		</Icon>
	</Button>
);
