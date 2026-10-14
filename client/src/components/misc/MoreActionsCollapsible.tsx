import { Collapsible, HStack } from '@chakra-ui/react';
import { FaCaretDown } from 'react-icons/fa6';

type Props = {
	disabled?: boolean;
	children: React.ReactNode;
};

export const MoreActionsCollapsible = ({
	disabled,
	children,
}: Props) => (
	<Collapsible.Root disabled={disabled}>
		<Collapsible.Trigger
			fontSize={20}
			fontWeight={500}
			cursor="pointer"
			disabled={disabled}
		>
			<HStack>
				More Actions
				<Collapsible.Indicator
					transition="transform 0.2s"
					_open={{
						transform: 'rotate(-90deg)',
					}}
				>
					<FaCaretDown size={18} />
				</Collapsible.Indicator>
			</HStack>
		</Collapsible.Trigger>
		<Collapsible.Content pt={2}>{children}</Collapsible.Content>
	</Collapsible.Root>
);
