import {
	Carousel,
	HStack,
	IconButton,
	Skeleton,
} from '@chakra-ui/react';
import { CheckoutHeading } from '@client/components/checkout/CheckoutHeading';
import { ShoppingCartCard } from '@client/components/shoppingCart/ShoppingCartCard';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';
import { FaShoppingCart } from 'react-icons/fa';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

export const CheckoutShoppingCart = () => {
	const shoppingCart = useShoppingCart();
	const slideCount = shoppingCart.cartLoading
		? shoppingCart.pendingItemCount
		: shoppingCart.items.length;

	return (
		<Carousel.Root
			slideCount={slideCount}
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
				{shoppingCart.cartLoading
					? Array.from({
							length: shoppingCart.pendingItemCount,
						}).map((_, index) => (
							<Carousel.Item
								key={index}
								index={index}
								p={5}
							>
								<Skeleton
									height={300}
									width="100%"
									borderRadius="md"
								/>
							</Carousel.Item>
						))
					: shoppingCart.items.map((item, index) => (
							<Carousel.Item
								key={`${item.listingData.id}-${JSON.stringify(item.selectedOptions)}`}
								index={index}
								p={5}
							>
								<ShoppingCartCard
									item={item}
									cardProps={{ minW: 250 }}
									hideButtons
								/>
							</Carousel.Item>
						))}
			</Carousel.ItemGroup>
		</Carousel.Root>
	);
};
