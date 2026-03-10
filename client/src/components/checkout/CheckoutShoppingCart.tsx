import {
	Carousel,
	HStack,
	IconButton,
	Stack,
} from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { useShoppingCart } from '../../providers/ShoppingCartProvider';
import { ShoppingCartCard } from '../shoppingCart/ShoppingCartCard';
import { ShoppingCartSummary } from '../shoppingCart/ShoppingCartSummary';
import { CheckoutHeading } from './CheckoutHeading';

export const CheckoutShoppingCart = () => {
	const shoppingCart = useShoppingCart();

	return (
		<Stack gap={6}>
			<Carousel.Root
				slideCount={shoppingCart.items.length}
				slidesPerPage={1}
				gap={3}
			>
				<HStack justify="space-between">
					<CheckoutHeading
						Icon={() => <FaShoppingCart size={24} />}
					>
						{`Cart (${shoppingCart.itemQuantityTotal})`}
					</CheckoutHeading>

					<HStack>
						<Carousel.PrevTrigger asChild>
							<IconButton
								size="xs"
								variant="subtle"
							>
								<LuChevronLeft />
							</IconButton>
						</Carousel.PrevTrigger>
						<Carousel.NextTrigger asChild>
							<IconButton
								size="xs"
								variant="subtle"
							>
								<LuChevronRight />
							</IconButton>
						</Carousel.NextTrigger>
					</HStack>
				</HStack>
				<Carousel.ItemGroup
					m={-5}
					pb={1}
				>
					{shoppingCart.items.map((item, index) => (
						<Carousel.Item
							key={`${item.listingData.id}-${JSON.stringify(item.selectedOptions)}`}
							index={index}
							p={5}
						>
							<ShoppingCartCard
								item={item}
								cardProps={{
									minW: 250,
									height: '100%',
								}}
								hideButtons
							/>
						</Carousel.Item>
					))}
				</Carousel.ItemGroup>
			</Carousel.Root>

			<ShoppingCartSummary pendingMessage="Enter shipping address" />
		</Stack>
	);
};
