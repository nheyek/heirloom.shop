import {
	Box,
	Button,
	Portal,
	Select,
	createListCollection,
} from '@chakra-ui/react';
import { AddFieldButton } from '@client/components/listingForm/AddFieldButton';
import { useEffect } from 'react';
import { FaPlus } from 'react-icons/fa6';

type Props = {
	items: { value: string; label: string }[];
	value: string | null;
	onChange: (v: string | null) => void;
	onClickAdd: () => void;
	disabled?: boolean;
};

export const ProfileSelect = ({
	items,
	value,
	onChange,
	onClickAdd,
	disabled,
}: Props) => {
	useEffect(() => {
		if (items.length > 0 && value === null)
			onChange(items[0].value);
	}, [items, value]);

	if (items.length === 0) {
		return (
			<AddFieldButton
				onClick={onClickAdd}
				disabled={disabled}
			>
				Add Profile
			</AddFieldButton>
		);
	}

	const collection = createListCollection({ items });

	return (
		<Box w={200}>
			<Select.Root
				size="lg"
				collection={collection}
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
						fontSize={18}
					>
						<Select.ValueText truncate />
						<Select.IndicatorGroup>
							<Select.Indicator />
						</Select.IndicatorGroup>
					</Select.Trigger>
				</Select.Control>
				<Portal>
					<Select.Positioner>
						<Select.Content>
							{collection.items.map((item) => (
								<Select.Item
									key={item.value}
									item={item}
									fontSize={16}
								>
									{item.label}
									<Select.ItemIndicator />
								</Select.Item>
							))}
							<Button
								variant="ghost"
								size="sm"
								w="full"
								justifyContent="flex-start"
								px={2}
								pt={1}
								borderRadius={0}
								fontSize={18}
								fontWeight={400}
								onPointerDown={(e) => {
									e.preventDefault();
									e.stopPropagation();
									onClickAdd();
								}}
							>
								<FaPlus />
								New Profile
							</Button>
						</Select.Content>
					</Select.Positioner>
				</Portal>
			</Select.Root>
		</Box>
	);
};
