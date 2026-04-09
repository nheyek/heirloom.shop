import {
	Badge,
	Box,
	Card,
	CardRootProps,
	Flex,
	Group,
	Heading,
	HStack,
	IconButton,
	Link,
	Span,
	Stack,
	Text,
	Wrap,
} from '@chakra-ui/react';
import { ShoppingCartItem } from '@common/types/ShoppingCartItem';
import { FaTrashAlt } from 'react-icons/fa';
import { IoMdPricetag } from 'react-icons/io';
import { MdLocalShipping } from 'react-icons/md';
import { TiMinus, TiPlus } from 'react-icons/ti';
import { Link as RouterLink } from 'react-router-dom';
import {
	CLIENT_ROUTES,
	STANDARD_IMAGE_ASPECT_RATIO,
} from '@client/constants';
import { calculateItemPrice } from '@client/domain/shoppingCart';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';
import { FONT_DISPLAY_SANS } from '@client/theme';
import { formatCentsAsDollars } from '@common/utils/priceDisplay';
import { MultiImage } from '@client/components/imageDisplay/MultiImage';

type Props = {
	item: ShoppingCartItem;
	onNavigate?: () => void;
	hideButtons?: boolean;
	cardProps?: CardRootProps;
};

export const ShoppingCartCard = (props: Props) => {
	const shoppingCart = useShoppingCart();
	const listingUrl = `/${CLIENT_ROUTES.listing}/${props.item.listingData.shortId}`;
	const itemPrice = calculateItemPrice(props.item);

	return (
		<Card.Root
			variant="elevated"
			{...props.cardProps}
		>
			<Box position="relative">
				<MultiImage
					aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
					urls={[
						`${process.env.LISTING_IMAGES_URL}/${props.item.listingData.imageUuids[0]}.jpg`,
					]}
				/>
				{props.hideButtons !== true && (
					<IconButton
						size="sm"
						variant="ghost"
						bg="gray.100"
						position="absolute"
						top={3}
						right={3}
						onClick={() =>
							shoppingCart.removeFromCart(
								props.item.listingData.shortId,
								props.item.selectedOptions,
							)
						}
						cursor="button"
					>
						<FaTrashAlt />
					</IconButton>
				)}
				{props.hideButtons !== true && (
					<Group
						p={0.5}
						gap={1}
						attached
						position="absolute"
						bottom={3}
						right={3}
						bg="gray.100"
						borderRadius="full"
					>
						<IconButton
							size="xs"
							variant="ghost"
							onClick={() =>
								shoppingCart.updateQuantity(
									props.item.listingData.shortId,
									props.item.selectedOptions,
									props.item.quantity - 1,
								)
							}
						>
							<TiMinus />
						</IconButton>
						<Text
							textAlign="center"
							minWidth={5}
							fontSize={16}
							fontWeight={700}
						>
							{props.item.quantity}
						</Text>
						<IconButton
							size="xs"
							variant="ghost"
							onClick={() =>
								shoppingCart.updateQuantity(
									props.item.listingData.shortId,
									props.item.selectedOptions,
									props.item.quantity + 1,
								)
							}
						>
							<TiPlus />
						</IconButton>
					</Group>
				)}
				<Flex
					alignItems="center"
					gap={2}
					borderRadius="full"
				></Flex>
			</Box>

			<Card.Body
				p={3}
				gap={3}
				justifyContent="space-between"
			>
				<Stack gap={0}>
					<RouterLink
						to={listingUrl}
						onClick={props.onNavigate}
					>
						<Link asChild>
							<Heading
								size="2xl"
								fontWeight="semibold"
								truncate
								display="block"
							>
								{props.item.listingData.title}
							</Heading>
						</Link>
					</RouterLink>

					{props.item.listingData.shopTitle && (
						<RouterLink
							to={`/${CLIENT_ROUTES.shop}/${props.item.listingData.shopShortId}`}
							onClick={props.onNavigate}
						>
							<Link asChild>
								<Heading
									truncate
									fontWeight="medium"
									lineHeight={1.2}
									display="block"
								>
									{props.item.listingData.shopTitle}
								</Heading>
							</Link>
						</RouterLink>
					)}
				</Stack>

				{Object.keys(props.item.selectedOptions).length >
					0 && (
					<Wrap gap={2}>
						{Object.entries(
							props.item.selectedOptions,
						).map(([variationId, optionId]) => {
							const variation =
								props.item.listingData.variations.find(
									(v) =>
										v.id === Number(variationId),
								);
							const option = variation?.options.find(
								(o) => o.id === optionId,
							);
							if (!variation || !option) return null;
							return (
								<Badge
									size="lg"
									key={variationId}
									fontFamily={FONT_DISPLAY_SANS}
									fontSize={18}
								>
									{variation.name}: {option.name}
								</Badge>
							);
						})}
					</Wrap>
				)}

				<Flex
					alignItems="center"
					justifyContent="space-between"
					fontFamily={FONT_DISPLAY_SANS}
					fontSize={22}
					fontWeight={500}
					lineHeight={1}
				>
					<HStack gap={1.5}>
						<IoMdPricetag size={24} />
						<Span mb="3px">
							{formatCentsAsDollars(itemPrice)}
							{props.item.quantity > 1 &&
								` (${props.item.quantity})`}
						</Span>
					</HStack>
					<HStack gap={2}>
						<MdLocalShipping size={24} />
						{props.item.listingData.shippingPrice ? (
							<Span mb="3px">
								{formatCentsAsDollars(
									props.item.listingData
										.shippingPrice,
								)}
							</Span>
						) : (
							<Span fontSize={20}>Free</Span>
						)}
					</HStack>
				</Flex>
			</Card.Body>
		</Card.Root>
	);
};
