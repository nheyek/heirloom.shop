import { Button, ButtonProps, Icon } from '@chakra-ui/react';
import { PaymentRequest } from '@stripe/stripe-js';
import { FaApplePay } from 'react-icons/fa6';

type Props = {
	paymentRequest: PaymentRequest;
} & ButtonProps;

export const ApplePayButton = (props: Props) => (
	<Button
		variant="outline"
		onClick={() => props.paymentRequest.show()}
		{...props}
	>
		<Icon
			w={16}
			h={16}
		>
			<FaApplePay />
		</Icon>
	</Button>
);
