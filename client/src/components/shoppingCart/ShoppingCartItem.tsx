import {
	Box,
	Card,
	Flex,
	IconButton,
	Link,
	Stack,
	Text,
} from '@chakra-ui/react';
import { calculateItemPrice } from '@common/domain/ShoppingCart';
import { ShoppingCartItem } from '@common/types/ShoppingCartItem';
import { FaTrashAlt } from 'react-icons/fa';
import { TiMinus, TiPlus } from 'react-icons/ti';
import { Link as RouterLink } from 'react-router-dom';
import {
	CLIENT_ROUTES,
	STANDARD_IMAGE_ASPECT_RATIO,
} from '../../constants';
import { MultiImage } from '../imageDisplay/MultiImage';
import { PriceTag } from '../textDisplay/PriceTag';

type Props = {
	item: ShoppingCartItem;
	onNavigate: () => void;
	onUpdateQuantity: (quantity: number) => void;
	onRemove: () => void;
};

export const CartItemCard = ({
	item,
	onNavigate,
	onUpdateQuantity,
	onRemove,
}: Props) => {
	const listingUrl = `/${CLIENT_ROUTES.listing}/${item.listingData.shortId}`;

	const itemPrice = calculateItemPrice(item);

	return (
		<Card.Root variant="elevated">
			<Box position="relative">
				<RouterLink
					to={listingUrl}
					onClick={onNavigate}
				>
					<MultiImage
						aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
						urls={[
							`${process.env.LISTING_IMAGES_URL}/${item.listingData.imageUuids[0]}.jpg`,
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
				p={4}
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
					alignItems="end"
					justifyContent="space-between"
				>
					<PriceTag value={itemPrice} />
					<Flex
						alignItems="center"
						gap={2}
					>
						<IconButton
							size="2xs"
							variant="outline"
							onClick={() =>
								onUpdateQuantity(item.quantity - 1)
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
								onUpdateQuantity(item.quantity + 1)
							}
						>
							<TiPlus />
						</IconButton>
					</Flex>
				</Flex>
			</Card.Body>
		</Card.Root>
	);
};
