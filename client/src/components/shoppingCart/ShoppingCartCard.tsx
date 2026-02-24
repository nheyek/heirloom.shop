import {
	Badge,
	Box,
	Card,
	CardRootProps,
	Flex,
	Group,
	Heading,
	IconButton,
	Link,
	Span,
	Stack,
	Text,
	Wrap,
} from '@chakra-ui/react';
import { calculateItemPrice } from '@common/domain/ShoppingCart';
import { ShoppingCartItem } from '@common/types/ShoppingCartItem';
import { JSX } from 'react';
import { IconType } from 'react-icons';
import { FaTrashAlt } from 'react-icons/fa';
import { IoMdPricetag } from 'react-icons/io';
import { MdLocalShipping } from 'react-icons/md';
import { TiMinus, TiPlus } from 'react-icons/ti';
import { Link as RouterLink } from 'react-router-dom';
import {
	CLIENT_ROUTES,
	STANDARD_IMAGE_ASPECT_RATIO,
} from '../../constants';
import { useShoppingCart } from '../../providers/ShoppingCartProvider';
import { FONT_DISPLAY_SANS } from '../../theme';
import { MultiImage } from '../imageDisplay/MultiImage';

type Props = {
	item: ShoppingCartItem;
	onNavigate?: () => void;
	hideButtons?: boolean;
};

export const ShoppingCartCard = (props: Props & CardRootProps) => {
	const shoppingCart = useShoppingCart();
	const listingUrl = `/${CLIENT_ROUTES.listing}/${props.item.listingData.shortId}`;
	const itemPrice = calculateItemPrice(props.item);

	return (
		<Card.Root
			variant="elevated"
			{...props}
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
				>
					{renderFooterText(
						IoMdPricetag,
						<>
							${itemPrice.toLocaleString()}.00{' '}
							{props.item.quantity > 1 &&
								`(${props.item.quantity})`}
						</>,
					)}
					{renderFooterText(
						MdLocalShipping,
						<>
							{props.item.listingData.shippingPrice || (
								<Span fontSize={20}>Free</Span>
							)}
						</>,
					)}
				</Flex>
			</Card.Body>
		</Card.Root>
	);
};

const renderFooterText = (Icon: IconType, text: JSX.Element) => (
	<Flex
		direction="row"
		alignItems="center"
		gap={1.5}
	>
		<Icon size={26} />

		<Text
			fontSize={22}
			fontWeight={500}
			fontFamily={FONT_DISPLAY_SANS}
			mb="2px"
			lineHeight={1}
		>
			{text}
		</Text>
	</Flex>
);
