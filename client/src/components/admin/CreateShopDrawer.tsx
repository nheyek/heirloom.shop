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
import { useApiClient } from '@client/hooks/useApiClient';
import { callApi } from '@client/utils/apiUtils';
import { isValidEmail } from '@client/utils/validationUtils';
import { AdminShopListItem } from '@heirloom/common/contract';
import { ReactNode, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	onSuccess: (shop: AdminShopListItem) => void;
};

const DrawerField = ({
	label,
	error,
	children,
}: {
	label: string;
	error: string | null;
	children: ReactNode;
}) => (
	<Field.Root invalid={!!error}>
		<Field.Label fontSize={18}>{label}</Field.Label>
		{children}
		{error && (
			<Field.ErrorText fontSize={15}>{error}</Field.ErrorText>
		)}
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

export const CreateShopDrawer = ({
	isOpen,
	onClose,
	onSuccess,
}: Props) => {
	const apiClient = useApiClient();

	const [title, setTitle] = useState<string>('');
	const [classification, setClassification] = useState<string>('');
	const [country, setCountry] = useState<CountryCode>(
		CountryCode.US,
	);
	const [location, setLocation] = useState<string>('');
	const [fulfillmentType, setFulfillmentType] =
		useState<FulfillmentType>(FulfillmentType.HEIRLOOM);
	const [ownerEmail, setOwnerEmail] = useState<string>('');

	const [titleError, setTitleError] = useState<string | null>(null);
	const [classificationError, setClassificationError] = useState<
		string | null
	>(null);
	const [locationError, setLocationError] = useState<string | null>(
		null,
	);
	const [ownerEmailError, setOwnerEmailError] = useState<
		string | null
	>(null);

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleConfirm = () => {
		let valid = true;

		if (!title.trim()) {
			setTitleError('Title is required.');
			valid = false;
		} else setTitleError(null);

		if (!classification.trim()) {
			setClassificationError('Classification is required.');
			valid = false;
		} else setClassificationError(null);

		if (!location.trim()) {
			setLocationError('Location is required.');
			valid = false;
		} else setLocationError(null);

		if (fulfillmentType === FulfillmentType.DIRECT) {
			if (!ownerEmail.trim()) {
				setOwnerEmailError('Owner email is required.');
				valid = false;
			} else if (!isValidEmail(ownerEmail)) {
				setOwnerEmailError('Email format is invalid.');
				valid = false;
			} else setOwnerEmailError(null);
		} else {
			setOwnerEmailError(null);
		}

		if (!valid) return;

		submit();
	};

	const submit = async () => {
		setIsSubmitting(true);

		const result = await callApi(
			apiClient.admin.createShop({
				body: {
					title,
					classification,
					location,
					countryCode: country,
					directFulfillment:
						fulfillmentType === FulfillmentType.DIRECT,
					ownerEmail:
						fulfillmentType === FulfillmentType.DIRECT
							? ownerEmail
							: undefined,
				},
			}),
		);

		setIsSubmitting(false);

		if (result.error !== null) {
			// TODO: Toast
			return;
		}

		onSuccess(result.data);
	};

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
						<DrawerField
							label="Title"
							error={titleError}
						>
							<DrawerInput
								value={title}
								onChange={(e) =>
									setTitle(e.target.value)
								}
								disabled={isSubmitting}
							/>
						</DrawerField>
						<DrawerField
							label="Classification"
							error={classificationError}
						>
							<DrawerInput
								value={classification}
								onChange={(e) =>
									setClassification(e.target.value)
								}
								placeholder="e.g. Leather Bags, Cast Iron Cookware, etc."
								disabled={isSubmitting}
							/>
						</DrawerField>
						<DrawerField
							label="Location"
							error={locationError}
						>
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
									disabled={isSubmitting}
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
							<DrawerField
								label="Owner"
								error={ownerEmailError}
							>
								<DrawerInput
									type="email"
									value={ownerEmail}
									onChange={(e) =>
										setOwnerEmail(e.target.value)
									}
									placeholder="owner@example.com"
									disabled={isSubmitting}
								/>
							</DrawerField>
						</Fieldset.Root>
					)}
				</Stack>
				<Button
					size="xl"
					fontSize={22}
					width="100%"
					onClick={handleConfirm}
					disabled={isSubmitting}
					loading={isSubmitting}
				>
					<FaCheckCircle />
					Confirm
				</Button>
			</Stack>
		</AppDrawer>
	);
};
