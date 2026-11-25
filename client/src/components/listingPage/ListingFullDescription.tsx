import { Accordion } from '@chakra-ui/react';
import { AccordionTrigger } from '@client/components/misc/AccordionTrigger';
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
				<AccordionTrigger title={item.title} />
				<Accordion.ItemContent>
					<Accordion.ItemBody py={0}>
						<RichTextDisplay htmlString={item.richText} />
					</Accordion.ItemBody>
				</Accordion.ItemContent>
			</Accordion.Item>
		))}
	</Accordion.Root>
);
