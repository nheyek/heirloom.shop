import { Button, Stack, Text } from '@chakra-ui/react';
import { PaymentProcessingAnimation } from '@client/components/checkout/PaymentProcessingAnimation';
import { AppDialog } from '@client/components/misc/AppDialog';

type Props = {
	pending: boolean;
	timedOut: boolean;
	onDismissTimeout: () => void;
};

export const OrderConfirmationDialog = ({
	pending,
	timedOut,
	onDismissTimeout,
}: Props) => (
	<AppDialog
		title={
			timedOut ? 'Payment timed out' : 'Processing payment...'
		}
		open={pending || timedOut}
		onCancel={onDismissTimeout}
		pending={pending}
		hideCloseButton
		size="sm"
		titleProps={{
			textAlign: 'center',
			fontSize: 28,
			marginRight: 0,
			width: '100%',
		}}
		footer={
			timedOut ? (
				<Button onClick={onDismissTimeout}>Close</Button>
			) : undefined
		}
	>
		{timedOut ? (
			<Text>
				Payment confirmation is taking longer than expected.
				Check your email for order confirmation, or contact
				support if you were charged.
			</Text>
		) : (
			<Stack
				align="center"
				pt={2}
				pb={5}
			>
				<PaymentProcessingAnimation />
			</Stack>
		)}
	</AppDialog>
);
