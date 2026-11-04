import { Box, Presence, Skeleton, Stack } from '@chakra-ui/react';
import { PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

const FormSkeleton = () => (
	<Stack
		gap={3}
		height="100%"
	>
		<Skeleton flex={1} />
		<Skeleton flex={1} />
		<Skeleton flex={1} />
	</Stack>
);

type Props = {
	disabled?: boolean;
};

export const CheckoutPaymentForm = ({ disabled }: Props) => {
	const [ready, setReady] = useState(false);

	return (
		<Box position="relative">
			<Presence
				present={!ready}
				position="absolute"
				inset={0}
			>
				<FormSkeleton />
			</Presence>
			<Box
				visibility={ready ? 'visible' : 'hidden'}
				{...(!ready && { minHeight: 200 })}
				opacity={disabled ? 0.5 : 1}
				transition="opacity 0.2s"
			>
				<PaymentElement
					options={{
						layout: 'tabs',
						readOnly: disabled,
						wallets: {
							applePay: 'never',
							googlePay: 'never',
						},
					}}
					onReady={() => setReady(true)}
				/>
				{disabled && (
					<Box
						position="absolute"
						inset={0}
						cursor="not-allowed"
					/>
				)}
			</Box>
		</Box>
	);
};
