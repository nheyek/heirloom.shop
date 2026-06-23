import {
	Box,
	Button,
	Portal,
	Select,
	createListCollection,
} from '@chakra-ui/react';
import { ProcessingProfileDialog } from '@client/components/input/ProcessingProfileDialog';
import { InputSize } from '@client/constants';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

const STATIC_ITEMS = [{ label: 'Default', value: '' }];

const SIZE_CONFIG = {
	[InputSize.Md]: {
		w: 150,
		chakraSize: 'md' as const,
		fontSize: 16,
	},
	[InputSize.Lg]: {
		w: 250,
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
	const [dialogOpen, setDialogOpen] = useState(false);
	const { w, chakraSize, fontSize } = SIZE_CONFIG[size];

	const collection = createListCollection({ items: STATIC_ITEMS });

	return (
		<>
			<Box w={w}>
				<Select.Root
					size={chakraSize}
					collection={collection}
					value={[value ?? '']}
					onValueChange={(e) =>
						onChange(e.value[0] || null)
					}
					disabled={disabled}
					width="full"
				>
					<Select.HiddenSelect />
					<Select.Control>
						<Select.Trigger
							px={3}
							py={2}
							fontSize={fontSize}
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
									borderRadius={0}
									fontSize={fontSize}
									fontWeight={400}
									onPointerDown={(e) => {
										e.preventDefault();
										e.stopPropagation();
										setDialogOpen(true);
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

			<ProcessingProfileDialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				onConfirm={(profile) => {
					// TODO: persist profile and select it
					console.log('new profile', profile);
				}}
			/>
		</>
	);
};
