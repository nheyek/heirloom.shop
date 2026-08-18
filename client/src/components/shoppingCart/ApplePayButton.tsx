import { Button, Icon } from '@chakra-ui/react';
import { PaymentRequest } from '@stripe/stripe-js';
import { FaApplePay } from 'react-icons/fa6';

type Props = {
	paymentRequest: PaymentRequest;
	pending: boolean;
};

export const ApplePayButton = ({
	paymentRequest,
	pending,
}: Props) => (
	<Button
		h="100%"
		variant="outline"
		flex={1}
		borderRadius="lg"
		onClick={() => paymentRequest.show()}
		disabled={pending}
		loading={pending}
	>
		<Icon
			w={16}
			h={16}
		>
			<FaApplePay />
		</Icon>
	</Button>
);
