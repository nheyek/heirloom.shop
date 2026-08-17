import { Dialog, Icon, IconButton, Portal } from '@chakra-ui/react';
import { RichTextDisplay } from '@client/components/richText/RichTextDisplay';
import { MdClose } from 'react-icons/md';

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
						<Dialog.Title
							fontSize={32}
							fontWeight={500}
						>
							{title}
						</Dialog.Title>
						<Dialog.CloseTrigger asChild>
							<IconButton
								variant="ghost"
								w={10}
								h={10}
							>
								<Icon
									h={6}
									w={6}
								>
									<MdClose />
								</Icon>
							</IconButton>
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
