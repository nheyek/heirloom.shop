import {
	Card,
	HStack,
	IconButton,
	Link,
	Stack,
	Text,
} from '@chakra-ui/react';
import {
	CARD_SHOP_TITLE_PROPS,
	CARD_TITLE_PROPS,
} from '@client/components/cards/ListingCard';
import { CountryFlagIcon } from '@client/components/icons/CountryFlagIcon';
import { AppImage } from '@client/components/imageDisplay/AppImage';
import { ImagePlaceholder } from '@client/components/imageDisplay/ImagePlaceholder';
import { CLIENT_ROUTES, CountryCode } from '@client/constants';
import { useFavorites } from '@client/providers/FavoritesProvider';
import { shopProfileImageUrl } from '@client/utils/imageUtils';
import { ImageVariant } from '@heirloom/common/constants';
import { ShopCardData } from '@heirloom/common/contract';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

type Props = ShopCardData & {
	minWidth?: number;
};

export const ShopCard = (props: Props) => {
	const shopUrl = `/${CLIENT_ROUTES.shop}/${props.shortId}`;
	const { isFavoritedShop, toggleFavoriteShop } = useFavorites();

	return (
		<Card.Root
			variant="elevated"
			minWidth={props.minWidth}
		>
			<RouterLink to={shopUrl}>
				{props.profileImageUuid ? (
					<AppImage
						imageProps={{
							src: shopProfileImageUrl(
								props.profileImageUuid,
								ImageVariant.SMALL,
							),
							cursor: 'button',
						}}
						fallbackSrc={shopProfileImageUrl(
							props.profileImageUuid,
							ImageVariant.FULL,
						)}
					/>
				) : (
					<ImagePlaceholder />
				)}
			</RouterLink>
			<Card.Body
				p={3}
				gap={1}
			>
				<Stack gap={0}>
					<RouterLink to={shopUrl}>
						<Link asChild>
							<Text
								{...CARD_TITLE_PROPS}
								truncate
								display="block"
							>
								{props.title}
							</Text>
						</Link>
					</RouterLink>
					<Text
						{...CARD_SHOP_TITLE_PROPS}
						truncate
						display="block"
					>
						{props.classification}
					</Text>
				</Stack>

				<HStack gap={2}>
					<CountryFlagIcon
						countryCode={
							props.countryCode as CountryCode | null
						}
						size={20}
					/>
					<Text
						fontSize={20}
						truncate
						flex={1}
						marginRight={10}
					>
						{props.location}
					</Text>
				</HStack>
				<IconButton
					position="absolute"
					bottom={2}
					right={2}
					variant="ghost"
					size="lg"
					color={
						isFavoritedShop(props.shortId)
							? 'red.600'
							: undefined
					}
					onClick={(e) => {
						e.preventDefault();
						toggleFavoriteShop(props);
					}}
				>
					{isFavoritedShop(props.shortId) ? (
						<FaHeart />
					) : (
						<FaRegHeart />
					)}
				</IconButton>
			</Card.Body>
		</Card.Root>
	);
};
