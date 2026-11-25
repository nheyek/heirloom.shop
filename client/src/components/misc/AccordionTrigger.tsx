import { Accordion, Icon } from '@chakra-ui/react';
import { SubHeading } from '@client/components/textDisplay/SubHeading';
import { ACCORDION_ICON_SIZE } from '@client/constants';
import { ReactNode } from 'react';
import { FaCaretDown } from 'react-icons/fa6';

type Props = Accordion.ItemTriggerProps & {
	title: ReactNode;
};

export const AccordionTrigger = ({ title, ...props }: Props) => (
	<Accordion.ItemTrigger {...props}>
		<SubHeading
			size="xl"
			flex={1}
		>
			{title}
		</SubHeading>
		<Accordion.ItemIndicator>
			<Icon
				as={FaCaretDown}
				color="black"
				w={ACCORDION_ICON_SIZE}
				h={ACCORDION_ICON_SIZE}
			/>
		</Accordion.ItemIndicator>
	</Accordion.ItemTrigger>
);
