import { NumberInput } from '@chakra-ui/react';
import { InputSize } from '@client/constants';
import { sansFontFamily } from '@client/theme';
import { LISTING_LIMITS } from '@heirloom/common/constants';

const SIZE_CONFIG = {
	[InputSize.Md]: { fontSize: 16, h: 10 },
	[InputSize.Lg]: { fontSize: 18, h: 12 },
};

type Props = {
	value: string;
	onChange: (value: string) => void;
	size?: InputSize;
	disabled?: boolean;
};

export const InventoryInput = ({
	value,
	onChange,
	size = InputSize.Lg,
	disabled,
}: Props) => {
	const { fontSize, h } = SIZE_CONFIG[size];

	return (
		<NumberInput.Root
			value={value}
			onValueChange={(details) => {
				if (details.value === '') {
					onChange('');
					return;
				}
				if (Number.isNaN(details.valueAsNumber)) return;
				const clamped = Math.min(
					Math.max(details.valueAsNumber, 0),
					LISTING_LIMITS.maxInventory,
				);
				onChange(String(clamped));
			}}
			onFocusChange={(details) => {
				if (!details.focused && details.value === '')
					onChange('0');
			}}
			min={0}
			max={LISTING_LIMITS.maxInventory}
			formatOptions={{ maximumFractionDigits: 0 }}
			disabled={disabled}
			size="lg"
			w={95}
		>
			<NumberInput.Input
				fontFamily={sansFontFamily}
				fontSize={fontSize}
				h={h}
				maxLength={
					String(LISTING_LIMITS.maxInventory).length
				}
			/>
			<NumberInput.Control />
		</NumberInput.Root>
	);
};
