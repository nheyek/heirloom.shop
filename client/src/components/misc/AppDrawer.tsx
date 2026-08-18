import { Drawer, Icon, IconButton } from '@chakra-ui/react';
import { displayFontFamily } from '@client/theme';
import { ReactNode } from 'react';
import { MdClose } from 'react-icons/md';

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
		size="sm"
	>
		<Drawer.Backdrop />
		<Drawer.Positioner>
			<Drawer.Content>
				<Drawer.Header p={5}>
					<Drawer.Title
						fontSize={32}
						fontWeight={500}
						fontFamily={displayFontFamily}
					>
						{title}
					</Drawer.Title>
					<Drawer.CloseTrigger asChild>
						<IconButton
							borderRadius="full"
							variant="ghost"
							w={10}
							h={10}
						>
							<Icon
								h={7}
								w={7}
							>
								<MdClose />
							</Icon>
						</IconButton>
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
