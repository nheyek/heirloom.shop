import { Box, HStack, IconButton } from '@chakra-ui/react';
import { FONT_DISPLAY_SANS } from '@client/theme';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
	FaBold,
	FaItalic,
	FaListOl,
	FaListUl,
} from 'react-icons/fa';
import { MdTitle } from 'react-icons/md';

type Props = {
	initialHtml?: string | null;
	onChange: (html: string) => void;
};

export const RichTextEditor = ({ initialHtml, onChange }: Props) => {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: { levels: [1] },
				// disable formats not in RichTextDisplay
				blockquote: false,
				code: false,
				codeBlock: false,
				horizontalRule: false,
				strike: false,
			}),
		],
		content: initialHtml ?? '',
		onUpdate: ({ editor }) => onChange(editor.getHTML()),
	});

	if (!editor) return null;

	const btn = (
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
				gap={0}
				px={1}
				py={1}
				borderBottomWidth={1}
				borderColor="gray.200"
			>
				{btn(
					editor.isActive('heading', { level: 1 }),
					() =>
						editor
							.chain()
							.focus()
							.toggleHeading({ level: 1 })
							.run(),
					<MdTitle size={18} />,
					'Heading',
				)}
				{btn(
					editor.isActive('bold'),
					() => editor.chain().focus().toggleBold().run(),
					<FaBold size={13} />,
					'Bold',
				)}
				{btn(
					editor.isActive('italic'),
					() => editor.chain().focus().toggleItalic().run(),
					<FaItalic size={13} />,
					'Italic',
				)}
				{btn(
					editor.isActive('bulletList'),
					() =>
						editor.chain().focus().toggleBulletList().run(),
					<FaListUl size={13} />,
					'Bullet list',
				)}
				{btn(
					editor.isActive('orderedList'),
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

			{/* Editor area */}
			<Box
				css={{
					'& .tiptap': {
						outline: 'none',
						padding: '12px 16px',
						minHeight: '300px',
						fontFamily: FONT_DISPLAY_SANS,
						fontSize: '16px',
						lineHeight: '1.6',
					},
					'& .tiptap p': {
						fontSize: 18,
						lineHeight: 'base',
						marginBottom: 2,
					},
					'& .tiptap h1': {
						fontSize: 22,
						marginTop: 4,
						marginBottom: 2,
						fontWeight: 'bold',
					},
					'& .tiptap ul, & .tiptap ol': {
						marginLeft: '1.5rem',
						marginBottom: '1rem',
						listStyleType: 'disc',
					},
					'& .tiptap li': {
						marginBottom: '0.5rem',
					},
					'& .tiptap ol': {
						listStyleType: 'decimal',
					},
					'& .tiptap p.is-editor-empty:first-child::before': {
						content: 'attr(data-placeholder)',
						color: 'var(--chakra-colors-gray-400)',
						pointerEvents: 'none',
						float: 'left',
						height: 0,
					},
				}}
			>
				<EditorContent editor={editor} />
			</Box>
		</Box>
	);
};
