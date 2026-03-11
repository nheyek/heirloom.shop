import { Presence, Skeleton, Stack } from '@chakra-ui/react';
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

export const CheckoutPaymentForm = () => {
	const [ready, setReady] = useState(false);

	return (
		<>
			<Presence present={!ready}>
				<FormSkeleton />
			</Presence>
			<Presence present={ready}>
				<PaymentElement
					options={{ layout: 'tabs' }}
					onReady={() => setReady(true)}
				/>
			</Presence>
		</>
	);
};
