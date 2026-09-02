import { Button, Stack } from '@chakra-ui/react';
import { AppDialog } from '@client/components/misc/AppDialog';
import { DialogConfirmFooter } from '@client/components/misc/DialogConfirmFooter';
import { ShipmentFormRow } from '@client/components/misc/ShipmentFormRow';
import { ShippingProvider } from '@heirloom/common/constants';
import { Shipment } from '@heirloom/common/contract';
import { useState } from 'react';
import { FaCheck, FaPlus, FaTruck } from 'react-icons/fa6';

const DEFAULT_SHIPMENT: Shipment = {
	provider: ShippingProvider.UPS,
	tracking: '',
};

export const ConfirmShipmentButton = () => {
	const [open, setOpen] = useState(false);
	const [shipments, setShipments] = useState<Shipment[]>([
		{ ...DEFAULT_SHIPMENT },
	]);
	const [draftShipments, setDraftShipments] =
		useState<Shipment[]>(shipments);

	const openDialog = () => {
		setDraftShipments(shipments);
		setOpen(true);
	};

	const closeDialog = () => {
		const hasUnsavedChanges =
			JSON.stringify(draftShipments) !==
			JSON.stringify(shipments);
		if (
			hasUnsavedChanges &&
			!window.confirm('Discard unsaved changes?')
		) {
			return;
		}
		setOpen(false);
	};

	const confirmDialog = () => {
		setShipments(draftShipments);
		closeDialog();
	};

	const updateShipment = (index: number, shipment: Shipment) => {
		setDraftShipments((prev) =>
			prev.map((s, i) => (i === index ? shipment : s)),
		);
	};

	const deleteShipment = (index: number) => {
		setDraftShipments((prev) =>
			prev.filter((_, i) => i !== index),
		);
	};

	return (
		<>
			<Button
				size="md"
				onClick={openDialog}
				variant="outline"
			>
				<FaTruck />
				Confirm shipment
			</Button>

			<AppDialog
				title="Shipment Details"
				open={open}
				onCancel={closeDialog}
				size="md"
				footer={
					<DialogConfirmFooter
						onCancel={closeDialog}
						onConfirm={confirmDialog}
						confirmIcon={<FaCheck />}
						confirmLabel="Confirm"
					/>
				}
			>
				<Stack gap={3}>
					{draftShipments.map((shipment, index) => (
						<ShipmentFormRow
							key={index}
							shipment={shipment}
							onChange={(s) => updateShipment(index, s)}
							onDelete={() => deleteShipment(index)}
							deletable={draftShipments.length > 1}
						/>
					))}
					<Button
						size="sm"
						variant="subtle"
						alignSelf="flex-start"
						onClick={() =>
							setDraftShipments((prev) => [
								...prev,
								{ ...DEFAULT_SHIPMENT },
							])
						}
						fontSize={18}
					>
						<FaPlus />
						Add package
					</Button>
				</Stack>
			</AppDialog>
		</>
	);
};
