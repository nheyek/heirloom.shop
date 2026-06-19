import { Input, InputGroup } from '@chakra-ui/react';
import { useState } from 'react';
import { FaDollarSign } from 'react-icons/fa6';

export enum PriceInputSize {
	Md,
	Lg,
}

type Props = {
	value: number | null;
	onChange: (cents: number | null) => void;
	size?: PriceInputSize;
	disabled?: boolean;
};

const formatCents = (cents: number) =>
	(cents / 100).toLocaleString(undefined, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

export const PriceInput = ({
	value,
	onChange,
	size = PriceInputSize.Md,
	disabled,
}: Props) => {
	const [localValue, setLocalValue] = useState('');
	const [focused, setFocused] = useState(false);

	const displayValue = focused
		? localValue
		: value != null
			? formatCents(value)
			: '';

	return (
		<InputGroup
			startElement={
				<FaDollarSign size={PriceInputSize.Md ? 13 : 15} />
			}
		>
			<Input
				fontSize={size === PriceInputSize.Md ? 18 : 22}
				w={size === PriceInputSize.Md ? 120 : 135}
				h={size === PriceInputSize.Md ? 10 : 12}
				value={displayValue}
				disabled={disabled}
				onChange={(e) => {
					const str = e.target.value;
					setLocalValue(str);
					const raw = parseFloat(
						str.replace(/[^0-9.-]/g, ''),
					);
					onChange(
						str === '' || isNaN(raw)
							? null
							: Math.round(raw * 100),
					);
				}}
				onFocus={() => {
					setFocused(true);
					setLocalValue(
						value != null ? String(value / 100) : '',
					);
				}}
				onBlur={() => setFocused(false)}
				placeholder="0.00"
			/>
		</InputGroup>
	);
};
