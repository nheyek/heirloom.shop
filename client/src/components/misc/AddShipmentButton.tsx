import { Button, Stack } from '@chakra-ui/react';
import { AppDialog } from '@client/components/misc/AppDialog';
import { DialogConfirmFooter } from '@client/components/misc/DialogConfirmFooter';
import { ShipmentFormRow } from '@client/components/misc/ShipmentFormRow';
import { ShippingProvider } from '@heirloom/common/constants';
import { Shipment } from '@heirloom/common/contract';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

const DEFAULT_SHIPMENT: Shipment = {
	provider: ShippingProvider.UPS,
	tracking: '',
};

export const AddShipmentButton = () => {
	const [open, setOpen] = useState(false);
	const [shipments, setShipments] = useState<Shipment[]>([
		{ ...DEFAULT_SHIPMENT },
	]);

	const updateShipment = (index: number, shipment: Shipment) => {
		setShipments((prev) =>
			prev.map((s, i) => (i === index ? shipment : s)),
		);
	};

	const deleteShipment = (index: number) => {
		setShipments((prev) => prev.filter((_, i) => i !== index));
	};

	return (
		<>
			<Button
				size="md"
				variant="subtle"
				onClick={() => setOpen(true)}
				fontSize={20}
			>
				<FaPlus />
				Add shipment
			</Button>

			<AppDialog
				title="Add Shipment"
				open={open}
				onCancel={() => setOpen(false)}
				size="md"
				footer={
					<DialogConfirmFooter
						onCancel={() => setOpen(false)}
						onConfirm={() => setOpen(false)}
						confirmLabel="Save"
					/>
				}
			>
				<Stack gap={3}>
					{shipments.map((shipment, index) => (
						<ShipmentFormRow
							key={index}
							shipment={shipment}
							onChange={(s) => updateShipment(index, s)}
							onDelete={() => deleteShipment(index)}
							deletable={shipments.length > 1}
						/>
					))}
					<Button
						size="sm"
						variant="subtle"
						alignSelf="flex-start"
						onClick={() =>
							setShipments((prev) => [
								...prev,
								{ ...DEFAULT_SHIPMENT },
							])
						}
						fontSize={16}
					>
						<FaPlus />
						Add package
					</Button>
				</Stack>
			</AppDialog>
		</>
	);
};
