import {
	Card,
	Heading,
	Link,
	SimpleGrid,
	Text,
} from '@chakra-ui/react';
import { ShopCardData } from '@common/types/ShopCardData';
import { Link as RouterLink } from 'react-router-dom';
import {
	CategoryIconCode,
	CLIENT_ROUTES,
	CountryCode,
} from '../../constants';
import { FONT_DISPLAY_SANS } from '../../theme';
import { CategoryIcon } from '../icons/CategoryIcon';
import { CountryFlagIcon } from '../icons/CountryFlagIcon';
import { AppImage } from '../imageDisplay/AppImage';

type Props = ShopCardData & {
	minWidth?: number;
};

export const ShopCard = (props: Props) => {
	const shopUrl = `/${CLIENT_ROUTES.shop}/${props.shortId}`;

	return (
		<Card.Root
			variant="elevated"
			minWidth={props.minWidth}
		>
			<RouterLink to={shopUrl}>
				<AppImage
					imageProps={{
						src: `${process.env.SHOP_PROFILE_IMAGES_URL}/${props.profileImageUuid}.jpg`,
						cursor: 'button',
					}}
				/>
			</RouterLink>
			<Card.Body p={3}>
				<RouterLink to={shopUrl}>
					<Link asChild>
						<Heading
							size="2xl"
							fontWeight="semibold"
							truncate
							display="block"
						>
							{props.title}
						</Heading>
					</Link>
				</RouterLink>

				<SimpleGrid
					columns={2}
					gridTemplateColumns="30px 1fr"
					fontSize={20}
					fontFamily={FONT_DISPLAY_SANS}
					alignItems="center"
				>
					<CategoryIcon
						iconCode={
							props.categoryIcon as CategoryIconCode | null
						}
						size={21}
					/>
					<Text truncate>{props.classification}</Text>
					<CountryFlagIcon
						countryCode={
							props.countryCode as CountryCode | null
						}
						size={21}
					/>
					<Text truncate>{props.location}</Text>
				</SimpleGrid>
			</Card.Body>
		</Card.Root>
	);
};
