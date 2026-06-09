import { Button, Group, RadioCard } from '@chakra-ui/react';
import { AppDrawer } from '@client/components/layout/AppDrawer';
import {
	ShopFormField,
	ShopFormFields,
	ShopFormInput,
} from '@client/components/shop/ShopFormFields';
import { FulfillmentType } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { useShopForm } from '@client/hooks/useShopForm';
import { toastError } from '@client/toaster';
import { callApi } from '@client/utils/apiUtils';
import { isValidEmail } from '@client/utils/validationUtils';
import { AdminShopListItem } from '@heirloom/common/contract';
import { useRef, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	onSuccess: (shop: AdminShopListItem) => void;
};

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
				<RadioCard.ItemText fontSize={15}>
					{label}
				</RadioCard.ItemText>
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

	const {
		title,
		setTitle,
		titleError,
		setTitleError,
		classification,
		setClassification,
		classificationError,
		country,
		setCountry,
		location,
		setLocation,
		locationError,
		imagePreviewUrl,
		isUploadingImage,
		handleImageSelect,
		resolveImageUuid,
		validateSharedFields,
	} = useShopForm();

	const [fulfillmentType, setFulfillmentType] =
		useState<FulfillmentType>(FulfillmentType.HEIRLOOM);
	const [ownerEmail, setOwnerEmail] = useState<string>('');
	const [ownerEmailError, setOwnerEmailError] = useState<
		string | null
	>(null);

	const [isConfirming, setIsConfirming] = useState(false);

	const titleFieldRef = useRef<HTMLDivElement>(null);

	const handleConfirm = () => {
		const sharedValid = validateSharedFields();

		let ownerValid = true;
		if (fulfillmentType === FulfillmentType.DIRECT) {
			if (!ownerEmail.trim()) {
				setOwnerEmailError('Owner email is required.');
				ownerValid = false;
			} else if (!isValidEmail(ownerEmail)) {
				setOwnerEmailError('Email format is invalid.');
				ownerValid = false;
			} else setOwnerEmailError(null);
		} else {
			setOwnerEmailError(null);
		}

		if (!sharedValid || !ownerValid) return;

		confirm();
	};

	const confirm = async () => {
		setIsConfirming(true);

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
					profileImageUuid: resolveImageUuid(),
				},
			}),
		);

		setIsConfirming(false);

		if (result.status === 409) {
			setTitleError('A shop with this name already exists.');
			titleFieldRef.current?.scrollIntoView({
				behavior: 'smooth',
			});
			return;
		}

		if (result.error !== null) {
			toastError('Failed to create shop. Please try again.');
			return;
		}

		onSuccess(result.data);
	};

	const confirmButton = (
		<Button
			size="xl"
			fontSize={22}
			width="100%"
			onClick={handleConfirm}
			disabled={isConfirming || isUploadingImage}
			loading={isConfirming || isUploadingImage}
		>
			<FaCheckCircle />
			Confirm
		</Button>
	);

	return (
		<AppDrawer
			title="Create Shop"
			isOpen={isOpen}
			onClose={onClose}
			footer={confirmButton}
		>
			<ShopFormFields
				title={title}
				onTitleChange={setTitle}
				titleError={titleError}
				titleFieldRef={titleFieldRef}
				classification={classification}
				onClassificationChange={setClassification}
				classificationError={classificationError}
				country={country}
				onCountryChange={setCountry}
				location={location}
				onLocationChange={setLocation}
				locationError={locationError}
				imagePreviewUrl={imagePreviewUrl}
				isUploadingImage={isUploadingImage}
				onImageSelect={handleImageSelect}
				disabled={isConfirming}
			/>

			<RadioCard.Root
				value={fulfillmentType.toString()}
				onValueChange={(e) =>
					setFulfillmentType(e.value as FulfillmentType)
				}
				mt={5}
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
						description="Fulfillment and support provided by Heirloom. Inventory purchased from the shop on a wholesale basis."
					/>
					<FulfillmentOption
						value={FulfillmentType.DIRECT}
						label="Direct"
						description="Fulfillment and support provided by shop. A comission is collected on each sale."
					/>
				</Group>
			</RadioCard.Root>
			{fulfillmentType === FulfillmentType.DIRECT && (
				<ShopFormField
					label="Owner"
					error={ownerEmailError}
				>
					<ShopFormInput
						type="email"
						value={ownerEmail}
						onChange={(e) =>
							setOwnerEmail(e.target.value)
						}
						placeholder="owner@example.com"
						disabled={isConfirming}
					/>
				</ShopFormField>
			)}
		</AppDrawer>
	);
};
