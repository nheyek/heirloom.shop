import {
	Box,
	Portal,
	Select,
	createListCollection,
} from '@chakra-ui/react';
import { InputSize } from '@client/constants';

const COLLECTION = createListCollection({
	items: [{ label: 'Default', value: '' }],
});

const SIZE_CONFIG = {
	[InputSize.Md]: {
		w: 200,
		chakraSize: 'md' as const,
		fontSize: 16,
	},
	[InputSize.Lg]: {
		w: 300,
		chakraSize: 'lg' as const,
		fontSize: 18,
	},
};

type Props = {
	value: string | null;
	onChange: (v: string | null) => void;
	disabled?: boolean;
	size?: InputSize;
};

export const ProcessingProfileSelect = ({
	value,
	onChange,
	disabled,
	size = InputSize.Md,
}: Props) => {
	const { w, chakraSize, fontSize } = SIZE_CONFIG[size];
	return (
		<Box w={w}>
			<Select.Root
				size={chakraSize}
				collection={COLLECTION}
				value={[value ?? '']}
				onValueChange={(e) => onChange(e.value[0] || null)}
				disabled={disabled}
				width="full"
			>
				<Select.HiddenSelect />
				<Select.Control>
					<Select.Trigger
						px={3}
						py={2}
					>
						<Select.ValueText
							truncate
							fontSize={fontSize}
						/>
						<Select.IndicatorGroup>
							<Select.Indicator />
						</Select.IndicatorGroup>
					</Select.Trigger>
				</Select.Control>
				<Portal>
					<Select.Positioner>
						<Select.Content>
							{COLLECTION.items.map((item) => (
								<Select.Item
									key={item.value}
									item={item}
								>
									{item.label}
									<Select.ItemIndicator />
								</Select.Item>
							))}
						</Select.Content>
					</Select.Positioner>
				</Portal>
			</Select.Root>
		</Box>
	);
};
