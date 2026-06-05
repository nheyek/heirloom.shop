import { Box, HStack, IconButton } from '@chakra-ui/react';
import { FONT_DISPLAY_SANS } from '@client/theme';
import {
	EditorContent,
	useEditor,
	useEditorState,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FaBold, FaListOl, FaListUl } from 'react-icons/fa';

type Props = {
	initialHtml?: string | null;
	onChange: (html: string) => void;
};

export const RichTextEditor = ({ initialHtml, onChange }: Props) => {
	const editor = useEditor({
		extensions: [StarterKit],
		content: initialHtml ?? '',
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

	const { isBold, isBulletList, isOrderedList } = useEditorState({
		editor,
		selector: (ctx) => ({
			isBold: ctx.editor?.isActive('bold') ?? false,
			isBulletList: ctx.editor?.isActive('bulletList') ?? false,
			isOrderedList: ctx.editor?.isActive('orderedList') ?? false,
		}),
	});

	if (!editor) return null;

	const MenuButton = (
		active: boolean,
		onClick: () => void,
		icon: React.ReactNode,
		label: string,
	) => (
		<IconButton
			key={label}
			aria-label={label}
			size="sm"
			variant={active ? 'solid' : 'ghost'}
			onClick={onClick}
		>
			{icon}
		</IconButton>
	);

	return (
		<Box
			borderWidth={1}
			borderColor="gray.200"
			borderRadius="md"
			overflow="hidden"
			width="100%"
			fontFamily={FONT_DISPLAY_SANS}
		>
			{/* Toolbar */}
			<HStack
				p={2}
				gap={2}
				borderBottomWidth={1}
				borderColor="gray.200"
			>
				{MenuButton(
					isBold,
					() => editor.chain().focus().toggleBold().run(),
					<FaBold size={13} />,
					'Bold',
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
				css={{
					'& .tiptap': {
						padding: 4,
						minHeight: 300,
						fontFamily: FONT_DISPLAY_SANS,
						lineHeight: 1.25,
						fontSize: 18,
					},
					'& .tiptap p': {
						marginBottom: 2,
					},
					'& .tiptap ul, & .tiptap ol': {
						marginLeft: 5,
						listStyleType: 'disc',
					},
					'& .tiptap li': {
						marginBottom: 0.5,
					},
					'& .tiptap ol': {
						listStyleType: 'decimal',
					},
				}}
			>
				<EditorContent editor={editor} />
			</Box>
		</Box>
	);
};
