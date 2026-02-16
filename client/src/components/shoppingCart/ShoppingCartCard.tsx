import {
	Badge,
	Box,
	Card,
	Flex,
	Group,
	Heading,
	IconButton,
	Link,
	Stack,
	Text,
	Wrap,
} from '@chakra-ui/react';
import { calculateItemPrice } from '@common/domain/ShoppingCart';
import { ShoppingCartItem } from '@common/types/ShoppingCartItem';
import { JSX } from 'react';
import { IconType } from 'react-icons';
import { FaTrashAlt } from 'react-icons/fa';
import { IoMdPricetags } from 'react-icons/io';
import { MdLocalShipping } from 'react-icons/md';
import { TiMinus, TiPlus } from 'react-icons/ti';
import { Link as RouterLink } from 'react-router-dom';
import {
	CLIENT_ROUTES,
	STANDARD_IMAGE_ASPECT_RATIO,
} from '../../constants';
import { FONT_DISPLAY_SANS } from '../../theme';
import { MultiImage } from '../imageDisplay/MultiImage';

type Props = {
	item: ShoppingCartItem;
	onNavigate: () => void;
	onUpdateQuantity: (quantity: number) => void;
	onRemove: () => void;
};

export const ShoppingCartCard = ({
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
					size="sm"
					variant="ghost"
					bg="gray.100"
					position="absolute"
					top={3}
					right={3}
					onClick={onRemove}
					cursor="button"
				>
					<FaTrashAlt />
				</IconButton>
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
						size="xs"
						variant="ghost"
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
				<Stack gap={0}>
					<RouterLink to={listingUrl}>
						<Link asChild>
							<Heading
								size="2xl"
								fontWeight="semibold"
								truncate
								display="block"
							>
								{item.listingData.title}
							</Heading>
						</Link>
					</RouterLink>

					{item.listingData.shopTitle && (
						<RouterLink
							to={`/${CLIENT_ROUTES.shop}/${item.listingData.shopShortId}`}
							onClick={onNavigate}
						>
							<Link asChild>
								<Heading
									truncate
									fontWeight="medium"
									lineHeight={1.2}
									display="block"
								>
									{item.listingData.shopTitle}
								</Heading>
							</Link>
						</RouterLink>
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
					{renderFooterText(
						IoMdPricetags,
						<>
							${itemPrice.toLocaleString()}.00{' '}
							{item.quantity > 1 &&
								`(${item.quantity})`}
						</>,
					)}
					{renderFooterText(
						MdLocalShipping,
						<>
							{item.listingData.shippingPrice || 'free'}
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
		gap={2}
	>
		<Icon size={26} />

		<Text
			fontSize={22}
			fontWeight={500}
			fontFamily={FONT_DISPLAY_SANS}
			mb={1}
		>
			{text}
		</Text>
	</Flex>
);
