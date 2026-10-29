import { Center, Spinner, Stack, Text } from '@chakra-ui/react';
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
		placement="center"
		titleProps={{
			textAlign: 'center',
			fontSize: 28,
			marginRight: 0,
			width: '100%',
		}}
	>
		<Center py={5}>
			{timedOut ? (
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
			) : (
				<Spinner
					w={65}
					h={65}
					borderWidth={5}
				/>
			)}
		</Center>
	</AppDialog>
);
