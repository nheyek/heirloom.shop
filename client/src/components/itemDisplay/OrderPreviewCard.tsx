import {
	Badge,
	Box,
	Card,
	CardRootProps,
	HStack,
	Link,
	Text,
} from '@chakra-ui/react';
import { MultiImage } from '@client/components/imageDisplay/MultiImage';
import {
	CLIENT_ROUTES,
	Layout,
	LISTING_IMAGE_ASPECT_RATIO,
} from '@client/constants';
import { defaultFontFamily, displayFontFamily } from '@client/theme';
import { formatDateLong } from '@client/utils/dateUtils';
import {
	ImageSource,
	listingImageUrl,
} from '@client/utils/imageUtils';
import {
	ImageVariant,
	OrderStatus,
} from '@heirloom/common/constants';
import {
	OrderItemDisplayData,
	OrderResponse,
} from '@heirloom/common/contract';
import { formatCentsAsDollars } from '@heirloom/common/utils/priceDisplay';
import { capitalize } from '@heirloom/common/utils/stringUtils';
import { FaCheck } from 'react-icons/fa6';
import { Link as RouterLink } from 'react-router-dom';

export const DESKTOP_ORDER_PREVIEW_THUMBNAIL_WIDTH = 120;

const getImageSource = (
	item: OrderItemDisplayData,
): ImageSource | null =>
	item.imageUuid
		? {
				url: listingImageUrl(
					item.shopShortId,
					item.imageUuid,
					ImageVariant.SMALL,
				),
				fallback: listingImageUrl(
					item.shopShortId,
					item.imageUuid,
					ImageVariant.FULL,
				),
			}
		: null;

type Props = {
	order: OrderResponse;
	layout?: Layout;
	cardProps?: CardRootProps;
};

export const OrderPreviewCard = ({
	order,
	layout,
	cardProps,
}: Props) => {
	const isDesktop = layout === Layout.DESKTOP;
	const total =
		order.subtotalCents + order.shippingCents + order.taxCents;
	const [firstItem] = order.items;
	const imageSource = firstItem ? getImageSource(firstItem) : null;
	const itemCount = order.items.length;
	const remainingItemCount = itemCount - 1;

	return (
		<Card.Root
			variant="elevated"
			flexDirection={isDesktop ? 'row' : 'column'}
			width="100%"
			{...cardProps}
		>
			<Box
				position="relative"
				width={
					isDesktop
						? DESKTOP_ORDER_PREVIEW_THUMBNAIL_WIDTH
						: '100%'
				}
				flexShrink={0}
				aspectRatio={1}
			>
				<MultiImage
					aspectRatio={LISTING_IMAGE_ASPECT_RATIO}
					urls={imageSource ? [imageSource] : []}
				/>
			</Box>

			<Card.Body
				p={3}
				gap={1}
				justifyContent="space-between"
				minW={0}
				fontSize={20}
				fontFamily={displayFontFamily}
			>
				<HStack justifyContent="space-between">
					<RouterLink
						to={`/${CLIENT_ROUTES.orders}/${order.shortId}`}
					>
						<Link asChild>
							<Text
								fontSize={28}
								fontWeight={500}
								truncate
							>
								{order.shortId}
							</Text>
						</Link>
					</RouterLink>
					{order.orderStatus === OrderStatus.CONFIRMED && (
						<Badge
							size="lg"
							fontSize={16}
							alignSelf="flex-start"
							fontFamily={defaultFontFamily}
						>
							<FaCheck />
							{capitalize(order.orderStatus)}
						</Badge>
					)}
				</HStack>

				<HStack
					gap={1}
					flex={1}
					minW={0}
				>
					<Text
						truncate
						minW={0}
					>
						{firstItem?.title}
					</Text>
					{remainingItemCount > 0 && (
						<Text flexShrink={0}>
							+ {remainingItemCount}{' '}
							{remainingItemCount === 1
								? 'item'
								: 'items'}
						</Text>
					)}
				</HStack>

				<HStack justifyContent="space-between">
					<Text>{formatDateLong(order.createdAt)}</Text>

					<Text>{formatCentsAsDollars(total)}</Text>
				</HStack>
			</Card.Body>
		</Card.Root>
	);
};
