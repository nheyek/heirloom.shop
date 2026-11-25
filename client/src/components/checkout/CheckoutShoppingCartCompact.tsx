import { Accordion, HStack, Icon } from '@chakra-ui/react';
import { OrderItemCard } from '@client/components/cards/OrderItemCard';
import {
	CART_CARD_BLEED,
	CHECKOUT_GAP,
} from '@client/components/checkout/checkoutLayout';
import { SubHeading } from '@client/components/textDisplay/SubHeading';
import { getOrderItemDisplayData } from '@client/domain/shoppingCart';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';
import { FaCaretDown } from 'react-icons/fa6';

export const CheckoutShoppingCartCompact = () => {
	const shoppingCart = useShoppingCart();

	return (
		<Accordion.Root
			variant="plain"
			collapsible
			size="lg"
		>
			<Accordion.Item value="cart">
				<Accordion.ItemTrigger
					position="relative"
					zIndex={1}
					p={0}
				>
					<SubHeading
						size="xl"
						flex={1}
					>
						Shopping Cart
					</SubHeading>
					<Accordion.ItemIndicator>
						<Icon
							as={FaCaretDown}
							color="black"
							w={22}
							h={22}
						/>
					</Accordion.ItemIndicator>
				</Accordion.ItemTrigger>
				<Accordion.ItemContent
					m={-CART_CARD_BLEED}
					p={CART_CARD_BLEED}
				>
					<Accordion.ItemBody mt={2}>
						<HStack
							gap={CHECKOUT_GAP}
							overflowX="scroll"
							m={-CART_CARD_BLEED}
							p={CART_CARD_BLEED}
							alignItems="flex-start"
						>
							{shoppingCart.items.map((item, index) => (
								<OrderItemCard
									key={index}
									item={getOrderItemDisplayData(
										item,
									)}
								/>
							))}
						</HStack>
					</Accordion.ItemBody>
				</Accordion.ItemContent>
			</Accordion.Item>
		</Accordion.Root>
	);
};
