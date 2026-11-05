import { Accordion, Icon, Text } from '@chakra-ui/react';
import { RichTextDisplay } from '@client/components/richText/RichTextDisplay';
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
					<Text
						flex="1"
						fontSize={24}
					>
						{item.title}
					</Text>
					<Accordion.ItemIndicator>
						<Icon
							as={FaCaretDown}
							color="black"
							w={22}
							h={22}
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
