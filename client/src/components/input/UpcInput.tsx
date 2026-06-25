import { Input, InputGroup } from '@chakra-ui/react';
import { InputSize } from '@client/constants';
import { FIELD_ERROR_COLOR, FONT_DEFAULT } from '@client/theme';
import { FaBarcode } from 'react-icons/fa6';

const SIZE_CONFIG = {
	[InputSize.Md]: { fontSize: 15, w: 160, h: 10, iconSize: 14 },
	[InputSize.Lg]: { fontSize: 17, w: 175, h: 12, iconSize: 16 },
};

type Props = {
	value: string;
	onChange: (value: string) => void;
	size?: InputSize;
	disabled?: boolean;
	invalid?: boolean;
};

export const UpcInput = ({
	value,
	onChange,
	size = InputSize.Md,
	disabled,
	invalid,
}: Props) => {
	const { fontSize, w, h } = SIZE_CONFIG[size];

	return (
		<InputGroup
			startElement={
				<FaBarcode size={SIZE_CONFIG[size].iconSize} />
			}
		>
			<Input
				name="upc"
				fontFamily={FONT_DEFAULT}
				fontSize={fontSize}
				w={w}
				h={h}
				value={value}
				disabled={disabled}
				borderColor={invalid ? FIELD_ERROR_COLOR : undefined}
				onChange={(e) =>
					onChange(
						e.target.value
							.replace(/\D/g, '')
							.slice(0, 12),
					)
				}
				maxLength={12}
			/>
		</InputGroup>
	);
};
