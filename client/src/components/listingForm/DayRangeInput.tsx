import { HStack, Input, Text } from '@chakra-ui/react';
import { FONT_BASIC } from '@client/theme';
import { FaMinus } from 'react-icons/fa6';

type DayInputProps = {
	value: string;
	onChange: (value: string) => void;
	disabled?: boolean;
};

const DayInput = ({ value, onChange, disabled }: DayInputProps) => (
	<Input
		size="lg"
		w={16}
		fontSize={16}
		fontFamily={FONT_BASIC}
		value={value}
		onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))}
		disabled={disabled}
	/>
);

type Props = {
	minDays: string;
	maxDays: string;
	onChangeMin: (v: string) => void;
	onChangeMax: (v: string) => void;
	disabled?: boolean;
};

export const DayRangeInput = ({
	minDays,
	maxDays,
	onChangeMin,
	onChangeMax,
	disabled,
}: Props) => (
	<HStack
		gap={3}
		align="center"
	>
		<DayInput
			value={minDays}
			onChange={onChangeMin}
			disabled={disabled}
		/>
		<FaMinus />
		<DayInput
			value={maxDays}
			onChange={onChangeMax}
			disabled={disabled}
		/>
		<Text fontSize={18}>Business days</Text>
	</HStack>
);

export const validateDayRange = (
	minDays: string,
	maxDays: string,
): { min: number; max: number } | null => {
	const min = parseInt(minDays, 10);
	const max = parseInt(maxDays, 10);
	if (
		!minDays ||
		!maxDays ||
		isNaN(min) ||
		isNaN(max) ||
		min < 1 ||
		max < min
	)
		return null;
	return { min, max };
};
