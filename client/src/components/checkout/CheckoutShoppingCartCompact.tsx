import { Accordion, HStack } from '@chakra-ui/react';
import { AccordionTrigger } from '@client/components/misc/AccordionTrigger';
import { OrderItemCard } from '@client/components/cards/OrderItemCard';
import {
	CART_CARD_BLEED,
	CHECKOUT_GAP,
} from '@client/components/checkout/checkoutLayout';
import { getOrderItemDisplayData } from '@client/domain/shoppingCart';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';

export const CheckoutShoppingCartCompact = () => {
	const shoppingCart = useShoppingCart();

	return (
		<Accordion.Root
			variant="plain"
			collapsible
			size="lg"
		>
			<Accordion.Item value="cart">
				<AccordionTrigger
					title="Shopping Cart"
					position="relative"
					zIndex={1}
					p={0}
				/>
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
