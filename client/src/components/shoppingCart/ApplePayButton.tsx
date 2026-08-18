import { Box } from '@chakra-ui/react';
import { useApplePayCheckout } from '@client/hooks/useApplePayCheckout';
import { PaymentRequestButtonElement } from '@stripe/react-stripe-js';

type Props = {
	onClose: () => void;
};

export const ApplePayButton = ({ onClose }: Props) => {
	const { paymentRequest, available, pending } =
		useApplePayCheckout(onClose);

	if (!available || !paymentRequest) {
		return null;
	}

	return (
		<Box
			width="100%"
			opacity={pending ? 0.6 : 1}
			pointerEvents={pending ? 'none' : 'auto'}
		>
			<PaymentRequestButtonElement
				options={{
					paymentRequest,
					style: {
						paymentRequestButton: {
							type: 'buy',
							theme: 'dark',
							height: '55px',
						},
					},
				}}
			/>
		</Box>
	);
};
