import { CloseButton, Dialog } from '@chakra-ui/react';
import { ReactNode } from 'react';

type AppDialogProps = Omit<
	Dialog.RootProps,
	'onInteractOutside' | 'onEscapeKeyDown'
> & {
	title: string;
	open: boolean;
	onCancel: () => void;
	pending?: boolean;
	hideCloseButton?: boolean;
	footer?: ReactNode;
	contentProps?: Dialog.ContentProps;
	titleProps?: Dialog.TitleProps;
};

export const AppDialog = ({
	title,
	open,
	onCancel,
	pending = false,
	hideCloseButton = false,
	children,
	footer,
	contentProps,
	titleProps,
	...rootProps
}: AppDialogProps) => (
	<Dialog.Root
		{...rootProps}
		open={open}
		onInteractOutside={(e) => {
			e.preventDefault();
			if (!pending) onCancel();
		}}
		onEscapeKeyDown={(e) => {
			e.preventDefault();
			if (!pending) onCancel();
		}}
	>
		<Dialog.Backdrop />
		<Dialog.Positioner>
			<Dialog.Content {...contentProps}>
				<Dialog.Header>
					<Dialog.Title
						fontSize={22}
						fontWeight={500}
						marginRight={10}
						{...titleProps}
					>
						{title}
					</Dialog.Title>
					{!hideCloseButton && (
						<CloseButton
							position="absolute"
							top={3}
							right={3}
							onClick={onCancel}
							disabled={pending}
						/>
					)}
				</Dialog.Header>
				<Dialog.Body
					pt={0}
					pb={3}
				>
					{children}
				</Dialog.Body>
				{footer && <Dialog.Footer>{footer}</Dialog.Footer>}
			</Dialog.Content>
		</Dialog.Positioner>
	</Dialog.Root>
);
