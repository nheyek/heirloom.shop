import { Group, RadioCard, Stack } from '@chakra-ui/react';
import {
	ShopFormField,
	ShopFormInput,
} from '@client/components/shop/ShopFormFields';
import { FulfillmentType } from '@client/constants';

const FulfillmentOption = ({
	value,
	label,
	description,
}: {
	value: FulfillmentType;
	label: string;
	description: string;
}) => (
	<RadioCard.Item
		value={value.toString()}
		width="full"
	>
		<RadioCard.ItemHiddenInput />
		<RadioCard.ItemControl>
			<RadioCard.ItemIndicator />
			<RadioCard.ItemContent>
				<RadioCard.ItemText fontSize={15}>
					{label}
				</RadioCard.ItemText>
				<RadioCard.ItemDescription>
					{description}
				</RadioCard.ItemDescription>
			</RadioCard.ItemContent>
		</RadioCard.ItemControl>
	</RadioCard.Item>
);

type FulfillmentFieldsProps = {
	fulfillmentType: FulfillmentType;
	onFulfillmentTypeChange: (type: FulfillmentType) => void;
	ownerEmail: string;
	onOwnerEmailChange: (email: string) => void;
	ownerEmailError: string | null;
	disabled?: boolean;
};

export const FulfillmentFields = ({
	fulfillmentType,
	onFulfillmentTypeChange,
	ownerEmail,
	onOwnerEmailChange,
	ownerEmailError,
	disabled,
}: FulfillmentFieldsProps) => (
	<Stack gap={3}>
		<RadioCard.Root
			value={fulfillmentType.toString()}
			onValueChange={(e) =>
				onFulfillmentTypeChange(e.value as FulfillmentType)
			}
			disabled={disabled}
		>
			<RadioCard.Label fontSize={18}>
				Fulfillment
			</RadioCard.Label>
			<Group
				attached
				orientation="vertical"
			>
				<FulfillmentOption
					value={FulfillmentType.HEIRLOOM}
					label="Heirloom"
					description="Fulfillment and support provided by Heirloom. Inventory purchased from the shop on a wholesale basis."
				/>
				<FulfillmentOption
					value={FulfillmentType.DIRECT}
					label="Direct"
					description="Fulfillment and support provided by shop. A comission is collected on each sale."
				/>
			</Group>
		</RadioCard.Root>
		{fulfillmentType === FulfillmentType.DIRECT && (
			<ShopFormField
				label="Owner"
				error={ownerEmailError}
			>
				<ShopFormInput
					type="email"
					value={ownerEmail}
					onChange={(e) =>
						onOwnerEmailChange(e.target.value)
					}
					placeholder="owner@example.com"
					disabled={disabled}
				/>
			</ShopFormField>
		)}
	</Stack>
);
