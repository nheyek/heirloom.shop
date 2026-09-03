import { Button, Stack } from '@chakra-ui/react';
import { AppDialog } from '@client/components/misc/AppDialog';
import { DialogConfirmFooter } from '@client/components/misc/DialogConfirmFooter';
import { ShipmentFormRow } from '@client/components/misc/ShipmentFormRow';
import { useApiClient } from '@client/hooks/useApiClient';
import { toastError } from '@client/toaster';
import { callApi } from '@client/utils/apiUtils';
import { ShippingProvider } from '@heirloom/common/constants';
import { OrderResponse, Shipment } from '@heirloom/common/contract';
import { useState } from 'react';
import { FaCheck, FaPlus, FaTruck } from 'react-icons/fa6';

const DEFAULT_SHIPMENT: Shipment = {
	provider: ShippingProvider.UPS,
	tracking: '',
};

type Props = {
	shortId: string;
	onSuccess: (order: OrderResponse) => void;
};

export const ConfirmShipmentButton = ({
	shortId,
	onSuccess,
}: Props) => {
	const apiClient = useApiClient();
	const [open, setOpen] = useState(false);
	const [pending, setPending] = useState(false);
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

	const confirmDialog = async () => {
		setPending(true);
		const result = await callApi(
			apiClient.admin.updateOrderShipments({
				params: { shortId },
				body: { shipments: draftShipments },
			}),
		);
		setPending(false);
		if (result.error !== null) {
			toastError('Failed to save shipment. Please try again.');
			return;
		}
		setShipments(draftShipments);
		setOpen(false);
		onSuccess(result.data);
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

	const hasBlankTracking = draftShipments.some(
		(shipment) => !shipment.tracking.trim(),
	);

	return (
		<>
			<Button
				size="md"
				onClick={openDialog}
				variant="subtle"
			>
				<FaTruck />
				Confirm shipment
			</Button>

			<AppDialog
				title="Shipment Details"
				open={open}
				onCancel={closeDialog}
				pending={pending}
				size="md"
				footer={
					<DialogConfirmFooter
						onCancel={closeDialog}
						onConfirm={confirmDialog}
						confirmIcon={<FaCheck />}
						confirmLabel="Confirm"
						pending={pending}
						confirmDisabled={hasBlankTracking}
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
						disabled={pending}
					>
						<FaPlus />
						Add package
					</Button>
				</Stack>
			</AppDialog>
		</>
	);
};
