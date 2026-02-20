import {
	Carousel,
	Collapsible,
	Heading,
	HStack,
	IconButton,
	Span,
} from '@chakra-ui/react';
import { FaChevronDown, FaShoppingCart } from 'react-icons/fa';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { Layout } from '../../constants';
import { useShoppingCart } from '../../providers/ShoppingCartProvider';
import { FONT_DISPLAY_SANS } from '../../theme';
import { ShoppingCartCard } from '../shoppingCart/ShoppingCartCard';
import { ShoppingCartContents } from '../shoppingCart/ShoppingCartContents';

type Props = {
	layout?: Layout;
};

export const CheckoutShoppingCart = (props: Props) => {
	const shoppingCart = useShoppingCart();

	if (props.layout === Layout.SINGLE_COLUMN) {
		return (
			<Collapsible.Root>
				<Collapsible.Trigger
					fontSize={20}
					fontWeight={500}
					fontFamily={FONT_DISPLAY_SANS}
					cursor="button"
				>
					<HStack gap={3}>
						<FaShoppingCart size={18} />
						<Span>shopping cart</Span>
						<Collapsible.Indicator
							_open={{ transform: 'rotate(180deg)' }}
						>
							<FaChevronDown size={14} />
						</Collapsible.Indicator>
					</HStack>
				</Collapsible.Trigger>
				<Collapsible.Content
					my={2}
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

	if (props.layout === Layout.MULTI_COLUMN) {
		return (
			<Carousel.Root
				slideCount={shoppingCart.items.length}
				slidesPerPage={1}
				gap={4}
			>
				<HStack justify="space-between">
					<HStack gap={3}>
						<FaShoppingCart size={26} />
						<Heading
							fontSize={24}
							fontWeight="medium"
							fontFamily={FONT_DISPLAY_SANS}
						>
							shopping cart
						</Heading>
					</HStack>

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
				<Carousel.ItemGroup m={-5}>
					{shoppingCart.items.map((item, index) => (
						<Carousel.Item
							key={`${item.listingData.shopId}-${JSON.stringify(item.selectedOptions)}`}
							index={index}
							p={5}
						>
							<ShoppingCartCard
								item={item}
								minWidth={250}
							/>
						</Carousel.Item>
					))}
				</Carousel.ItemGroup>
			</Carousel.Root>
		);
	}

	return <ShoppingCartContents />;
};
