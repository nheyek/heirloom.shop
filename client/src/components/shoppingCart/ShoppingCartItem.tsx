import {
	Badge,
	Box,
	Card,
	Flex,
	Group,
	IconButton,
	Link,
	Stack,
	Text,
	Wrap,
} from '@chakra-ui/react';
import { calculateItemPrice } from '@common/domain/ShoppingCart';
import { ShoppingCartItem } from '@common/types/ShoppingCartItem';
import { FaTrashAlt } from 'react-icons/fa';
import { IoMdPricetags } from 'react-icons/io';
import { MdLocalShipping } from 'react-icons/md';
import { TiMinus, TiPlus } from 'react-icons/ti';
import { Link as RouterLink } from 'react-router-dom';
import {
	CLIENT_ROUTES,
	STANDARD_IMAGE_ASPECT_RATIO,
} from '../../constants';
import { MultiImage } from '../imageDisplay/MultiImage';

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
		<Card.Root
			variant="elevated"
			height="fit-content"
		>
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
					variant="solid"
					bg="gray.100"
					color="black"
					position="absolute"
					top={3}
					right={3}
					onClick={onRemove}
					cursor="button"
				>
					<FaTrashAlt />
				</IconButton>
				<Group
					p={1}
					gap={1}
					attached
					position="absolute"
					bottom={3}
					right={3}
					bg="gray.100"
					borderRadius="full"
				>
					<IconButton
						variant="ghost"
						size="2xs"
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
						variant="ghost"
						size="2xs"
						onClick={() =>
							onUpdateQuantity(item.quantity + 1)
						}
					>
						<TiPlus />
					</IconButton>
				</Group>
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
				<Stack gap={1}>
					<Card.Title fontSize={22}>
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

				{Object.keys(item.selectedOptions).length > 0 && (
					<Wrap gap={2}>
						{Object.entries(item.selectedOptions).map(
							([variationId, optionId]) => {
								const variation =
									item.listingData.variations.find(
										(v) =>
											v.id ===
											Number(variationId),
									);
								const option =
									variation?.options.find(
										(o) => o.id === optionId,
									);
								if (!variation || !option)
									return null;
								return (
									<Badge
										size="lg"
										key={variationId}
									>
										{variation.name}:{' '}
										{option.name}
									</Badge>
								);
							},
						)}
					</Wrap>
				)}

				<Flex
					alignItems="center"
					justifyContent="space-between"
				>
					<Flex
						direction="row"
						alignItems="start"
						gap={1.5}
					>
						<IoMdPricetags size={24} />

						<Text
							fontSize={20}
							fontWeight={500}
							textStyle="ornamental"
						>
							${itemPrice.toLocaleString()}.00{' '}
							{item.quantity > 1 &&
								`(${item.quantity})`}
						</Text>
					</Flex>
					<Flex
						direction="row"
						alignItems="start"
						gap={2}
					>
						<MdLocalShipping size={24} />

						<Text
							fontSize={20}
							fontWeight={500}
							textStyle="ornamental"
						>
							$30.00
						</Text>
					</Flex>
				</Flex>
			</Card.Body>
		</Card.Root>
	);
};
