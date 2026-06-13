import {
	Fieldset,
	FileUpload,
	Flex,
	HStack,
	Image,
	Skeleton,
	Stack,
	Text,
} from '@chakra-ui/react';
import { FormField, FormInput } from '@client/components/input/FormField';
import { CountrySelect } from '@client/components/input/CountrySelect';
import { CountryCode, MAX_IMAGE_SIZE_MB } from '@client/constants';
import { toastError } from '@client/toaster';
import { FaImage } from 'react-icons/fa';

export { FormField as ShopFormField, FormInput as ShopFormInput };

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

	gap?: number;
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
	gap = 3,
	disabled,
}: ShopFormFieldsProps) => (
	<Stack gap={gap}>
		<Fieldset.Root>
			<Stack gap={gap}>
				<div ref={titleFieldRef}>
					<FormField
						label="Shop Name"
						error={titleError}
					>
						<FormInput
							value={title}
							onChange={(e) =>
								onTitleChange(e.target.value)
							}
							disabled={disabled}
						/>
					</FormField>
				</div>
				<FormField
					label="Classification"
					error={classificationError}
				>
					<FormInput
						value={classification}
						onChange={(e) =>
							onClassificationChange(e.target.value)
						}
						placeholder="e.g. Leather Bags, Cast Iron Cookware, etc."
						disabled={disabled}
					/>
				</FormField>
				<FormField
					label="Location"
					error={locationError}
				>
					<HStack width="100%">
						<CountrySelect
							value={country}
							onChange={onCountryChange}
						/>
						<FormInput
							value={location}
							onChange={(e) =>
								onLocationChange(e.target.value)
							}
							placeholder="City or Region"
							disabled={disabled}
						/>
					</HStack>
				</FormField>
			</Stack>
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
					alignItems="center"
					justifyContent="center"
					width="100%"
					cursor="pointer"
					borderRadius="md"
					overflow="hidden"
					borderWidth={imagePreviewUrl ? 0 : 1}
					borderStyle="dashed"
					borderColor="gray.300"
					position="relative"
					_hover={{ borderColor: 'gray.400' }}
				>
					{imagePreviewUrl ? (
						<Skeleton
							loading={isUploadingImage}
							width="100%"
							aspectRatio={5 / 2}
							borderRadius={0}
						>
							<Image
								src={imagePreviewUrl}
								height="100%"
								width="100%"
								objectFit="cover"
							/>
						</Skeleton>
					) : (
						<Stack
							alignItems="center"
							justifyContent="center"
							gap={2}
							color="gray.500"
							height={150}
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
