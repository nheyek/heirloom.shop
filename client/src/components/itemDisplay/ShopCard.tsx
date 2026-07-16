import {
	Card,
	Heading,
	HStack,
	IconButton,
	Link,
	Stack,
	Text,
} from '@chakra-ui/react';
import { CountryFlagIcon } from '@client/components/icons/CountryFlagIcon';
import { AppImage } from '@client/components/imageDisplay/AppImage';
import { ImagePlaceholder } from '@client/components/imageDisplay/ImagePlaceholder';
import { CLIENT_ROUTES, CountryCode } from '@client/constants';
import { useFavorites } from '@client/providers/FavoritesProvider';
import { displayFontFamily } from '@client/theme';
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
							src: `${process.env.SHOP_PROFILE_IMAGES_URL}/${props.profileImageUuid}.jpg`,
							cursor: 'button',
						}}
					/>
				) : (
					<ImagePlaceholder />
				)}
			</RouterLink>
			<Card.Body
				p={3}
				gap={1}
				fontFamily={displayFontFamily}
			>
				<Stack gap={0}>
					<RouterLink to={shopUrl}>
						<Link asChild>
							<Heading
								fontSize={24}
								lineHeight={1.2}
								fontWeight={600}
								truncate
								display="block"
							>
								{props.title}
							</Heading>
						</Link>
					</RouterLink>
					<Text
						truncate
						fontSize={18}
						fontWeight={500}
						marginRight={10} // Compensate for favorite icon
					>
						{props.classification}
					</Text>
				</Stack>

				<HStack gap={2}>
					<CountryFlagIcon
						countryCode={
							props.countryCode as CountryCode | null
						}
						size={18}
					/>
					<Text
						fontSize={18}
						truncate
						flex={1}
						marginRight={10} // Compensate for favorite icon
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
