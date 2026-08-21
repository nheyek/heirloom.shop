import { NumberInput } from '@chakra-ui/react';
import { sansFontFamily } from '@client/theme';
import { LISTING_LIMITS } from '@heirloom/common/constants';

type Props = {
	value: string;
	onChange: (value: string) => void;
	disabled?: boolean;
};

export const InventoryInput = ({
	value,
	onChange,
	disabled,
}: Props) => (
	<NumberInput.Root
		value={value}
		onValueChange={(details) => onChange(details.value)}
		onFocusChange={(details) => {
			if (!details.focused && details.value === '')
				onChange('0');
		}}
		min={0}
		max={LISTING_LIMITS.maxInventory}
		formatOptions={{ maximumFractionDigits: 0 }}
		disabled={disabled}
		size="lg"
		w={32}
	>
		<NumberInput.Input
			fontFamily={sansFontFamily}
			fontSize={18}
			h={12}
		/>
		<NumberInput.Control />
	</NumberInput.Root>
);
