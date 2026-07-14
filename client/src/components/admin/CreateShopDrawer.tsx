import { Button, Stack } from '@chakra-ui/react';
import { FulfillmentFields } from '@client/components/shop/FulfillmentFields';
import { ShopFormFields } from '@client/components/shop/ShopFormFields';
import { useShopForm } from '@client/components/shop/useShopForm';
import { AppDrawer } from '@client/components/util/AppDrawer';
import { FulfillmentType } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { toastError } from '@client/toaster';
import { callApi } from '@client/utils/apiUtils';
import { AdminShopListItem } from '@heirloom/common/contract';
import { isValidEmail } from '@heirloom/common/utils/validationUtils';
import { useRef, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	onSuccess: (shop: AdminShopListItem) => void;
};

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
			<Stack gap={3}>
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

				<FulfillmentFields
					fulfillmentType={fulfillmentType}
					onFulfillmentTypeChange={setFulfillmentType}
					ownerEmail={ownerEmail}
					onOwnerEmailChange={setOwnerEmail}
					ownerEmailError={ownerEmailError}
					disabled={isConfirming}
				/>
			</Stack>
		</AppDrawer>
	);
};
