import {
	Button,
	Field,
	Fieldset,
	FileUpload,
	Group,
	HStack,
	Image,
	Input,
	InputProps,
	RadioCard,
	Stack,
	Text,
} from '@chakra-ui/react';
import { CountrySelect } from '@client/components/input/CountrySelect';
import { AppDrawer } from '@client/components/layout/AppDrawer';
import { CountryCode, FulfillmentType } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { toastError } from '@client/toaster';
import { callApi } from '@client/utils/apiUtils';
import { isValidEmail } from '@client/utils/validationUtils';
import { AdminShopListItem } from '@heirloom/common/contract';
import { ReactNode, useRef, useState } from 'react';
import { FaCheckCircle, FaImage } from 'react-icons/fa';

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

	const [imagePreviewUrl, setImagePreviewUrl] = useState<
		string | null
	>(null);
	const [profileImageUuid, setProfileImageUuid] = useState<
		string | null
	>(null);
	const [isUploadingImage, setIsUploadingImage] = useState(false);

	const [isConfirming, setIsConfirming] = useState(false);

	const titleFieldRef = useRef<HTMLDivElement>(null);

	const handleImageSelect = async (file: File) => {
		setImagePreviewUrl(URL.createObjectURL(file));
		setProfileImageUuid(null);

		setIsUploadingImage(true);
		const result = await callApi(
			apiClient.admin.getShopImageUploadUrl({
				body: { contentType: file.type },
			}),
		);
		if (result.error !== null) {
			toastError('Failed to prepare image upload.');
			setIsUploadingImage(false);
			return;
		}

		const { uuid, uploadUrl } = result.data;
		const uploadRes = await fetch(uploadUrl, {
			method: 'PUT',
			body: file,
			headers: { 'Content-Type': file.type },
		});

		setIsUploadingImage(false);

		if (!uploadRes.ok) {
			toastError('Failed to upload image.');
			return;
		}

		setProfileImageUuid(uuid);
	};

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
					profileImageUuid: profileImageUuid ?? undefined,
				},
			}),
		);

		setIsConfirming(false);

		if (result.status === 409) {
			setTitleError('A shop with this name already exists.');
			titleFieldRef.current?.scrollIntoView({ behavior: 'smooth' });
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
			<Stack gap={5}>
				<Fieldset.Root size="lg">
					<div ref={titleFieldRef}>
						<DrawerField
							label="Title"
							error={titleError}
						>
							<DrawerInput
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								disabled={isConfirming}
							/>
						</DrawerField>
					</div>
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
							disabled={isConfirming}
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
								disabled={isConfirming}
							/>
						</HStack>
					</DrawerField>
				</Fieldset.Root>
				<RadioCard.Root
					value={fulfillmentType.toString()}
					onValueChange={(e) =>
						setFulfillmentType(e.value as FulfillmentType)
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
								disabled={isConfirming}
							/>
						</DrawerField>
					</Fieldset.Root>
				)}
				<FileUpload.Root
					accept="image/*"
					maxFiles={1}
					onFileChange={(details) => {
						const file = details.acceptedFiles[0];
						if (file) handleImageSelect(file);
					}}
				>
					<FileUpload.HiddenInput />
					<FileUpload.Trigger asChild>
						<Stack
							gap={0}
							cursor="pointer"
							borderRadius="md"
							overflow="hidden"
							borderWidth={imagePreviewUrl ? 0 : 1}
							borderStyle="dashed"
							borderColor="gray.300"
							alignItems="center"
							justifyContent="center"
							height={160}
							width="100%"
							position="relative"
							_hover={{ borderColor: 'gray.400' }}
						>
							{imagePreviewUrl ? (
								<Image
									src={imagePreviewUrl}
									width="100%"
									height="100%"
									objectFit="cover"
									opacity={
										isUploadingImage ? 0.5 : 1
									}
								/>
							) : (
								<Stack
									alignItems="center"
									gap={2}
									color="gray.500"
								>
									<FaImage size={26} />
									<Text fontSize={18}>
										Upload banner image
									</Text>
								</Stack>
							)}
						</Stack>
					</FileUpload.Trigger>
				</FileUpload.Root>
			</Stack>
		</AppDrawer>
	);
};
