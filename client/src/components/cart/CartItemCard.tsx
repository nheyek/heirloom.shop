import {
	Box,
	Card,
	Flex,
	IconButton,
	Link,
	Stack,
	Text,
} from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';
import { TiMinus, TiPlus } from 'react-icons/ti';
import { Link as RouterLink } from 'react-router-dom';
import {
	CLIENT_ROUTES,
	STANDARD_IMAGE_ASPECT_RATIO,
} from '../../constants';
import { CartItem } from '../../providers/CartProvider';
import { ImageCarousel } from '../imageDisplay/ImageCarousel';
import { PriceTag } from '../textDisplay/PriceTagText';

interface CartItemCardProps {
	item: CartItem;
	onNavigate: () => void;
	onUpdateQuantity: (quantity: number) => void;
	onRemove: () => void;
}

export const CartItemCard = ({
	item,
	onNavigate,
	onUpdateQuantity,
	onRemove,
}: CartItemCardProps) => {
	const listingUrl = `/${CLIENT_ROUTES.listing}/${item.listingId}`;
	const getImageUrl = (uuid: string) =>
		`${process.env.LISTING_IMAGES_URL}/${uuid}.jpg`;

	const calculateItemPrice = (): number => {
		let total = item.listingData.priceDollars;

		Object.entries(item.selectedOptions).forEach(
			([varId, optId]) => {
				const variation =
					item.listingData.variations.find(
						(v) => v.id === Number(varId),
					);
				const option = variation?.options.find(
					(o) => o.id === optId,
				);
				if (option && variation?.pricesVary) {
					total += option.additionalPriceDollars;
				}
			},
		);

		return total;
	};

	const itemPrice = calculateItemPrice();
	const itemTotal = itemPrice * item.quantity;

	return (
		<Card.Root variant="elevated">
			<Box position="relative">
				<RouterLink
					to={listingUrl}
					onClick={onNavigate}
				>
					<ImageCarousel
						aspectRatio={
							STANDARD_IMAGE_ASPECT_RATIO
						}
						urls={[
							getImageUrl(
								item.listingData
									.imageUuids[0],
							),
						]}
					/>
				</RouterLink>
				<IconButton
					size="xs"
					variant="subtle"
					position="absolute"
					top={3}
					right={3}
					onClick={onRemove}
					cursor="button"
				>
					<FaTrashAlt />
				</IconButton>
			</Box>

			<Card.Body
				p={3}
				gap={3}
			>
				<Stack gap={1}>
					<Card.Title fontSize={20}>
						<Link
							truncate
							display="block"
							asChild
						>
							<RouterLink
								to={listingUrl}
								onClick={onNavigate}
							>
								{item.listingData.title}
							</RouterLink>
						</Link>
					</Card.Title>
					{item.listingData.shopTitle && (
						<Link
							fontSize={18}
							fontWeight={500}
							asChild
							cursor="button"
						>
							<RouterLink
								to={`/${CLIENT_ROUTES.shop}/${item.listingData.shopShortId}`}
								onClick={onNavigate}
							>
								{item.listingData.shopTitle}
							</RouterLink>
						</Link>
					)}
				</Stack>

				<Flex
					gap={2}
					alignItems="center"
				>
					<Flex
						alignItems="center"
						gap={2}
						flex="1"
					>
						<IconButton
							size="2xs"
							variant="outline"
							onClick={() =>
								onUpdateQuantity(
									item.quantity - 1,
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
							{item.quantity}
						</Text>
						<IconButton
							size="2xs"
							variant="outline"
							onClick={() =>
								onUpdateQuantity(
									item.quantity + 1,
								)
							}
						>
							<TiPlus />
						</IconButton>
					</Flex>
					<PriceTag
						value={`$${itemPrice.toLocaleString()}`}
					/>
				</Flex>
			</Card.Body>
		</Card.Root>
	);
};
