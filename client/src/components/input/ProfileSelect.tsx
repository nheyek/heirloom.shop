import {
	Box,
	Button,
	Portal,
	Select,
	createListCollection,
} from '@chakra-ui/react';
import { AddFieldButton } from '@client/components/listing/AddFieldButton';
import { InputSize } from '@client/constants';
import { useEffect } from 'react';
import { FaPlus } from 'react-icons/fa6';

const SIZE_CONFIG = {
	[InputSize.Md]: { w: 150, chakraSize: 'md' as const, fontSize: 16 },
	[InputSize.Lg]: { w: 200, chakraSize: 'lg' as const, fontSize: 18 },
};

type Props = {
	items: { value: string; label: string }[];
	value: string | null;
	onChange: (v: string | null) => void;
	onClickAdd: () => void;
	disabled?: boolean;
	size?: InputSize;
};

export const ProfileSelect = ({
	items,
	value,
	onChange,
	onClickAdd,
	disabled,
	size = InputSize.Md,
}: Props) => {
	const { w, chakraSize, fontSize } = SIZE_CONFIG[size];

	useEffect(() => {
		if (items.length > 0 && value === null)
			onChange(items[0].value);
	}, [items, value]);

	if (items.length === 0) {
		return (
			<AddFieldButton onClick={onClickAdd} disabled={disabled}>
				Add Profile
			</AddFieldButton>
		);
	}

	const collection = createListCollection({ items });

	return (
		<Box w={w}>
			<Select.Root
				size={chakraSize}
				collection={collection}
				value={[value ?? '']}
				onValueChange={(e) => onChange(e.value[0] || null)}
				disabled={disabled}
				width="full"
			>
				<Select.HiddenSelect />
				<Select.Control>
					<Select.Trigger px={3} py={2} fontSize={fontSize}>
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
									fontSize={fontSize - 2}
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
								fontSize={fontSize}
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
