import {
	Box,
	Button,
	Fieldset,
	HStack,
	Image,
	Skeleton,
	Stack,
	Text,
} from '@chakra-ui/react';
import { CountrySelect } from '@client/components/input/CountrySelect';
import {
	FormField,
	FormInput,
} from '@client/components/input/FormField';
import { ImageDropzone } from '@client/components/input/ImageDropzone';
import { CountryCode } from '@client/constants';
import { FaExchangeAlt } from 'react-icons/fa';

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
		{imagePreviewUrl ? (
			<Box>
				<Text
					fontSize={18}
					fontWeight={500}
					mb={1.5}
				>
					Banner Image
				</Text>
				<Skeleton
					loading={isUploadingImage}
					borderRadius="md"
					mb={2}
				>
					<Image
						src={imagePreviewUrl}
						width="100%"
						aspectRatio={5 / 2}
						objectFit="cover"
						borderRadius="md"
						display="block"
					/>
				</Skeleton>
				<ImageDropzone
					onAdd={([file]) => onImageSelect(file)}
					trigger={
						<Button
							size="md"
							fontSize={18}
							variant="subtle"
							disabled={disabled}
						>
							<FaExchangeAlt />
							Replace
						</Button>
					}
				/>
			</Box>
		) : (
			<ImageDropzone
				onAdd={([file]) => onImageSelect(file)}
				label="Banner Image"
				width="100%"
			/>
		)}
	</Stack>
);
