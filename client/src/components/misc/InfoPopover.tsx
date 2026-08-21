import { Popover, Portal } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FaCircleInfo } from 'react-icons/fa6';

type Props = {
	children: ReactNode;
	maxWidth?: number;
	iconSize?: number;
};

export const InfoPopover = ({
	children,
	maxWidth = 300,
	iconSize = 18,
}: Props) => (
	<Popover.Root positioning={{ placement: 'top' }}>
		<Popover.Trigger
			pl={1}
			cursor="pointer"
		>
			<FaCircleInfo size={iconSize} />
		</Popover.Trigger>
		<Portal>
			<Popover.Positioner>
				<Popover.Content maxWidth={maxWidth}>
					<Popover.Arrow />
					<Popover.Body>{children}</Popover.Body>
				</Popover.Content>
			</Popover.Positioner>
		</Portal>
	</Popover.Root>
);
