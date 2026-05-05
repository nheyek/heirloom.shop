import {
	Drawer,
	Icon,
	IconButton,
} from '@chakra-ui/react';
import { FONT_DECORATIVE } from '@client/theme';
import { ReactNode } from 'react';
import { MdClose } from 'react-icons/md';

type AppDrawerProps = {
	title: string;
	isOpen: boolean;
	onClose: () => void;
	children?: ReactNode;
};

export const AppDrawer = ({
	title,
	isOpen,
	onClose,
	children,
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
						fontFamily={FONT_DECORATIVE}
					>
						{title}
					</Drawer.Title>
					<Drawer.CloseTrigger asChild>
						<IconButton
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
					pb={5}
				>
					{children}
				</Drawer.Body>
			</Drawer.Content>
		</Drawer.Positioner>
	</Drawer.Root>
);
