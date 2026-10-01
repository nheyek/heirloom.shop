import { Stack, Text } from '@chakra-ui/react';
import { PaymentProcessingAnimation } from '@client/components/checkout/PaymentProcessingAnimation';
import { AppDialog } from '@client/components/misc/AppDialog';

type Props = {
	pending: boolean;
	timedOut: boolean;
	onDismissTimeout: () => void;
};

export const PaymentProcessingDialog = ({
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
		hideCloseButton={pending}
		size="sm"
		titleProps={{
			textAlign: 'center',
			fontSize: 28,
			marginRight: 0,
			width: '100%',
		}}
	>
		<Stack
			align="center"
			pt={2}
			pb={5}
			gap={4}
		>
			<PaymentProcessingAnimation timedOut={timedOut} />
			{timedOut && (
				<Stack
					gap={1}
					textAlign="center"
					fontSize={20}
				>
					<Text fontWeight={500}>
						You will not be charged for this order.
					</Text>
					<Text>Please try again later.</Text>
				</Stack>
			)}
		</Stack>
	</AppDialog>
);
