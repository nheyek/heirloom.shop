import { Portal, Select, createListCollection } from '@chakra-ui/react';

const COLLECTION = createListCollection({
	items: [{ label: 'Default', value: '' }],
});

type Props = {
	value: string | null;
	onChange: (v: string | null) => void;
	disabled?: boolean;
};

export const ProcessingProfileSelect = ({
	value,
	onChange,
	disabled,
}: Props) => (
	<Select.Root
		size="md"
		collection={COLLECTION}
		value={[value ?? '']}
		onValueChange={(e) => onChange(e.value[0] || null)}
		disabled={disabled}
	>
		<Select.HiddenSelect />
		<Select.Control>
			<Select.Trigger w="full">
				<Select.ValueText truncate />
				<Select.IndicatorGroup>
					<Select.Indicator />
				</Select.IndicatorGroup>
			</Select.Trigger>
		</Select.Control>
		<Portal>
			<Select.Positioner>
				<Select.Content>
					{COLLECTION.items.map((item) => (
						<Select.Item key={item.value} item={item}>
							{item.label}
							<Select.ItemIndicator />
						</Select.Item>
					))}
				</Select.Content>
			</Select.Positioner>
		</Portal>
	</Select.Root>
);
