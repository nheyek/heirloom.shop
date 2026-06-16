import {
	Button,
	CloseButton,
	Dialog,
	Field,
	HStack,
	Input,
	Stack,
} from '@chakra-ui/react';
import { RichTextEditor } from '@client/components/richText/RichTextEditor';
import { DetailSection } from '@client/hooks/useListingForm';
import { useEffect, useRef, useState } from 'react';

type Props = {
	open: boolean;
	initial?: DetailSection | null;
	onClose: () => void;
	onConfirm: (section: Omit<DetailSection, 'id'>) => void;
};

export const DetailSectionDialog = ({
	open,
	initial,
	onClose,
	onConfirm,
}: Props) => {
	const [title, setTitle] = useState('');
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
		onConfirm({ title, richText: richTextRef.current });
		onClose();
	};

	useEffect(() => {
		if (open) {
			setTitle(initial?.title ?? '');
			richTextRef.current = initial?.richText ?? '';
		} else {
			setTitle('');
			richTextRef.current = '';
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
							<Field.Root>
								<Field.Label
									fontSize={18}
									fontWeight={500}
								>
									Title
								</Field.Label>
								<Input
									size="lg"
									fontSize={18}
									value={title}
									onChange={(e) =>
										setTitle(e.target.value)
									}
									placeholder="e.g. Materials"
								/>
							</Field.Root>
							<Field.Root>
								<Field.Label
									fontSize={18}
									fontWeight={500}
								>
									Body
								</Field.Label>
								<RichTextEditor
									key={
										open
											? (initial?.id ?? 'new')
											: 'closed'
									}
									initialHtml={
										initial?.richText ?? ''
									}
									onChange={(html) => {
										richTextRef.current = html;
									}}
									maxHeight={300}
								/>
							</Field.Root>
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
