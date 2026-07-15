import { Stack } from '@chakra-ui/react';
import {
	FormField,
	FormInput,
} from '@client/components/input/FormField';
import { ListingDescrSection } from '@client/components/listingForm/useListingForm';
import { AppDialog } from '@client/components/misc/AppDialog';
import { DialogConfirmFooter } from '@client/components/misc/DialogConfirmFooter';
import { RichTextEditor } from '@client/components/richText/RichTextEditor';
import { validateDescrSectionEntry } from '@heirloom/common/validation/listing';
import {
	stripHtml,
	ValidationField,
} from '@heirloom/common/validation/shared';
import { useEffect, useRef, useState } from 'react';

const EDITOR_KEY_NEW = 'new';

type Props = {
	open: boolean;
	initial?: ListingDescrSection | null;
	existingTitles: string[];
	onClose: () => void;
	onConfirm: (section: ListingDescrSection) => void;
	disabled?: boolean;
};

export const DescrSectionDialog = ({
	open,
	initial,
	existingTitles,
	onClose,
	onConfirm,
	disabled,
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
		const errors = validateDescrSectionEntry(
			{ title, richText: richTextRef.current },
			existingTitles,
		);
		setTitleError(
			errors.find(
				(e) => e.field === ValidationField.DescrSectionTitle,
			)?.message ?? null,
		);
		setBodyError(
			errors.find(
				(e) => e.field === ValidationField.DescrSectionBody,
			)?.message ?? null,
		);
		if (errors.length > 0) return;

		onConfirm({
			title: title.trim(),
			richText: richTextRef.current,
		});
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
		<AppDialog
			title={initial ? 'Edit Section' : 'Add Section'}
			open={open}
			onCancel={handleClose}
			size="lg"
			footer={
				<DialogConfirmFooter
					onCancel={handleClose}
					onConfirm={handleConfirm}
					confirmLabel={initial ? 'Save' : 'Add'}
				/>
			}
		>
			<Stack gap={3}>
				<FormField
					label="Title"
					error={titleError}
					required
				>
					<FormInput
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
							const trimmed = e.target.value.trim();
							if (
								trimmed &&
								!existingTitles.some(
									(t) => t.trim() === trimmed,
								)
							)
								setTitleError(null);
						}}
						placeholder="e.g. Materials"
					/>
				</FormField>
				<FormField
					label="Body"
					error={bodyError}
					required
				>
					<RichTextEditor
						invalid={!!bodyError}
						key={
							open
								? (initial?.title ?? EDITOR_KEY_NEW)
								: 'closed'
						}
						initialHtml={initial?.richText ?? ''}
						onChange={(html) => {
							richTextRef.current = html;
							if (stripHtml(html)) setBodyError(null);
						}}
						maxHeight={300}
						disabled={disabled}
					/>
				</FormField>
			</Stack>
		</AppDialog>
	);
};
