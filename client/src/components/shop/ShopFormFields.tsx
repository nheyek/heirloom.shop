import {
	Field,
	Fieldset,
	FileUpload,
	Flex,
	HStack,
	Image,
	Input,
	InputProps,
	Stack,
	Text,
} from '@chakra-ui/react';
import { CountrySelect } from '@client/components/input/CountrySelect';
import { CountryCode, MAX_IMAGE_SIZE_MB } from '@client/constants';
import { toastError } from '@client/toaster';
import { ReactNode } from 'react';
import { FaImage } from 'react-icons/fa';

export const ShopFormField = ({
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

export const ShopFormInput = (props: InputProps) => (
	<Input
		size="xl"
		fontSize={18}
		padding={3}
		{...props}
	/>
);

type ShopFormFieldsProps = {
	title: string;
	onTitleChange: (v: string) => void;
	titleError: string | null;
	titleFieldRef?: React.RefObject<HTMLDivElement | null>;

	classification: string;
	onClassificationChange: (v: string) => void;
	classificationError: string | null;

	country: CountryCode;
	onCountryChange: (v: CountryCode) => void;

	location: string;
	onLocationChange: (v: string) => void;
	locationError: string | null;

	imagePreviewUrl: string | null;
	isUploadingImage: boolean;
	onImageSelect: (file: File) => void;

	disabled?: boolean;
};

export const ShopFormFields = ({
	title,
	onTitleChange,
	titleError,
	titleFieldRef,
	classification,
	onClassificationChange,
	classificationError,
	country,
	onCountryChange,
	location,
	onLocationChange,
	locationError,
	imagePreviewUrl,
	isUploadingImage,
	onImageSelect,
	disabled,
}: ShopFormFieldsProps) => (
	<Stack
		gap={3}
		width="100%"
	>
		<Fieldset.Root size="lg">
			<div ref={titleFieldRef}>
				<ShopFormField
					label="Shop Name"
					error={titleError}
				>
					<ShopFormInput
						value={title}
						onChange={(e) =>
							onTitleChange(e.target.value)
						}
						disabled={disabled}
					/>
				</ShopFormField>
			</div>
			<ShopFormField
				label="Classification"
				error={classificationError}
			>
				<ShopFormInput
					value={classification}
					onChange={(e) =>
						onClassificationChange(e.target.value)
					}
					placeholder="e.g. Leather Bags, Cast Iron Cookware, etc."
					disabled={disabled}
				/>
			</ShopFormField>
			<ShopFormField
				label="Location"
				error={locationError}
			>
				<HStack width="100%">
					<CountrySelect
						value={country}
						onChange={onCountryChange}
					/>
					<ShopFormInput
						value={location}
						onChange={(e) =>
							onLocationChange(e.target.value)
						}
						placeholder="City or Region"
						disabled={disabled}
					/>
				</HStack>
			</ShopFormField>
		</Fieldset.Root>
		<FileUpload.Root
			accept="image/*"
			maxFiles={1}
			maxFileSize={MAX_IMAGE_SIZE_MB * 1_000_000}
			onFileChange={(details) => {
				const file = details.acceptedFiles[0];
				if (file) onImageSelect(file);
			}}
			onFileReject={(details) => {
				const isTooLarge = details.files.some((f) =>
					f.errors.includes('FILE_TOO_LARGE'),
				);
				if (isTooLarge) {
					toastError(
						`Image must be ${MAX_IMAGE_SIZE_MB} MB or smaller.`,
					);
				}
			}}
			gap={1.5}
		>
			<FileUpload.Label fontSize={18}>
				Banner Image
			</FileUpload.Label>
			<FileUpload.HiddenInput />
			<FileUpload.Trigger asChild>
				<Flex
					cursor="pointer"
					borderRadius="md"
					borderWidth={imagePreviewUrl ? 0 : 1}
					borderStyle="dashed"
					borderColor="gray.300"
					alignItems="center"
					justifyContent="center"
					width="100%"
					aspectRatio={5 / 2}
					position="relative"
					_hover={{ borderColor: 'gray.400' }}
				>
					{imagePreviewUrl ? (
						<Image
							src={imagePreviewUrl}
							width="100%"
							height="100%"
							objectFit="cover"
							opacity={isUploadingImage ? 0.5 : 1}
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
				</Flex>
			</FileUpload.Trigger>
		</FileUpload.Root>
	</Stack>
);
