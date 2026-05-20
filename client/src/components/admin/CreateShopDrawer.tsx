import {
	Button,
	Field,
	Fieldset,
	Group,
	HStack,
	Input,
	InputProps,
	RadioCard,
	Stack,
} from '@chakra-ui/react';
import { CountrySelect } from '@client/components/input/CountrySelect';
import { AppDrawer } from '@client/components/layout/AppDrawer';
import { CountryCode, FulfillmentType } from '@client/constants';
import { ReactNode, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

const DrawerField = ({
	label,
	children,
}: {
	label: string;
	children: ReactNode;
}) => (
	<Field.Root>
		<Field.Label fontSize={18}>{label}</Field.Label>
		{children}
	</Field.Root>
);

const DrawerInput = (props: InputProps) => (
	<Input
		size="xl"
		fontSize={18}
		padding={3}
		{...props}
	/>
);

const FulfillmentOption = ({
	value,
	label,
	description,
}: {
	value: FulfillmentType;
	label: string;
	description: string;
}) => (
	<RadioCard.Item
		value={value.toString()}
		width="full"
	>
		<RadioCard.ItemHiddenInput />
		<RadioCard.ItemControl>
			<RadioCard.ItemIndicator />
			<RadioCard.ItemContent>
				<RadioCard.ItemText>{label}</RadioCard.ItemText>
				<RadioCard.ItemDescription>
					{description}
				</RadioCard.ItemDescription>
			</RadioCard.ItemContent>
		</RadioCard.ItemControl>
	</RadioCard.Item>
);

export const CreateShopDrawer = ({ isOpen, onClose }: Props) => {
	const [title, setTitle] = useState<string>('');
	const [classification, setClassification] = useState<string>('');
	const [country, setCountry] = useState<CountryCode>(
		CountryCode.US,
	);
	const [location, setLocation] = useState<string>('');
	const [fulfillmentType, setFulfillmentType] =
		useState<FulfillmentType>(FulfillmentType.HEIRLOOM);
	const [ownerEmail, setOwnerEmail] = useState<string>('');

	return (
		<AppDrawer
			title="Create Shop"
			isOpen={isOpen}
			onClose={onClose}
		>
			<Stack
				justify="space-between"
				height="100%"
				gap={5}
			>
				<Stack gap={5}>
					<Fieldset.Root size="lg">
						<DrawerField label="Title">
							<DrawerInput
								value={title}
								onChange={(e) =>
									setTitle(e.target.value)
								}
							/>
						</DrawerField>
						<DrawerField label="Classification">
							<DrawerInput
								value={classification}
								onChange={(e) =>
									setClassification(e.target.value)
								}
								placeholder="e.g. Leather Bags, Cast Iron Cookware, etc."
							/>
						</DrawerField>
						<DrawerField label="Location">
							<HStack width="100%">
								<CountrySelect
									value={country}
									onChange={setCountry}
								/>
								<DrawerInput
									value={location}
									onChange={(e) =>
										setLocation(e.target.value)
									}
									placeholder="City or Region"
								/>
							</HStack>
						</DrawerField>
					</Fieldset.Root>
					<RadioCard.Root
						value={fulfillmentType.toString()}
						onValueChange={(e) =>
							setFulfillmentType(
								e.value as FulfillmentType,
							)
						}
					>
						<RadioCard.Label fontSize={18}>
							Fulfillment
						</RadioCard.Label>
						<Group
							attached
							orientation="vertical"
						>
							<FulfillmentOption
								value={FulfillmentType.HEIRLOOM}
								label="Heirloom"
								description="Fulfillment and support provided by shop with comission collected on sale."
							/>
							<FulfillmentOption
								value={FulfillmentType.DIRECT}
								label="Direct"
								description="Heirloom is the retailer and purchases inventory from the shop on a wholesale basis."
							/>
						</Group>
					</RadioCard.Root>
					{fulfillmentType === FulfillmentType.DIRECT && (
						<Fieldset.Root size="lg">
							<DrawerField label="Owner">
								<DrawerInput
									type="email"
									value={ownerEmail}
									onChange={(e) =>
										setOwnerEmail(e.target.value)
									}
									placeholder="owner@example.com"
								/>
							</DrawerField>
						</Fieldset.Root>
					)}
				</Stack>
				<Button
					size="xl"
					fontSize={22}
					width="100%"
				>
					<FaCheckCircle />
					Confirm
				</Button>
			</Stack>
		</AppDrawer>
	);
};
