import { Collapsible, HStack } from '@chakra-ui/react';
import { FaChevronRight } from 'react-icons/fa';

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
			cursor="pointer"
			disabled={disabled}
		>
			<HStack gap={2}>
				<Collapsible.Indicator
					transition="transform 0.2s"
					_open={{
						transform: 'rotate(90deg)',
					}}
				>
					<FaChevronRight size={15} />
				</Collapsible.Indicator>
				More Actions
			</HStack>
		</Collapsible.Trigger>
		<Collapsible.Content pt={2}>{children}</Collapsible.Content>
	</Collapsible.Root>
);
