import {
	Box,
	Button,
	Portal,
	Select,
	createListCollection,
} from '@chakra-ui/react';
import { ProcessingProfileDialog } from '@client/components/input/ProcessingProfileDialog';
import { AddFieldButton } from '@client/components/listing/AddFieldButton';
import { InputSize } from '@client/constants';
import { ProcessingProfile } from '@client/hooks/useListingForm';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

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
	profiles: ProcessingProfile[];
	onAddProfile: (profile: ProcessingProfile) => void;
	value: string | null;
	onChange: (v: string | null) => void;
	disabled?: boolean;
	size?: InputSize;
};

export const ProcessingProfileSelect = ({
	profiles,
	onAddProfile,
	value,
	onChange,
	disabled,
	size = InputSize.Md,
}: Props) => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const { w, chakraSize, fontSize } = SIZE_CONFIG[size];

	useEffect(() => {
		if (profiles.length > 0 && value === null)
			onChange(profiles[0].id);
	}, [profiles, value]);

	const dialog = (
		<ProcessingProfileDialog
			open={dialogOpen}
			onClose={() => setDialogOpen(false)}
			onConfirm={(p) => {
				const profile = {
					id: crypto.randomUUID(),
					...p,
				};
				onAddProfile(profile);
				onChange(profile.id);
			}}
		/>
	);

	if (profiles.length === 0) {
		return (
			<>
				<AddFieldButton
					onClick={() => setDialogOpen(true)}
					disabled={disabled}
				>
					Add Profile
				</AddFieldButton>
				{dialog}
			</>
		);
	}

	const collection = createListCollection({
		items: profiles.map((p) => ({ value: p.id, label: p.name })),
	});

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
			{dialog}
		</>
	);
};
