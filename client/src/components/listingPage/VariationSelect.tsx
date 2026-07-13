import { Portal, Select } from '@chakra-ui/react';
import { VariationCollection } from '@client/components/listingPage/useVariationSelection';

type Props = {
	variation: VariationCollection;
	value: string | undefined;
	onChange: (optionId: string) => void;
};

export const VariationSelect = ({ variation, value, onChange }: Props) => (
	<Select.Root
		variant="subtle"
		collection={variation.collection}
		size="lg"
		value={value != null ? [value] : []}
		onValueChange={(e) => onChange(e.value[0] ?? '')}
	>
		<Select.HiddenSelect />
		<Select.Label fontSize={16}>{variation.name}</Select.Label>
		<Select.Control>
			<Select.Trigger cursor="button">
				<Select.ValueText
					placeholder={`Select ${variation.name.toLowerCase()}`}
					color={value == null ? 'fg.muted' : undefined}
				/>
			</Select.Trigger>
			<Select.IndicatorGroup>
				<Select.Indicator />
			</Select.IndicatorGroup>
			<Portal>
				<Select.Positioner>
					<Select.Content>
						{variation.collection.items.map((option) => (
							<Select.Item
								item={option}
								key={option.value}
							>
								{option.label}
								<Select.ItemIndicator />
							</Select.Item>
						))}
					</Select.Content>
				</Select.Positioner>
			</Portal>
		</Select.Control>
	</Select.Root>
);
