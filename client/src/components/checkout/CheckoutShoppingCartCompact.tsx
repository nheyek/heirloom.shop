import { Collapsible, HStack, Span } from '@chakra-ui/react';
import { FaChevronDown, FaShoppingCart } from 'react-icons/fa';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';
import { FONT_DISPLAY_SANS } from '@client/theme';
import { ShoppingCartCard } from '@client/components/shoppingCart/ShoppingCartCard';

export const CheckoutShoppingCartCompact = () => {
	const shoppingCart = useShoppingCart();

	return (
		<Collapsible.Root>
			<Collapsible.Trigger
				fontSize={20}
				fontWeight={500}
				fontFamily={FONT_DISPLAY_SANS}
				cursor="button"
			>
				<HStack gap={3}>
					<FaShoppingCart size={22} />
					<Span
						fontSize={20}
						marginTop={0.5}
					>
						Shopping Cart
					</Span>
					<Collapsible.Indicator
						_open={{ transform: 'rotate(180deg)' }}
					>
						<FaChevronDown size={14} />
					</Collapsible.Indicator>
				</HStack>
			</Collapsible.Trigger>
			<Collapsible.Content
				mt={4}
				mb={2}
				overflow="visible"
			>
				<HStack
					gap={5}
					overflowX="scroll"
					m={-5}
					p={5}
				>
					{shoppingCart.items.map((item, index) => (
						<ShoppingCartCard
							key={index}
							item={item}
							hideButtons
							cardProps={{ minW: 250, maxW: 300 }}
						/>
					))}
				</HStack>
			</Collapsible.Content>
		</Collapsible.Root>
	);
};
