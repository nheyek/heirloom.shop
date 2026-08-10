import { Box, HStack, IconButton, Stack } from '@chakra-ui/react';
import { FieldError } from '@client/components/input/FieldError';
import { fieldErrorColor } from '@client/theme';
import Heading from '@tiptap/extension-heading';
import {
	EditorContent,
	useEditor,
	useEditorState,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
	FaBold,
	FaHeading,
	FaItalic,
	FaListOl,
	FaListUl,
	FaUnderline,
} from 'react-icons/fa';

type Props = {
	initialHtml?: string | null;
	onChange: (html: string) => void;
	maxHeight?: number | string;
	invalid?: boolean;
	error?: string | null;
	disabled?: boolean;
};

export const RichTextEditor = ({
	initialHtml,
	onChange,
	maxHeight,
	invalid,
	error,
	disabled,
}: Props) => {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({ heading: false }),
			Heading.extend({ marks: '' }).configure({
				levels: [1],
			}),
		],
		content: initialHtml ?? '',
		editable: !disabled,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
			// After deleting all content (e.g. Ctrl+A + Delete), ProseMirror can
			// leave the cursor at position 0 — outside any text block — which
			// disables formatting commands. Snap it back inside the paragraph.
			if (!editor.state.selection.$head.parent.isTextblock) {
				editor.commands.focus('start');
			}
		},
	});

	const {
		isBold,
		isItalic,
		isUnderline,
		isHeading,
		isBulletList,
		isOrderedList,
	} = useEditorState({
		editor,
		selector: (ctx) => {
			// Before the editor has actual focus, ProseMirror still
			// reports a selection (its unfocused default: position 0),
			// so isActive() would reflect whatever formatting sits at
			// the very start of the document rather than "nothing is
			// selected". Gate on isFocused so the toolbar stays neutral
			// until the user has a real cursor position.
			const isFocused = ctx.editor?.isFocused ?? false;
			return {
				isBold:
					isFocused &&
					(ctx.editor?.isActive('bold') ?? false),
				isItalic:
					isFocused &&
					(ctx.editor?.isActive('italic') ?? false),
				isUnderline:
					isFocused &&
					(ctx.editor?.isActive('underline') ?? false),
				isHeading:
					isFocused &&
					(ctx.editor?.isActive('heading', { level: 1 }) ??
						false),
				isBulletList:
					isFocused &&
					(ctx.editor?.isActive('bulletList') ?? false),
				isOrderedList:
					isFocused &&
					(ctx.editor?.isActive('orderedList') ?? false),
			};
		},
	});

	if (!editor) return null;

	const MenuButton = (
		active: boolean,
		onClick: () => void,
		icon: React.ReactNode,
		label: string,
		disabledButton?: boolean,
	) => (
		<IconButton
			key={label}
			size="sm"
			variant={active ? 'solid' : 'ghost'}
			onClick={onClick}
			disabled={disabledButton}
			tabIndex={-1}
		>
			{icon}
		</IconButton>
	);

	return (
		<Stack
			gap={1.5}
			width="100%"
		>
			<Box
				flex={1}
				borderWidth={1}
				borderColor={invalid ? fieldErrorColor : 'gray.200'}
				borderRadius="md"
				width="100%"
			>
				{/* Toolbar */}
				<HStack
					p={2}
					gap={2}
					borderBottomWidth={1}
					borderColor="gray.200"
				>
					{MenuButton(
						isHeading,
						() =>
							editor
								.chain()
								.focus()
								.toggleHeading({ level: 1 })
								.run(),
						<FaHeading size={13} />,
						'Heading',
					)}
					{MenuButton(
						isBold,
						() =>
							editor.chain().focus().toggleBold().run(),
						<FaBold size={13} />,
						'Bold',
						isHeading,
					)}
					{MenuButton(
						isItalic,
						() =>
							editor
								.chain()
								.focus()
								.toggleItalic()
								.run(),
						<FaItalic size={13} />,
						'Italic',
						isHeading,
					)}
					{MenuButton(
						isUnderline,
						() =>
							editor
								.chain()
								.focus()
								.toggleUnderline()
								.run(),
						<FaUnderline size={13} />,
						'Underline',
						isHeading,
					)}
					{MenuButton(
						isBulletList,
						() =>
							editor
								.chain()
								.focus()
								.toggleBulletList()
								.run(),
						<FaListUl size={13} />,
						'Bullet list',
					)}
					{MenuButton(
						isOrderedList,
						() =>
							editor
								.chain()
								.focus()
								.toggleOrderedList()
								.run(),
						<FaListOl size={13} />,
						'Ordered list',
					)}
				</HStack>
				<Box
					minHeight={150}
					maxHeight={maxHeight}
					overflow="scroll"
					cursor="text"
					onClick={(e) =>
						// A click that lands on the actual text is already
						// resolved to the right position by ProseMirror's own
						// DOM handling. A click on the surrounding padding
						// (e.target === this Box, not a descendant) never
						// reaches that handling, so focus() has nothing to
						// preserve and falls back to position 0 — send it to
						// the end instead, matching where a click in empty
						// space below the text should land.
						editor.commands.focus(
							e.target === e.currentTarget
								? 'end'
								: undefined,
						)
					}
					css={{
						'& .tiptap': {
							padding: 4,
							lineHeight: 1.25,
							fontSize: 18,
						},
						'& .tiptap p': {
							marginBottom: 2,
						},
						'& .tiptap h1': {
							fontSize: 22,
							fontWeight: 500,
							marginTop: 2,
							marginBottom: 1,
						},
						'& .tiptap ul, & .tiptap ol': {
							marginLeft: 5,
							listStyleType: 'disc',
						},
						'& .tiptap ol': {
							listStyleType: 'decimal',
						},
						'& .tiptap em': {
							fontStyle: 'italic',
						},
						'& .tiptap u': {
							textDecoration: 'underline',
						},
					}}
				>
					<EditorContent editor={editor} />
				</Box>
			</Box>
			{error && <FieldError>{error}</FieldError>}
		</Stack>
	);
};
