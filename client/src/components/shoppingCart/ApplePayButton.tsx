import { Button, Icon } from '@chakra-ui/react';
import { PaymentRequest } from '@stripe/stripe-js';
import { FaApplePay } from 'react-icons/fa6';

type Props = {
	paymentRequest: PaymentRequest;
	disabled: boolean;
	loading: boolean;
};

export const ApplePayButton = ({
	paymentRequest,
	disabled,
	loading,
}: Props) => (
	<Button
		h="100%"
		variant="outline"
		flex={1}
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
