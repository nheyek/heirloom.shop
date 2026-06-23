import { HStack, Input, Text } from '@chakra-ui/react';
import { FONT_DEFAULT } from '@client/theme';
import { FaMinus } from 'react-icons/fa6';

type DayInputProps = {
	value: string;
	onChange: (value: string) => void;
};

const DayInput = ({ value, onChange }: DayInputProps) => (
	<Input
		size="lg"
		w={16}
		fontSize={16}
		fontFamily={FONT_DEFAULT}
		value={value}
		onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))}
	/>
);

type Props = {
	minDays: string;
	maxDays: string;
	onChangeMin: (v: string) => void;
	onChangeMax: (v: string) => void;
};

export const DayRangeInput = ({
	minDays,
	maxDays,
	onChangeMin,
	onChangeMax,
}: Props) => (
	<HStack gap={3} align="center">
		<DayInput value={minDays} onChange={onChangeMin} />
		<FaMinus />
		<DayInput value={maxDays} onChange={onChangeMax} />
		<Text fontSize={18}>Days</Text>
	</HStack>
);

export const validateDayRange = (
	minDays: string,
	maxDays: string,
): { min: number; max: number } | null => {
	const min = parseInt(minDays, 10);
	const max = parseInt(maxDays, 10);
	if (!minDays || !maxDays || isNaN(min) || isNaN(max) || min < 1 || max < min)
		return null;
	return { min, max };
};
