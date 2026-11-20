import { Center, Spinner, Stack, Text } from '@chakra-ui/react';
import { AppDialog } from '@client/components/misc/AppDialog';
import { SubHeading } from '@client/components/textDisplay/SubHeading';
import { DEFAULT_FONT_FAMILY } from '@client/theme';
import { FaSpinner, FaTriangleExclamation } from 'react-icons/fa6';

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
		title={timedOut ? 'Payment timed out' : 'Processing payment'}
		open={pending || timedOut}

		onCancel={onDismissTimeout}
		pending={pending}
		hideCloseButton
		size="sm"
		placement="center"
		titleProps={{
			textAlign: 'center',
			fontFamily: DEFAULT_FONT_FAMILY,
		}}
	>
		{timedOut ? (
			<Stack
				gap={5}
				pb={2}
				alignItems="center"
			>
				<FaTriangleExclamation size={48} />

				<Stack
					gap={2}
					alignItems="center"
				>
					<SubHeading size="lg">
						You will not be charged for this order.
					</SubHeading>
					<Text fontSize={20}>Please try again later.</Text>
				</Stack>
			</Stack>
		) : (
			<Center
				pt={3}
				pb={6}
			>
				<Spinner
					borderWidth={0}
					animationDuration="1s"
					asChild
					w={12}
					h={12}
				>
					<FaSpinner />
				</Spinner>
			</Center>
		)}
	</AppDialog>
);
