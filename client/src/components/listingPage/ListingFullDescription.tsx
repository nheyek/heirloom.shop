import { Accordion, Text } from '@chakra-ui/react';
import { RichTextDisplay } from '@client/components/richText/RichTextDisplay';
import { ListingFullDescr } from '@heirloom/common/contract';

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
						fontSize={20}
					>
						{item.title}
					</Text>
					<Accordion.ItemIndicator />
				</Accordion.ItemTrigger>
				<Accordion.ItemContent>
					<Accordion.ItemBody
						pt={0}
						pb={2}
					>
						<RichTextDisplay htmlString={item.richText} />
					</Accordion.ItemBody>
				</Accordion.ItemContent>
			</Accordion.Item>
		))}
	</Accordion.Root>
);
