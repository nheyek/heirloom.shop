import { Badge, Box, Button, Card, Flex, IconButton, Link, Stack, Text } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { CLIENT_ROUTES, STANDARD_IMAGE_ASPECT_RATIO } from '../../constants';
import { CartItem } from '../../providers/CartProvider';
import { ImageCarousel } from '../imageDisplay/ImageCarousel';
import { PriceTag } from '../textDisplay/PriceTagText';

interface CartItemCardProps {
	item: CartItem;
	onNavigate: () => void;
	onUpdateQuantity: (quantity: number) => void;
	onRemove: () => void;
}

export const CartItemCard = ({ item, onNavigate, onUpdateQuantity, onRemove }: CartItemCardProps) => {
	const listingUrl = `/${CLIENT_ROUTES.listing}/${item.listingId}`;
	const getImageUrl = (uuid: string) => `${process.env.LISTING_IMAGES_URL}/${uuid}.jpg`;

	const calculateItemPrice = (): number => {
		let total = item.listingData.priceDollars;

		Object.entries(item.selectedOptions).forEach(([varId, optId]) => {
			const variation = item.listingData.variations.find((v) => v.id === Number(varId));
			const option = variation?.options.find((o) => o.id === optId);
			if (option && variation?.pricesVary) {
				total += option.additionalPriceDollars;
			}
		});

		return total;
	};

	const itemPrice = calculateItemPrice();
	const itemTotal = itemPrice * item.quantity;

	return (
		<Card.Root variant="elevated">
			<RouterLink to={listingUrl} onClick={onNavigate}>
				<ImageCarousel
					aspectRatio={STANDARD_IMAGE_ASPECT_RATIO}
					urls={[getImageUrl(item.listingData.imageUuids[0])]}
				/>
			</RouterLink>

			<Card.Body p={3} pr={2} pb={2} gap={1}>
				<Box>
					<Card.Title fontSize={21}>
						<Link truncate display="block" asChild>
							<RouterLink to={listingUrl} onClick={onNavigate}>
								{item.listingData.title}
							</RouterLink>
						</Link>
					</Card.Title>
					{item.listingData.shopTitle && (
						<Link fontSize={18} fontWeight={500} asChild cursor="button">
							<RouterLink
								to={`/${CLIENT_ROUTES.shop}/${item.listingData.shopShortId}`}
								onClick={onNavigate}
							>
								{item.listingData.shopTitle}
							</RouterLink>
						</Link>
					)}
				</Box>

				{Object.keys(item.selectedOptions).length > 0 && (
					<Flex gap={1.5} flexWrap="wrap" minHeight={45}>
						{Object.entries(item.selectedOptions).map(([varId, optId]) => {
							const variation = item.listingData.variations.find(
								(v) => v.id === Number(varId)
							);
							const option = variation?.options.find((o) => o.id === optId);

							if (!variation || !option) return null;

							return (
								<Badge key={varId} size="sm" colorPalette="gray">
									{variation.name}: {option.name}
								</Badge>
							);
						})}
					</Flex>
				)}

				<Stack gap={2}>
					<Flex justifyContent="space-between" alignItems="center">
						<PriceTag value={`$${itemTotal.toLocaleString()}`} />
						<Text fontSize="sm" color="gray.600">
							${itemPrice.toLocaleString()} × {item.quantity}
						</Text>
					</Flex>

					<Flex gap={2}>
						<Flex alignItems="center" gap={2} flex="1">
							<Button
								size="sm"
								variant="outline"
								onClick={() => onUpdateQuantity(item.quantity - 1)}
								width="32px"
								px={0}
							>
								-
							</Button>
							<Text textAlign="center" minWidth="24px" fontWeight="bold">
								{item.quantity}
							</Text>
							<Button
								size="sm"
								variant="outline"
								onClick={() => onUpdateQuantity(item.quantity + 1)}
								width="32px"
								px={0}
							>
								+
							</Button>
						</Flex>

						<IconButton
							size="sm"
							variant="ghost"
							colorPalette="red"
							onClick={onRemove}
						>
							<FaTrash />
						</IconButton>
					</Flex>
				</Stack>
			</Card.Body>
		</Card.Root>
	);
};
