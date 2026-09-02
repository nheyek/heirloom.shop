import { Button } from '@chakra-ui/react';
import { AppDialog } from '@client/components/misc/AppDialog';
import { DialogConfirmFooter } from '@client/components/misc/DialogConfirmFooter';
import { useState } from 'react';
import { FaTruck } from 'react-icons/fa6';

export const FulfillmentDetailsButton = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button
				size="md"
				variant="outline"
				onClick={() => setOpen(true)}
			>
				<FaTruck />
				Fulfillment details
			</Button>

			<AppDialog
				title="Fulfillment Details"
				open={open}
				onCancel={() => setOpen(false)}
				size="sm"
				footer={
					<DialogConfirmFooter
						onCancel={() => setOpen(false)}
						onConfirm={() => setOpen(false)}
						confirmLabel="Save"
					/>
				}
			/>
		</>
	);
};
