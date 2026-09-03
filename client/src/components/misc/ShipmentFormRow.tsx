import { HStack, IconButton } from '@chakra-ui/react';
import { FormInput } from '@client/components/input/FormField';
import { ShippingProviderSelect } from '@client/components/input/ShippingProviderSelect';
import { sansFontFamily } from '@client/theme';
import { Shipment } from '@heirloom/common/contract';
import { FaTrashAlt } from 'react-icons/fa';

type ShipmentFormRowProps = {
	shipment: Shipment;
	onChange: (shipment: Shipment) => void;
	onDelete: () => void;
	deletable: boolean;
};

export const ShipmentFormRow = ({
	shipment,
	onChange,
	onDelete,
	deletable,
}: ShipmentFormRowProps) => (
	<HStack gap={2}>
		<ShippingProviderSelect
			value={shipment.provider}
			onChange={(provider) =>
				onChange({ ...shipment, provider })
			}
		/>
		<FormInput
			placeholder="Tracking #"
			fontFamily={sansFontFamily}
			value={shipment.tracking}
			onChange={(e) =>
				onChange({ ...shipment, tracking: e.target.value })
			}
		/>
		<IconButton
			size="sm"
			variant="ghost"
			color="red.500"
			flexShrink={0}
			onClick={onDelete}
			disabled={!deletable}
		>
			<FaTrashAlt />
		</IconButton>
	</HStack>
);
