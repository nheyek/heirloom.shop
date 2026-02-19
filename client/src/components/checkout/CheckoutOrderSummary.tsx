import { Collapsible, HStack, Span } from '@chakra-ui/react';
import { FaChevronDown } from 'react-icons/fa';
import { FONT_DISPLAY_SANS } from '../../theme';
import { ShoppingCartContents } from '../shoppingCart/ShoppingCartContents';

type Props = {
	truncated: boolean;
};

export const CheckoutOrderSummary = (props: Props) => {
	if (props.truncated) {
		return (
			<Collapsible.Root>
				<Collapsible.Trigger
					fontSize={20}
					fontWeight={500}
					fontFamily={FONT_DISPLAY_SANS}
					cursor="button"
				>
					<HStack gap={3}>
						<Span mb={0.5}>order summary</Span>
						<Collapsible.Indicator
							_open={{ transform: 'rotate(180deg)' }}
						>
							<FaChevronDown size={15} />
						</Collapsible.Indicator>
					</HStack>
				</Collapsible.Trigger>
				<Collapsible.Content
					my={2.5}
					overflow="visible"
				>
					<HStack
						gap={5}
						overflowX="scroll"
						m={-5}
						p={5}
					>
						<ShoppingCartContents />
					</HStack>
				</Collapsible.Content>
			</Collapsible.Root>
		);
	}
	return <ShoppingCartContents />;
};
