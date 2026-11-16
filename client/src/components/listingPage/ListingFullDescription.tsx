import { Accordion, Icon } from '@chakra-ui/react';
import { SubHeading } from '@client/components/checkout/SubHeading';
import { RichTextDisplay } from '@client/components/richText/RichTextDisplay';
import { ACCORDION_ICON_SIZE } from '@client/constants';
import { ListingFullDescr } from '@heirloom/common/contract';
import { FaCaretDown } from 'react-icons/fa6';

type Props = {
	fullDescr?: ListingFullDescr;
};

export const ListingFullDescription = ({ fullDescr }: Props) => (
	<Accordion.Root
		variant="plain"
		collapsible
		multiple
		size="lg"
		defaultValue={fullDescr?.length ? ['0'] : undefined}
	>
		{fullDescr?.map((item, index) => (
			<Accordion.Item
				key={index}
				value={index.toString()}
			>
				<Accordion.ItemTrigger>
					<SubHeading flex={1}>{item.title}</SubHeading>

					<Accordion.ItemIndicator>
						<Icon
							as={FaCaretDown}
							color="black"
							w={ACCORDION_ICON_SIZE}
							h={ACCORDION_ICON_SIZE}
						/>
					</Accordion.ItemIndicator>
				</Accordion.ItemTrigger>
				<Accordion.ItemContent>
					<Accordion.ItemBody py={0}>
						<RichTextDisplay htmlString={item.richText} />
					</Accordion.ItemBody>
				</Accordion.ItemContent>
			</Accordion.Item>
		))}
	</Accordion.Root>
);
