import { Input, InputGroup } from '@chakra-ui/react';
import { InputSize } from '@client/constants';
import { FIELD_ERROR_COLOR, FONT_BASIC } from '@client/theme';
import { LISTING_LIMITS } from '@heirloom/common/constants';
import React, { useState } from 'react';
import { FaDollarSign } from 'react-icons/fa6';

export { InputSize as PriceInputSize };

const SIZE_CONFIG = {
	// fontSize must stay >= 16: below that, iOS Safari auto-zooms the
	// page on focus, since it treats the field as too small to read
	// comfortably.
	[InputSize.Md]: { fontSize: 16, w: 125, h: 10, iconSize: 14 },
	[InputSize.Lg]: { fontSize: 18, w: 135, h: 12, iconSize: 16 },
};

type Props = {
	value: number | null;
	onChange: (cents: number | null) => void;
	size?: InputSize;
	disabled?: boolean;
	invalid?: boolean;
	inherited?: boolean;
	enclosed?: boolean;
	onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
};

const formatCents = (cents: number) =>
	(cents / 100).toLocaleString(undefined, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

const formatWhileTyping = (str: string): string => {
	const clean = str.replace(/[^0-9.]/g, '');
	const dotIndex = clean.indexOf('.');
	const intRaw = dotIndex >= 0 ? clean.slice(0, dotIndex) : clean;
	const decRaw = dotIndex >= 0 ? clean.slice(dotIndex + 1) : null;
	const intFormatted =
		intRaw === '' ? '' : Number(intRaw).toLocaleString();
	return decRaw !== null
		? intFormatted + '.' + decRaw
		: intFormatted;
};

export const PriceInput = ({
	value,
	onChange,
	size = InputSize.Md,
	disabled,
	invalid,
	inherited = false,
	enclosed = true,
	onKeyDown,
}: Props) => {
	const [localValue, setLocalValue] = useState('');
	const [focused, setFocused] = useState(false);
	const { fontSize, w, h, iconSize } = SIZE_CONFIG[size];

	const displayValue = focused
		? localValue
		: value != null
			? formatCents(value)
			: '';

	return (
		<InputGroup startElement={<FaDollarSign size={iconSize} />}>
			<Input
				name="price"
				fontFamily={FONT_BASIC}
				fontSize={fontSize}
				w={w}
				h={h}
				value={displayValue}
				disabled={disabled}
				{...(enclosed && { bg: 'white' })}
				{...(!enclosed && { border: 'none' })}
				{...(invalid && { borderColor: FIELD_ERROR_COLOR })}
				{...(inherited && !focused && { color: 'gray.500' })}
				onKeyDown={onKeyDown}
				onChange={(e) => {
					const formatted = formatWhileTyping(
						e.target.value,
					);
					setLocalValue(formatted);
					const raw = parseFloat(
						formatted.replace(/[^0-9.-]/g, ''),
					);
					const cents =
						formatted === '' || isNaN(raw)
							? null
							: Math.round(raw * 100);
					onChange(
						cents !== null
							? Math.min(
									cents,
									LISTING_LIMITS.maxPriceCents,
								)
							: null,
					);
				}}
				onFocus={() => {
					setFocused(true);
					if (value != null) {
						const dollars = value / 100;
						const intPart = Math.floor(dollars);
						const decPart = Math.round(
							(dollars - intPart) * 100,
						);
						setLocalValue(
							decPart > 0
								? dollars.toLocaleString(undefined, {
										maximumFractionDigits: 2,
									})
								: intPart.toLocaleString(),
						);
					} else {
						setLocalValue('');
					}
				}}
				onBlur={() => setFocused(false)}
				placeholder="0.00"
			/>
		</InputGroup>
	);
};
