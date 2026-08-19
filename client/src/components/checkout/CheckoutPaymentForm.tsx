import { Box, Presence, Skeleton, Stack } from '@chakra-ui/react';
import { PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

const FormSkeletonRow = () => <Skeleton height="50px" />;

const FormSkeleton = () => (
	<Stack gap={3}>
		<FormSkeletonRow />
		<FormSkeletonRow />
		<FormSkeletonRow />
	</Stack>
);

type Props = {
	disabled?: boolean;
};

export const CheckoutPaymentForm = ({ disabled }: Props) => {
	const [ready, setReady] = useState(false);

	return (
		<Box position="relative">
			<Presence present={!ready}>
				<FormSkeleton />
			</Presence>
			<Box
				visibility={ready ? 'visible' : 'hidden'}
				opacity={disabled ? 0.5 : 1}
				transition="opacity 0.2s"
			>
				<PaymentElement
					options={{
						layout: 'tabs',
						readOnly: disabled,
						wallets: { applePay: 'never', googlePay: 'never' },
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
