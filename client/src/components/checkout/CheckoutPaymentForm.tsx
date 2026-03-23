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
			<Box visibility={ready ? 'visible' : 'hidden'}>
				<PaymentElement
					options={{ layout: 'tabs', readOnly: disabled }}
					onReady={() => setReady(true)}
				/>
			</Box>
		</Box>
	);
};
