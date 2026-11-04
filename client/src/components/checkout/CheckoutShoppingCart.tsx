import { Carousel, HStack, IconButton, Text } from '@chakra-ui/react';
import { OrderItemCard } from '@client/components/cards/OrderItemCard';
import { OrderItemCardSkeleton } from '@client/components/cards/OrderItemCardSkeleton';
import { CheckoutHeading } from '@client/components/checkout/CheckoutHeading';
import { getOrderItemDisplayData } from '@client/domain/shoppingCart';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

export const CheckoutShoppingCart = () => {
	const shoppingCart = useShoppingCart();
	const [page, setPage] = useState(0);
	const slideCount = shoppingCart.cartLoading
		? shoppingCart.pendingItemCount
		: shoppingCart.items.length;

	return (
		<Carousel.Root
			slideCount={slideCount}
			slidesPerPage={1}
			gap={3}
			page={page}
			onPageChange={(details) => setPage(details.page)}
		>
			<HStack justify="space-between">
				<CheckoutHeading>Shopping Cart</CheckoutHeading>

				{slideCount > 1 && (
					<HStack
						gap={3}
						h={0}
						mb={2}
					>
						<Carousel.PrevTrigger asChild>
							<IconButton
								size="xs"
								variant="subtle"
							>
								<FaChevronLeft />
							</IconButton>
						</Carousel.PrevTrigger>
						<Text
							fontSize={20}
							fontWeight={500}
						>
							{page + 1} / {slideCount}
						</Text>
						<Carousel.NextTrigger asChild>
							<IconButton
								size="xs"
								variant="subtle"
							>
								<FaChevronRight />
							</IconButton>
						</Carousel.NextTrigger>
					</HStack>
				)}
			</HStack>
			<Carousel.ItemGroup m={-5}>
				{shoppingCart.cartLoading
					? Array.from({
							length: shoppingCart.pendingItemCount,
						}).map((_, index) => (
							<Carousel.Item
								key={index}
								index={index}
								p={5}
							>
								<OrderItemCardSkeleton />
							</Carousel.Item>
						))
					: shoppingCart.items.map((item, index) => (
							<Carousel.Item
								key={`${item.listingData.shortId}-${JSON.stringify(item.selectedOptions)}`}
								index={index}
								p={5}
							>
								<OrderItemCard
									item={getOrderItemDisplayData(
										item,
									)}
									cardProps={{ minW: 250 }}
								/>
							</Carousel.Item>
						))}
			</Carousel.ItemGroup>
		</Carousel.Root>
	);
};
