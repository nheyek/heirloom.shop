import { Checkbox, HStack, Span, Stack } from '@chakra-ui/react';
import { InventoryInput } from '@client/components/input/InventoryInput';
import { ListingFormState } from '@client/components/listingForm/useListingForm';
import { InfoPopover } from '@client/components/misc/InfoPopover';
import { FORM_FIELD_GAP } from '@client/constants';

type Props = {
	form: ListingFormState;
	disabled?: boolean;
};

export const TrackInventoryField = ({ form, disabled }: Props) => (
	<Stack gap={FORM_FIELD_GAP}>
		<HStack gap={1}>
			<Checkbox.Root
				checked={form.trackInventory}
				onCheckedChange={(e) => {
					const checked = !!e.checked;
					form.setTrackInventory(checked);
					if (checked && form.inventory === '')
						form.setInventory('0');
				}}
				size="md"
				disabled={disabled}
			>
				<Checkbox.HiddenInput />
				<Checkbox.Control />
				<Checkbox.Label fontSize={18}>
					Track Inventory
				</Checkbox.Label>
			</Checkbox.Root>
			<InfoPopover>
				<Stack fontSize={16}>
					<Span>
						Tracking inventory determines how many of this
						listing can be purchased.
					</Span>
					<Span>
						Un-tracked listings allow unlimited purchases
						unless the listing is disabled.
					</Span>
				</Stack>
			</InfoPopover>
		</HStack>
		{form.trackInventory &&
			Object.keys(form.variations).length === 0 && (
				<InventoryInput
					value={form.inventory}
					onChange={form.setInventory}
					disabled={disabled}
				/>
			)}
	</Stack>
);
