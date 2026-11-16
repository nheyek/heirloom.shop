import { CloseButton, Dialog, Portal } from '@chakra-ui/react';
import { RichTextDisplay } from '@client/components/richText/RichTextDisplay';

type Props = {
	title: string;
	open: boolean;
	onClose: () => void;
	htmlString: string;
};

export const RichTextDialog = ({
	title,
	open,
	onClose,
	htmlString,
}: Props) => (
	<Dialog.Root
		open={open}
		onOpenChange={(e) => !e.open && onClose()}
		scrollBehavior="inside"
		size={{ base: 'full', md: 'lg' }}
	>
		<Portal>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>{title}</Dialog.Title>
						<Dialog.CloseTrigger asChild>
							<CloseButton />
						</Dialog.CloseTrigger>
					</Dialog.Header>
					<Dialog.Body pt={0}>
						<RichTextDisplay htmlString={htmlString} />
					</Dialog.Body>
				</Dialog.Content>
			</Dialog.Positioner>
		</Portal>
	</Dialog.Root>
);
