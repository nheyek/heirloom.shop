import {
	Button,
	Field,
	Fieldset,
	Group,
	HStack,
	Input,
	RadioCard,
	Stack,
} from '@chakra-ui/react';
import { CountrySelect } from '@client/components/input/CountrySelect';
import { AppDrawer } from '@client/components/layout/AppDrawer';
import { CountryCode, FulfillmentType } from '@client/constants';
import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

export const CreateShopDrawer = ({ isOpen, onClose }: Props) => {
	const [title, setTitle] = useState<string>('');
	const [classification, setClassification] = useState<string>('');
	const [country, setCountry] = useState<CountryCode>(
		CountryCode.US,
	);
	const [location, setLocation] = useState<string>('');
	const [fulfillmentType, setFulfillmentType] =
		useState<FulfillmentType>(FulfillmentType.HEIRLOOM);

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
						<Field.Root>
							<Field.Label fontSize={18}>
								Title
							</Field.Label>
							<Input
								size="xl"
								fontSize={18}
								padding={3}
								value={title}
								onChange={(e) =>
									setTitle(e.target.value)
								}
							/>
						</Field.Root>
						<Field.Root>
							<Field.Label fontSize={18}>
								Classification
							</Field.Label>
							<Input
								size="xl"
								fontSize={18}
								padding={3}
								value={classification}
								onChange={(e) =>
									setClassification(e.target.value)
								}
								placeholder="e.g. Leather Bags, Cast Iron Cookware, etc."
							/>
						</Field.Root>
						<Field.Root>
							<Field.Label fontSize={18}>
								Location
							</Field.Label>
							<HStack width="100%">
								<CountrySelect
									value={country}
									onChange={setCountry}
								/>
								<Input
									size="xl"
									fontSize={18}
									padding={3}
									value={location}
									onChange={(e) =>
										setLocation(e.target.value)
									}
									placeholder="City or Region"
								/>
							</HStack>
						</Field.Root>
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
							<RadioCard.Item
								key={FulfillmentType.HEIRLOOM}
								value={FulfillmentType.HEIRLOOM.toString()}
								width="full"
							>
								<RadioCard.ItemHiddenInput />
								<RadioCard.ItemControl>
									<RadioCard.ItemIndicator />
									<RadioCard.ItemContent>
										<RadioCard.ItemText>
											{'Heirloom'}
										</RadioCard.ItemText>
										<RadioCard.ItemDescription>
											{
												'Fulfillment and support provided by shop with comission collected on sale.'
											}
										</RadioCard.ItemDescription>
									</RadioCard.ItemContent>
								</RadioCard.ItemControl>
							</RadioCard.Item>
							<RadioCard.Item
								key={FulfillmentType.DIRECT}
								value={FulfillmentType.DIRECT.toString()}
								width="full"
							>
								<RadioCard.ItemHiddenInput />
								<RadioCard.ItemControl>
									<RadioCard.ItemIndicator />
									<RadioCard.ItemContent>
										<RadioCard.ItemText>
											{'Direct'}
										</RadioCard.ItemText>
										<RadioCard.ItemDescription>
											{
												'Heirloom is the retailer and purchases inventory from the shop on a wholesale basis.'
											}
										</RadioCard.ItemDescription>
									</RadioCard.ItemContent>
								</RadioCard.ItemControl>
							</RadioCard.Item>
						</Group>
					</RadioCard.Root>
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
