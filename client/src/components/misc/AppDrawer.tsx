import { CloseButton, Drawer } from '@chakra-ui/react';
import { ReactNode } from 'react';

type AppDrawerProps = {
	title: string;
	isOpen: boolean;
	onClose: () => void;
	children?: ReactNode;
	footer?: ReactNode;
};

export const AppDrawer = ({
	title,
	isOpen,
	onClose,
	children,
	footer,
}: AppDrawerProps) => (
	<Drawer.Root
		open={isOpen}
		onOpenChange={(e) => !e.open && onClose()}
		placement="end"
	>
		<Drawer.Backdrop />
		<Drawer.Positioner>
			<Drawer.Content>
				<Drawer.Header>
					<Drawer.Title>{title}</Drawer.Title>
					<Drawer.CloseTrigger asChild>
						<CloseButton />
					</Drawer.CloseTrigger>
				</Drawer.Header>

				<Drawer.Body
					display="flex"
					flexDir="column"
					pt={0}
					pb={5}
				>
					{children}
				</Drawer.Body>
				{footer && (
					<Drawer.Footer p={4}>{footer}</Drawer.Footer>
				)}
			</Drawer.Content>
		</Drawer.Positioner>
	</Drawer.Root>
);
