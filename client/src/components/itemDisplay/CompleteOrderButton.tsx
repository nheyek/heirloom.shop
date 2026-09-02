import { Button } from '@chakra-ui/react';
import { AppDialog } from '@client/components/misc/AppDialog';
import { DialogConfirmFooter } from '@client/components/misc/DialogConfirmFooter';
import { useState } from 'react';
import { FaCheckDouble } from 'react-icons/fa6';

export const CompleteOrderButton = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button
				size="md"
				variant="outline"
				onClick={() => setOpen(true)}
			>
				<FaCheckDouble />
				Complete
			</Button>

			<AppDialog
				title="Complete this order?"
				open={open}
				onCancel={() => setOpen(false)}
				size="sm"
				footer={
					<DialogConfirmFooter
						onCancel={() => setOpen(false)}
						onConfirm={() => setOpen(false)}
						confirmLabel="Complete"
					/>
				}
			/>
		</>
	);
};
