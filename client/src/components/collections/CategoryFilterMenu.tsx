import {
	createListCollection,
	Portal,
	Select,
} from '@chakra-ui/react';

const ALL_ITEMS_LABEL = 'All Categories';
const ALL_ITEMS_VALUE = 'ALL';
const SELECT_MIN_WIDTH = 220;

export type CategoryOption = {
	id: string;
	title: string;
};

type Props = {
	options: CategoryOption[];
	value: string | null;
	onChange: (categoryId: string | null) => void;
};

export const CategoryFilterMenu = (props: Props) => {
	const allItem = {
		value: ALL_ITEMS_VALUE,
		label: ALL_ITEMS_LABEL,
	};
	const categoryItems = props.options.map((option) => ({
		value: option.id,
		label: option.title,
	}));
	const collection = createListCollection({
		items: [allItem, ...categoryItems],
	});

	const renderItem = (item: { value: string; label: string }) => (
		<Select.Item
			key={item.value}
			item={item}
		>
			{item.label}
			<Select.ItemIndicator />
		</Select.Item>
	);

	return (
		<Select.Root
			size="lg"
			w={SELECT_MIN_WIDTH}
			collection={collection}
			value={[props.value ?? ALL_ITEMS_VALUE]}
			onValueChange={(e) =>
				props.onChange(
					e.value[0] === ALL_ITEMS_VALUE
						? null
						: (e.value[0] ?? null),
				)
			}
		>
			<Select.HiddenSelect />
			<Select.Control>
				<Select.Trigger>
					<Select.ValueText />
					<Select.IndicatorGroup>
						<Select.Indicator />
					</Select.IndicatorGroup>
				</Select.Trigger>
			</Select.Control>
			<Portal>
				<Select.Positioner>
					<Select.Content minWidth={SELECT_MIN_WIDTH}>
						{renderItem(allItem)}
						{categoryItems.map(renderItem)}
					</Select.Content>
				</Select.Positioner>
			</Portal>
		</Select.Root>
	);
};
