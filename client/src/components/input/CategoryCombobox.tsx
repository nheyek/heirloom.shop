import { Combobox, createListCollection } from '@chakra-ui/react';
import { useCategories } from '@client/providers/CategoriesProvider';
import { CategoryTileData } from '@heirloom/common/contract';
import { useMemo, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { LuCheck } from 'react-icons/lu';

type CategoryItem = {
	value: string;
	label: string;
};

const buildCategoryItems = (
	getChildCategories: (id: string | null) => CategoryTileData[],
	parentId: string | null,
	prefix: string,
): CategoryItem[] => {
	const children = getChildCategories(parentId);
	return children.flatMap((cat) => {
		const label = prefix
			? `${prefix}  ▸  ${cat.title}`
			: cat.title;
		return [
			{ value: cat.id, label },
			...buildCategoryItems(getChildCategories, cat.id, label),
		];
	});
};

type CategoryComboboxProps = {
	value: string | null;
	onChange: (value: string | null) => void;
	disabled?: boolean;
};

export const CategoryCombobox = ({
	value,
	onChange,
	disabled,
}: CategoryComboboxProps) => {
	const { getChildCategories } = useCategories();
	const [inputValue, setInputValue] = useState('');

	const allItems = useMemo(
		() => buildCategoryItems(getChildCategories, null, ''),
		[getChildCategories],
	);

	const filteredItems = useMemo(() => {
		const q = inputValue.toLowerCase().trim();
		return q
			? allItems.filter((item) =>
					item.label.toLowerCase().includes(q),
				)
			: allItems;
	}, [allItems, inputValue]);

	const collection = useMemo(
		() =>
			createListCollection({
				items: filteredItems,
				itemToValue: (item) => item.value,
				itemToString: (item) => item.label,
			}),
		[filteredItems],
	);

	const selectedLabel =
		allItems.find((item) => item.value === value)?.label ?? '';

	return (
		<Combobox.Root
			collection={collection}
			value={value ? [value] : []}
			inputValue={inputValue}
			onInputValueChange={(details) =>
				setInputValue(details.inputValue)
			}
			onValueChange={(details) => {
				onChange(details.value[0] ?? null);
				const selected = allItems.find(
					(item) => item.value === details.value[0],
				);
				setInputValue(selected?.label ?? '');
			}}
			onOpenChange={(details) => {
				if (!details.open) {
					setInputValue(selectedLabel);
				}
			}}
			openOnClick
			disabled={disabled}
			size="lg"
		>
			<Combobox.Control>
				<Combobox.Input
					placeholder="Search categories…"
					fontSize={18}
					px={3}
					py={2}
					name="category"
				/>
				<Combobox.IndicatorGroup>
					<Combobox.Trigger>
						<IoMdArrowDropdown />
					</Combobox.Trigger>
				</Combobox.IndicatorGroup>
			</Combobox.Control>
			<Combobox.Positioner>
				<Combobox.Content
					maxH={300}
					overflowY="auto"
				>
					<Combobox.Empty
						fontSize={16}
						color="gray.500"
					>
						No categories found
					</Combobox.Empty>
					{filteredItems.map((item) => (
						<Combobox.Item
							key={item.value}
							item={item}
							cursor="pointer"
							px={3}
							py={2}
							fontSize={16}
							alignItems="start"
						>
							<Combobox.ItemText whiteSpace="pre-wrap">
								{item.label}
							</Combobox.ItemText>
							<Combobox.ItemIndicator>
								<LuCheck />
							</Combobox.ItemIndicator>
						</Combobox.Item>
					))}
				</Combobox.Content>
			</Combobox.Positioner>
		</Combobox.Root>
	);
};
