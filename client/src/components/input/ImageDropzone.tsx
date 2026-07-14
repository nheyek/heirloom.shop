import { FileUpload, Stack } from '@chakra-ui/react';
import { MAX_IMAGE_SIZE_MB } from '@client/constants';
import { toastError } from '@client/toaster';
import { FaImage } from 'react-icons/fa';

type Props = {
	onAdd: (files: File[]) => void;
	maxFiles?: number;
	disabled?: boolean;
	label?: string;
	trigger?: React.ReactNode;
	[key: string]: unknown;
};

export const ImageDropzone = ({
	onAdd,
	maxFiles = 1,
	disabled,
	label,
	trigger,
	...dropzoneProps
}: Props) => (
	<FileUpload.Root
		accept="image/*"
		maxFiles={maxFiles}
		maxFileSize={MAX_IMAGE_SIZE_MB * 1_000_000}
		onFileChange={(details) => {
			if (details.acceptedFiles.length > 0)
				onAdd(details.acceptedFiles);
		}}
		onFileReject={(details) => {
			if (
				details.files.some((f) =>
					f.errors.includes('FILE_TOO_LARGE'),
				)
			) {
				toastError(
					`Images must be ${MAX_IMAGE_SIZE_MB} MB or smaller.`,
				);
			}
		}}
		disabled={disabled}
		gap={1.5}
	>
		<FileUpload.HiddenInput />
		{label && (
			<FileUpload.Label fontSize={18}>{label}</FileUpload.Label>
		)}
		{trigger ? (
			<FileUpload.Trigger asChild>{trigger}</FileUpload.Trigger>
		) : (
			<FileUpload.Dropzone
				alignItems="center"
				justifyContent="center"
				cursor={disabled ? 'not-allowed' : 'pointer'}
				borderRadius="md"
				borderWidth={1}
				borderStyle="dashed"
				borderColor="gray.300"
				_hover={disabled ? {} : { borderColor: 'gray.400' }}
				{...dropzoneProps}
			>
				<Stack
					alignItems="center"
					justifyContent="center"
					gap={2}
					color="fg.muted"
					fontSize={20}
				>
					<FaImage size={30} />
					Drop or click to upload
				</Stack>
			</FileUpload.Dropzone>
		)}
	</FileUpload.Root>
);
