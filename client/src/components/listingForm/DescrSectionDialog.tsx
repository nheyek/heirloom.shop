import { Stack } from '@chakra-ui/react';
import {
	FormField,
	FormInput,
} from '@client/components/input/FormField';
import { ListingDescrSection } from '@client/components/listingForm/useListingForm';
import { RichTextEditor } from '@client/components/richText/RichTextEditor';
import { AppDialog } from '@client/components/util/AppDialog';
import { DialogConfirmFooter } from '@client/components/util/DialogConfirmFooter';
import { LISTING_LIMITS } from '@heirloom/common/constants';
import { useEffect, useRef, useState } from 'react';

const EDITOR_KEY_NEW = 'new';

const stripHtml = (html: string) =>
	html.replace(/<[^>]*>/g, '').trim();

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
		let valid = true;
		const trimmedTitle = title.trim();
		if (!trimmedTitle) {
			setTitleError('Title is required.');
			valid = false;
		} else if (trimmedTitle.length > LISTING_LIMITS.maxNameLength) {
			setTitleError(`Title must be ${LISTING_LIMITS.maxNameLength} characters or fewer.`);
			valid = false;
		} else if (
			existingTitles.some((t) => t.trim() === trimmedTitle)
		) {
			setTitleError('A section with this title already exists.');
			valid = false;
		} else {
			setTitleError(null);
		}
		const strippedBody = stripHtml(richTextRef.current);
		if (!strippedBody) {
			setBodyError('Body is required.');
			valid = false;
		} else if (strippedBody.length > LISTING_LIMITS.maxDescrSectionBodyChars) {
			setBodyError(`Body must be ${LISTING_LIMITS.maxDescrSectionBodyChars.toLocaleString()} characters or fewer.`);
			valid = false;
		} else {
			setBodyError(null);
		}
		if (!valid) return;
		onConfirm({
			title: trimmedTitle,
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
