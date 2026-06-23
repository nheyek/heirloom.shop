import {
	Button,
	CloseButton,
	Dialog,
	HStack,
	Stack,
} from '@chakra-ui/react';
import { FormField, FormInput } from '@client/components/input/FormField';
import { RichTextEditor } from '@client/components/richText/RichTextEditor';
import { ListingDescrSection } from '@client/hooks/useListingForm';
import { useEffect, useRef, useState } from 'react';

const EDITOR_KEY_NEW = 'new';

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '').trim();

type Props = {
	open: boolean;
	initial?: ListingDescrSection | null;
	existingTitles: string[];
	onClose: () => void;
	onConfirm: (section: ListingDescrSection) => void;
};

export const DescrSectionDialog = ({
	open,
	initial,
	existingTitles,
	onClose,
	onConfirm,
}: Props) => {
	const [title, setTitle] = useState('');
	const [titleError, setTitleError] = useState<string | null>(null);
	const [bodyError, setBodyError] = useState<string | null>(null);
	const richTextRef = useRef('');

	const isDirty = () =>
		title !== (initial?.title ?? '') ||
		richTextRef.current !== (initial?.richText ?? '');

	const handleClose = () => {
		if (isDirty()) {
			if (!window.confirm('Discard changes?')) return;
		}
		onClose();
	};

	const handleConfirm = () => {
		let valid = true;
		const trimmedTitle = title.trim();
		if (!trimmedTitle) {
			setTitleError('Title is required.');
			valid = false;
		} else if (existingTitles.some((t) => t.trim() === trimmedTitle)) {
			setTitleError('A section with this title already exists.');
			valid = false;
		} else {
			setTitleError(null);
		}
		if (!stripHtml(richTextRef.current)) {
			setBodyError('Body is required.');
			valid = false;
		} else {
			setBodyError(null);
		}
		if (!valid) return;
		onConfirm({ title: trimmedTitle, richText: richTextRef.current });
		onClose();
	};

	useEffect(() => {
		if (open) {
			setTitle(initial?.title ?? '');
			richTextRef.current = initial?.richText ?? '';
		} else {
			setTitle('');
			richTextRef.current = '';
			setTitleError(null);
			setBodyError(null);
		}
	}, [open]);

	return (
		<Dialog.Root
			open={open}
			onInteractOutside={(e) => {
				e.preventDefault();
				handleClose();
			}}
			onEscapeKeyDown={(e) => {
				e.preventDefault();
				handleClose();
			}}
			size="lg"
		>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title
							fontSize={24}
							fontWeight={500}
						>
							{initial ? 'Edit Section' : 'Add Section'}
						</Dialog.Title>
						<CloseButton
							position="absolute"
							top={3}
							right={3}
							onClick={handleClose}
						/>
					</Dialog.Header>
					<Dialog.Body
						pt={0}
						pb={3}
					>
						<Stack gap={3}>
							<FormField label="Title" error={titleError}>
								<FormInput
									value={title}
									onChange={(e) => {
										setTitle(e.target.value);
										const trimmed = e.target.value.trim();
										if (trimmed && !existingTitles.some((t) => t.trim() === trimmed)) setTitleError(null);
									}}
									placeholder="e.g. Materials"
								/>
							</FormField>
							<FormField label="Body" error={bodyError}>
								<RichTextEditor
									invalid={!!bodyError}
									key={open ? (initial?.title ?? EDITOR_KEY_NEW) : 'closed'}
									initialHtml={initial?.richText ?? ''}
									onChange={(html) => {
										richTextRef.current = html;
										if (stripHtml(html)) setBodyError(null);
									}}
									maxHeight={300}
								/>
							</FormField>
						</Stack>
					</Dialog.Body>
					<Dialog.Footer>
						<HStack gap={2}>
							<Button
								size="md"
								fontSize={18}
								variant="outline"
								onClick={handleClose}
							>
								Cancel
							</Button>
							<Button
								size="md"
								fontSize={18}
								onClick={handleConfirm}
							>
								{initial ? 'Save' : 'Add'}
							</Button>
						</HStack>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
};
